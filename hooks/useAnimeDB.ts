"use client";

import { useEffect } from "react";
import { useAnimeDBStore } from '@/stores/animeDBStore';

export const useAnimeDB = () => {
    const { items, isLoading, refreshItems, saveAnimeItem, removeAnimeItem, getAnimeItem } = useAnimeDBStore();

    useEffect(() => {
        console.log("LOADING", isLoading);
    }, [isLoading])

    return {
        items,
        isLoading,
        saveAnimeItem,
        removeAnimeItem,
        getAnimeItem,
        refreshItems,
    };
};