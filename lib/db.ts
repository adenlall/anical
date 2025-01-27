"use client"

export interface AnimeItem {
    id?: number;
    anime_Id: number;
    data: object;
    timestamp?: Date;
}

const DB_NAME = "AniCalUser";
const STORE_NAME = "AnimeList";
const DB_VERSION = 1;

// Initialize DB only on client side
const initializeDB = async (): Promise<IDBDatabase> => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
        throw new Error('IndexedDB is only available in browser environments');
    }

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: false,
                });
                store.createIndex("animeId", "anime_Id", { unique: true });
                store.createIndex("timestamp", "timestamp", { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Create a singleton promise for the database connection
let dbPromise: Promise<IDBDatabase> | null = null;

export const getDB = () => {
    if (!dbPromise) {
        dbPromise = initializeDB().catch((error) => {
            // Reset the promise if initialization fails
            dbPromise = null;
            throw error;
        });
    }
    return dbPromise;
};

export const addAnimeItem = async (item: AnimeItem): Promise<number> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add({
            ...item,
            timestamp: new Date(),
        });

        request.onsuccess = () => resolve(request.result as number);
        request.onerror = () => reject(request.error);
    });
};

export const deleteAnimeItem = async (id: number): Promise<boolean> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
    });
};

export const getAnimeItem = async (id: number): Promise<AnimeItem> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const getAllAnimeItems = async (): Promise<AnimeItem[]> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};