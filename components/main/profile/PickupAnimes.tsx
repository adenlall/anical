"use client"
import AnimeCard from "@/components/@HooKit/AnimeCard"
import List from "@/components/@HooKit/AnimeListWrapper"
import ColoredText from "@/components/ColoredText"
import { useAnimeDB } from "@/hooks/useAnimeDB"
import clsx from "clsx"
import { useEffect } from "react"

export default () => {
    const { isLoading, items, refreshItems } = useAnimeDB();
    useEffect(() => {
        const ref = async () => await refreshItems();
        ref();
    }, [refreshItems]);
    if (isLoading && (!items || !items.length)) {
        return <div className="bg-base-200 flex-center rounded-lg p-4 w-full py-20">
            <span className="loading loading-spinner loading-lg m-auto"></span>
        </div>
    }
    return <>
        {(!items || !items.length) && !isLoading ? (
            <div className="bg-base-200 flex-center rounded-lg p-4 w-full py-20">
                <ColoredText>
                    <h1 className="text-center">Add Anime to your calendar from the lists below!</h1>
                </ColoredText>
            </div>
        ) : (
                <div className={clsx("bg-base-200 rounded-box p-4", isLoading ? "blur-sm" : null)}>
                    <ColoredText className={"mt-2 ml-5 text-3xl font-extrabold"}>Selected Animes :</ColoredText>
                <List.List>
                    {items.map(item => (
                        <AnimeCard key={item.id} removeAction={true} id={item.id || 0} {...item.data} />
                    ))}
                </List.List>
            </div>
        )}
    </>
}
