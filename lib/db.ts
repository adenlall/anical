"use client"

import { AnimeCardFragment } from "./types/anilist";
import stores from "@/utils/databases.json";

export interface AnimeItem {
    id?: number;
    anime_Id: number;
    data: Omit<AnimeCardFragment, 'id'>;
    timestamp?: Date;
}

const DB_NAME = "AniCalUser";
const STORE_NAME = process.env.NEXT_PUBLIC_STORE_ANIME as string;
const DB_VERSION = 1; // Increment when changing schema

const initializeDB = async (): Promise<IDBDatabase> => {
    if (typeof window === 'undefined') {
        console.error('IndexedDB is only available in browser environments');
        throw new Error('IndexedDB is only available in browser environments');
    }

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            const transaction = (event.target as IDBOpenDBRequest).transaction;

            stores.data.forEach((storeConfig) => {
                let store: IDBObjectStore;
                if (!db.objectStoreNames.contains(storeConfig.name)) {
                    store = db.createObjectStore(
                        storeConfig.name,
                        {
                            keyPath: storeConfig.keyPath.name,
                            autoIncrement: storeConfig.keyPath.autoincrement
                        }
                    );
                } else {
                    store = transaction?.objectStore(storeConfig.name) as IDBObjectStore;
                }

                storeConfig.indexes.forEach((index) => {
                    if (!store.indexNames.contains(index.name)) {
                        store.createIndex(index.name, index.keyPath, index.options);
                    }
                });
            });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

let dbPromise: Promise<IDBDatabase> | null = null;

export const getDB = () => {
    if (!dbPromise) {
        dbPromise = initializeDB().catch((error) => {
            dbPromise = null;
            throw error;
        });
    }
    return dbPromise;
};

// CRUD Operations with fixes
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
        request.onerror = () => reject(request.error);
    });
};

export const getAnimeItem = async (id: number): Promise<AnimeItem> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly"); // Corrected to readonly
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