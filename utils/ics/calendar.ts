"use client"

import { FileManager } from "./fileManager";
import data from "./ics.json";
export class Calendar {

    private fileService: FileManager;
    content: string;
    name: string;
    private events: number = 0;

    constructor(name: string, provider: string, creator: string) {
        this.name = name;
        this.fileService = new FileManager();
        this.content = data.calendar.beginend
            .replace("%provider%", provider)
            .replace("%creator%", creator);
    }

    createEvent(startDate: number, endDate: number, summary: string, description: string, location: string, freq: string, count: number) {
        this.content = this.content.replace(/%end-event%/g, "");
        this.content = this.content.replace(
            /%between-cal%/g,
            data.event.beginend
            + "\n%between-cal%"
        );
        const eventBody = data.event.data
            .replace("%uuid%", crypto.randomUUID())
            .replace("%tdate%", this.isoDate())
            .replace("%sdate%", this.isoDate(startDate))
            .replace("%edate%", this.isoDate(endDate))
            .replace("%summary%", summary)
            .replace("%description%", description)
            .replace("%freq%", freq)
            .replace("%count%", "" + count)

        this.content = this.content.replace(/%between-event%/g, eventBody + "%end-event%");
        this.events++;
        return {
            alarm: (description: string, date: string) =>
                this.createAlarm(description, date)
        };
    }

    async finish() {
        this.content = this.content.replace(/%end-event%/g, "");
        this.content = this.content.replace(/%between-cal%/g, "");
        await this.fileService.createFile(this.name, this.content, "ics");
    }

    private createAlarm(description: string, date: string) {
        this.content = this.content.replace(
            new RegExp("%end-event%", 'g'),
            "\n" + data.alarm.beginend + "%end-event%"
        );
        const alarmBody = data.alarm.data
            .replace("%date%", date)
            .replace("%description%", description);

        this.content = this.content.replace(new RegExp(`%between-alarm%`, 'g'), alarmBody);
        return {
            alarm: (description: string, date: string) =>
                this.createAlarm(description, date)
        };
    }

    private isoDate(timestamp?: number) {
        if (!timestamp) {
            const currentDate = new Date();
            const iso = currentDate
                .toISOString()
                .replace(/[-:]/g, '')
                .replace(/\.\d+Z$/, 'Z');
            return iso;
        }
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const iso = date.toISOString();
        return iso
            .replace(/[-:]/g, '')
            .replace(/\.\d+Z$/, 'Z');
    }

}