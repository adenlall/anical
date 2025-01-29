import { create } from 'zustand';
import { getAllAnimeItems, addAnimeItem, deleteAnimeItem, AnimeItem, getAnimeItem } from '@/lib/db';

interface AnimeDBStore {
    items: AnimeItem[];
    isLoading: boolean;
    refreshItems: () => Promise<void>;
    saveAnimeItem: (animeId: number, data: object) => Promise<boolean>;
    removeAnimeItem: (animeId: number) => Promise<boolean>;
    getAnimeItem: (animeId: number) => Promise<AnimeItem | null>;
}

export const useAnimeDBStore = create<AnimeDBStore>((set) => ({
    items: [],
    isLoading: true,
    refreshItems: async () => {
        console.log("REFRECHING ITEMS ...");
        try {
            console.log("TRY S - REFRECHING ITEMS ...");
            set({ isLoading: true });
            const allItems = await getAllAnimeItems();
            set({ items: allItems, isLoading: false });
            console.log("TRY F - REFRECHING ITEMS ...");
        } catch (error) {
            console.log("CATCH S - REFRECHING ITEMS ...");
            console.error("Error fetching items:", error);
            set({ isLoading: false });
            console.log("CATCH F - REFRECHING ITEMS ...");
        }
    },
    saveAnimeItem: async (animeId: number, data: object) => {
        try {
            await addAnimeItem({ anime_Id: animeId, id: animeId, data });
            await useAnimeDBStore.getState().refreshItems();
            return true;
        } catch (error) {
            console.error("Error saving item:", error);
            return false;
        }
    },
    getAnimeItem: async (animeId: number) => {
        try {
            const item = await getAnimeItem(animeId);
            return item;
        } catch (error) {
            console.error("Error getting item:", error);
            return null;
        }
    },
    removeAnimeItem: async (animeId: number) => {
        try {
            await deleteAnimeItem(animeId);
            await useAnimeDBStore.getState().refreshItems();
            return true;
        } catch (error) {
            console.error("Error deleting item:", error);
            return false;
        }
    },
}));