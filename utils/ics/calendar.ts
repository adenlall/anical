"use client"

import { FileManager } from "./fileManager";
import data from "./ics.json";
import { FileData } from "./interfaces";
export class Calendar {

    private fileService: FileManager;
    file: FileData | null = null;
    content: string;
    name: string;

    constructor(name: string, provider: string, creator: string) {
        this.name = name;
        this.fileService = new FileManager();
        this.content = data.calendar.beginend
            .replace("%provider%", provider)
            .replace("%creator%", creator);
    }

    createEvent(startDate: string, endDate: string, summary: string, description: string, location: string, freq: string, count: number) {
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
            .replace("%location%", location)
            .replace("%freq%", freq)
            .replace("%count%", "" + count)

        this.content = this.content.replace(/%between-event%/g, eventBody + "%end-event%");
        return {
            alarm: (description: string, date: string) =>
                this.createAlarm(description, date)
        };
    }

    async save() {
    }

    async download() {
        await this.fileService.downloadFile(this.file?.id || 0);
    }

    async finish() {
        this.content = this.content.replace(/%end-event%/g, "");
        this.content = this.content.replace(/%between-cal%/g, "");
        this.file = await this.fileService.createFile(this.name, this.content, "ics");
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

    private isoDate(timestamp?: string) {
        let date;
        if (!timestamp) {
            date = new Date();
        } else {
            date = new Date(Number(timestamp) * 1000); // Convert to milliseconds
        }

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        // console.log(timestamp, `${year}${month}${day}T${hours}${minutes}${seconds}Z`);
        return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    }


}