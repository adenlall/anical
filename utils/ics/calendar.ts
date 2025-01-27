import { FileManager } from "./fileManager";
import data from "./ics.json";
class Calendar {
    private fileService: FileManager;
    private content: string;
    private events: number = 0;
    constructor(name: string) {
        this.fileService = new FileManager();
        this.content = data.calendar.beginend;
    }

    createEvent(startDate: number, endDate: number, summary: string, description: string, location: string, freq: string, count: number) {
        this.content.replace(
            /%between%/g,
            data.event.beginend.replace(/%between%/g, "%between-event-" + this.events + "%")
            + "\n%between%\n"
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
        this.content.replace(new RegExp(`%between-${String(this.events)}%`, 'g'), eventBody);
        this.events++;
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
        const iso = date.toLocaleString();
        return iso
            .replace(/[-:]/g, '')
            .replace(/\.\d+Z$/, 'Z');
    }

}