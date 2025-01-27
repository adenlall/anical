"use client";

import { useAnimeDB } from '@/hooks/useAnimeDB';
import { AnimeCardFragment } from '@/lib/types/anilist';
import { useEffect, useState } from 'react';
import PlusIcon from '~icons/gravity-ui/plus';
import TrashIcon from '~icons/gravity-ui/trash-bin';


export default ({ data }: { data: AnimeCardFragment }) => {
    const { items, saveAnimeItem, isLoading } = useAnimeDB();

    const exist = items.some(item => item.anime_Id === data.id);
    const addTo = async () => {
        try {
            if (data && data.id) {
                await saveAnimeItem(data.id, data);
            }
        } catch (error) {
            alert("Invalid JSON format for data field!");
        }
    }
    return <div className="tooltip tooltip-top absolute z-20 bottom-0 right-0" data-tip={exist ? "Already added!" : "Add to your Calendar"}>
        <button disabled={exist} onClick={async () => await addTo()} className={"btn m-2 sm:btn-md btn-sm btn-success btn-square"}>
            <PlusIcon />
        </button>
    </div>
}


export const RemoveFromCalendar = ({ id }: { id: number }) => {
    const { removeAnimeItem } = useAnimeDB();
    const remvoe = async () => {
        try {
            if (id) {
                await removeAnimeItem(id);
            }
        } catch (error) {
            alert("We can't remove this Item!");
        }
    }
    return <div className="tooltip tooltip-top absolute z-20 bottom-0 right-0" data-tip="Remove it from your Calendar">
        <button onClick={async () => await remvoe()} className={"btn m-2 sm:btn-md btn-sm btn-error btn-square"}>
            <TrashIcon />
        </button>
    </div>
}
