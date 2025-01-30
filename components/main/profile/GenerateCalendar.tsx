"use client"

import { useAnimeDB } from "@/hooks/useAnimeDB";
import { AnimeScheduleQuery } from "@/lib/types/anilist";
import { Anilist } from "@/utils/anilist.client";
import { Calendar } from "@/utils/ics/calendar";
import clsx from "clsx";
import gql from "graphql-tag";
import { useState } from "react";
import TimeIcon from '~icons/gravity-ui/clock-arrow-rotate-left'
import RecentCalendars from "./RecentCalendars";


export default () => {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>();
    const [state, setState] = useState<string>();
    const { items } = useAnimeDB();
    const generate = async () => {
        if (!name) return;
        setState("Initializing the calendar service ...");
        setLoading(true);
        try {
            const calendar = new Calendar(name + ".ics", "AnimeCal", "adenlall");
            for (let i = 0; i < items.length; i++) {
                setState("Fetching additional information " + items[i].data.title?.userPreferred + " ...");
                const data = await fetchAnimeSchedule(items[i].id || 1);
                data.Media?.airingSchedule?.nodes?.map(item => {
                    if (item?.airingAt) {
                        setState("Adding episodes events ...");
                        calendar.createEvent(
                            String(item?.airingAt),
                            String(item?.airingAt + (60 * 30)),
                            "EP " + item.episode + " - " + items[i].data.title?.userPreferred,
                            "The Episode number " + item.episode + " of " + items[i].data.title?.userPreferred + " with duration " + data.Media?.duration + " munites.\n Streaming Site on " + data.Media?.externalLinks?.find(link => link?.type === "STREAMING")?.site + "\n link : " + data.Media?.externalLinks?.find(link => link?.type === "STREAMING")?.url,
                            data.Media?.externalLinks?.find(link => link?.type == "STREAMING")?.site || "",
                            "DAILY", 0
                        );
                    }
                });
            }
            setState("Almost finish ...");
            await calendar.finish();
            await calendar.download();
        } finally {
            setLoading(false);
        }
    }
    const fetchAnimeSchedule = async (id: number): Promise<AnimeScheduleQuery> => {
        const data = await Anilist<AnimeScheduleQuery>(ANIME_SCHEDULE,
            {
                "mediaId": id,
                "type": "ANIME"
            }
        );
        return data;
    }

    return <>
        <div className="flex gap-2">
            <button
                onClick={() => (document.getElementById('generate-modal') as HTMLDialogElement)?.showModal()}
                className="btn btn-lg bg-gradient-to-r from-primary via-accent to-secondary text-base-300"
            >
                <StarsIcon /> Generate Calendar
            </button>
            <button
                onClick={() => (document.getElementById('recent-modal') as HTMLDialogElement)?.showModal()}
                className="btn btn-lg btn-square bg-gradient-to-r from-primary to-accent text-base-300"
            >
                <TimeIcon />
            </button>
            <RecentCalendars />
            <dialog id="generate-modal" className="modal">
                <div className="modal-box">
                    {items.length ? (
                        <>
                            {loading ? (
                                <div className="w-full h-40 flex-center-col">
                                    <span className="loading loading-spinner loading-lg" />
                                    <span className="mt-3 text-center" >{state}</span>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-bold text-lg">Generate Calendar</h3>
                                    <p className="py-4">easly export your watching list into .ics calendar!</p>
                                    <input onChange={(e) => { setName(e.target.value) }} className="input w-full max-w-full min-w-0 mb-4" type="text" placeholder="File Name" />
                                    <button disabled={loading || name == null || name?.length == 0} onClick={async () => await generate()} className="btn">
                                        <StarsIcon className="fill-base-content w-7 h-7" />
                                        Generate
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="w-full py-8 flex-center">
                            <span className="text-2xl font-extrabold text-center">You need to add anime to your watching list first!</span>
                        </div>
                    )}
                </div>
                <form method="dialog" className="backdrop-blur-sm modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    </>
}

const StarsIcon = ({ className }: { className?: string }) => <svg className={clsx(className ?? "w-8 h-8 fill-base-300")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M21.738 16.13a1 1 0 0 1-.19.61a1 1 0 0 1-.52.38l-1.71.57a3.6 3.6 0 0 0-1.4.86a3.5 3.5 0 0 0-.86 1.4l-.6 1.7a1 1 0 0 1-.36.51a1.1 1.1 0 0 1-.62.19a1 1 0 0 1-1-.71l-.57-1.71a3.5 3.5 0 0 0-.86-1.4a3.8 3.8 0 0 0-1.4-.87l-1.71-.56a1.1 1.1 0 0 1-.51-.37a1.1 1.1 0 0 1-.21-.62a1 1 0 0 1 .71-1l1.72-.57a3.54 3.54 0 0 0 2.28-2.28l.57-1.69a1 1 0 0 1 .95-.73c.215 0 .426.059.61.17c.182.125.322.303.4.51l.58 1.74a3.54 3.54 0 0 0 2.28 2.28l1.7.6a1 1 0 0 1 .51.38a1 1 0 0 1 .21.61m-9.999-6.36a1 1 0 0 1-.17.55a1 1 0 0 1-.47.35l-1.26.42c-.353.122-.673.32-.94.58a2.5 2.5 0 0 0-.58.94l-.43 1.24a.9.9 0 0 1-.35.47a1 1 0 0 1-.56.18a1 1 0 0 1-.57-.19a1 1 0 0 1-.34-.47l-.41-1.25a2.44 2.44 0 0 0-.58-.93a2.2 2.2 0 0 0-.93-.58l-1.25-.42a.93.93 0 0 1-.48-.35a1 1 0 0 1 .48-1.47l1.25-.41a2.49 2.49 0 0 0 1.53-1.53l.41-1.23a1 1 0 0 1 .32-.47a1 1 0 0 1 .55-.2a1 1 0 0 1 .57.16a1 1 0 0 1 .37.46l.42 1.28a2.49 2.49 0 0 0 1.53 1.53l1.25.43a.92.92 0 0 1 .46.35a.94.94 0 0 1 .18.56m5.789-5.36a1 1 0 0 1-.17.51a.82.82 0 0 1-.42.3l-.62.21a.84.84 0 0 0-.52.52l-.22.63a.93.93 0 0 1-.29.39a.82.82 0 0 1-.52.18a1.1 1.1 0 0 1-.49-.15a.9.9 0 0 1-.32-.44l-.21-.62a.7.7 0 0 0-.2-.32a.76.76 0 0 0-.32-.2l-.62-.2a1 1 0 0 1-.42-.31a.9.9 0 0 1-.16-.51a.94.94 0 0 1 .17-.51a.9.9 0 0 1 .42-.3l.61-.2a.9.9 0 0 0 .33-.2a.9.9 0 0 0 .2-.33l.21-.62c.06-.155.155-.292.28-.4a1 1 0 0 1 .49-.19a.94.94 0 0 1 .53.16a1 1 0 0 1 .32.41l.21.64a.9.9 0 0 0 .2.33a1 1 0 0 0 .32.2l.63.21a1 1 0 0 1 .41.3a.87.87 0 0 1 .17.51"></path>
</svg>

const ANIME_SCHEDULE = gql`query AnimeSchedule($mediaId: Int, $type: MediaType) {
    Media(id: $mediaId, type: $type) {
        episodes
        duration
        externalLinks {
            site
            type
            url
        }
        airingSchedule {
            nodes {
                id
                episode
                airingAt
            }
        }
        nextAiringEpisode {
            episode
            airingAt
            id
        }
    }
}`