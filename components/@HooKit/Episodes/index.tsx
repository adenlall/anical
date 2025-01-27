import { getDictionary } from "@/app/[lang]/dictionaries"
import { getCookie } from "@/utils/cookies";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VideoIcon from '~icons/gravity-ui/video'
import RightIcon from '~icons/gravity-ui/triangle-right'
import LeftIcon from '~icons/gravity-ui/triangle-left'
import Link from "next/link";

export default function Episodes({ data, poster, animeId }: { data: any[], poster?: string, animeId: string }) {

    const [index, setIndex] = useState(1);
    const slice = 10;

    const { isPending, error, data: dict } = useQuery({
        queryKey: ['dictionary', 'episodes'],
        queryFn: () =>
            getDictionary('episodes')
    })

    const Pagination = () => (
        <div className="flex w-fit join">
            <button className="btn btn-sm join-item" onClick={() => setIndex((index - 1) > 0 ? index - 1 : 1)}><LeftIcon /></button>
            {index - 3 > 0 ? <>
                <button className="btn btn-sm join-item" onClick={() => setIndex(1)}>1</button>
                <button className="btn btn-sm join-item">...</button>
            </> : ""}
            {[0, 1, 2]?.filter((i) => (index - i) > 0).reverse().map((i) => (
                <button key={i} className="btn btn-sm join-item" onClick={() => setIndex(index - i)}>{index - i}</button>
            ))}
            {[...new Array(3)].filter((e, i) => Math.ceil(data.length / slice) > index + i).map((e, i) => (
                <button key={i} className="btn btn-sm join-item" onClick={() => setIndex(index + i + 1)}>{index + i + 1}</button>
            ))}
            {index + 3 < Math.ceil(data.length / slice) ? <>
                <button className="btn btn-sm join-item">...</button>
                <button className="btn btn-sm join-item" onClick={() => setIndex(Math.ceil(data.length / slice))}>{Math.ceil(data.length / slice)}</button>
            </> : ""}

            <button className="btn btn-sm join-item" onClick={() => setIndex((index) >= Math.ceil(data.length / slice) ? Math.ceil(data.length / slice) : index + 1)}><RightIcon /></button>
        </div>
    );

    return <div className="overflow-x-auto">
        <div className="bg-base-300 flex items-center gap-4 rounded-lg p-2 w-full">
            <Pagination />
            <span>{dict?.totleepisodes} : <b>{data.length}</b></span>
        </div>
        <table className="table">
            <thead>
                <tr className="sticky top-0">
                    <th>{dict?.name}</th>
                    <th>{dict?.title}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.slice(0 + (slice * (index - 1)), slice + (slice * (index - 1))).map((ep: any, i: number) => (
                    <tr key={i}>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar w-24">
                                    <div className="mask rounded-lg h-12 w-full bg-secondary">
                                        <img
                                            src={ep.image ?? poster}
                                            alt={dict?.alt.replace('%n%', ep.episode)} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold">{dict?.episode} {ep.episode}</h3>
                                    <p className="text-sm opacity-50">{ep.rating}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p>
                                {ep.title[getCookie('locale') || ''] ?? ep.title.en}
                                <br />
                                <span className="badge badge-ghost badge-sm">{ep.airdate}</span>
                            </p>
                        </td>
                        <th>
                            <Link href={"/anime/" + animeId + "/episode/" + ep.episode} className="btn btn-primary"><VideoIcon /> {dict?.watch} {ep.episode}</Link>
                        </th>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="bg-base-300 flex items-center gap-4 rounded-lg p-2 w-full">
            <Pagination />
            <span>{dict?.totleepisodes} : <b>{data.length}</b></span>
        </div>
    </div>
}