export interface FileData {
    id: number;
    name: string;
    content: string;
    type: string;
    size: number;
    lastModified: Date;
}

export interface CalendarItem {
    id: number;
    data: string;
    timestamp: Date;
}