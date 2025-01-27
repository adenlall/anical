import { CalendarItem, FileData } from "./interfaces";
import { addIcsItem, deleteIcsItem, getAllIcsItems, getIcsItem, updateIcsItem } from "./store";

export class FileManager {

    private async serializeFile(fileData: Omit<FileData, 'id'>): Promise<string> {
        return JSON.stringify({
            name: fileData.name,
            content: fileData.content,
            type: fileData.type,
            size: fileData.size,
            lastModified: fileData.lastModified.toISOString()
        });
    }

    private parseStoredData(calendarItem: CalendarItem): FileData {
        const parsedData = JSON.parse(calendarItem.data);
        return {
            id: calendarItem.id,
            name: parsedData.name,
            content: parsedData.content,
            type: parsedData.type,
            size: parsedData.size,
            lastModified: new Date(parsedData.lastModified)
        };
    }

    async editFile(id: number, updateData: Partial<Omit<FileData, 'id'>>): Promise<void> {
        const existing = await getIcsItem(id);  // Now properly typed as CalendarItem
        const currentData = this.parseStoredData(existing);

        const mergedData = {
            ...currentData,
            ...updateData,
            size: updateData.content?.length ?? currentData.size,
            lastModified: new Date()
        };

        const serialized = await this.serializeFile(mergedData);
        await updateIcsItem(id, serialized);
    }

    async getAllFiles(): Promise<FileData[]> {
        const items = await getAllIcsItems();  // Now properly typed as CalendarItem[]
        return items.map(item => this.parseStoredData(item));
    }

    async createFile(name: string, content: string, type: string): Promise<FileData> {
        const fileData: Omit<FileData, 'id'> = {
            name,
            content,
            type,
            size: content.length,
            lastModified: new Date()
        };

        const serialized = await this.serializeFile(fileData);
        const id = await addIcsItem(serialized);
        return { ...fileData, id };
    }

    async deleteFile(id: number): Promise<void> {
        await deleteIcsItem(id);
    }

    async downloadFile(id: number): Promise<void> {
        const calendarItem = await getIcsItem(id);
        const fileData = this.parseStoredData(calendarItem);

        const blob = new Blob([fileData.content], { type: fileData.type });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');

        anchor.href = url;
        anchor.download = fileData.name || `file-${id}`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    }

}