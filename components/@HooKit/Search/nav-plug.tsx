'use client';

import useSearch from "@/hooks/useSearch";
import Link from "next/link";
import { useState, useEffect, useDeferredValue, useTransition } from "react";

export default function Search() {
    return (
        <>
            <div className="block">
                <Conmponent />
            </div>
        </>
    );
}

function Conmponent() {

    const [query, setQuery] = useState("");
    const term = useDeferredValue(query);
    const [isPending, startTransition] = useTransition();

    const { results, loading }: { results: any, loading: any } = useSearch(term);

    function handleSearch(e: any) {
        startTransition(() => {
            setQuery(e.target.value);
        });
    }

    return (
        <label dir="ltr" className="searchbox relative mx-3 w-full">
            <div className="dropdown" >
                <search className="join border-primary-content border-2">
                    <input onChange={handleSearch} value={query} className="input input-sm input-bordered input-primary text-base-content w-full join-item md:w-[9em] w-23 lg:w-[15em]" tabIndex={0} name="search" type="search" placeholder="ابحث..." />
                    <Link href={"/search?q=" + encodeURI(query)} className="btn btn-sm btn-primary join-item px-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="strock-secondary-content w-[1.5em]"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="fill-secondary-content"
                                d="M4 11a7 7 0 1114 0 7 7 0 01-14 0zm7-9a9 9 0 105.618 16.032l3.675 3.675a1 1 0 001.414-1.414l-3.675-3.675A9 9 0 0011 2z"
                            />
                        </svg>
                    </Link>
                </search>
                <ul tabIndex={0} className="dropdown-content z-[11] menu p-2 mt-2 shadow bg-base-100 rounded-box w-full max-h-[80vh] overflow-auto flex-nowrap">
                    <li role="option" className="selected">
                        <Link className="py-2 text-sm font-normal flex flex-col items-start bg-base-200 w-full mb-1" href={"/search?q=" + encodeURI(query)}>
                            <span className="overflow-ellipsis overflow-hidden w-full whitespace-nowrap text-base-content">
                                أدوات بحث أكثر
                            </span>
                        </Link>
                    </li>
                    {/* {JSON.stringify(results)} */}
                    {
                        term.length ? (
                            <>
                                {
                                    results?.map((item: any, i: number) => (
                                        <li key={i} role="option" className="selected">
                                            <Link className="py-2 text-sm font-normal flex flex-col items-start bg-base-200 w-full mb-1" href={'/anime/' + item.id}>
                                                <span className="overflow-ellipsis overflow-hidden w-full whitespace-nowrap text-base-content">
                                                    {item.title.userPreferred}
                                                </span>
                                                <div className="flex">
                                                    <span className="badge badge-accent mr-1">{item.format}</span>
                                                    {/* <span className="badge badge-accent">{item.status.name}</span> */}
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                }{
                                    loading || isPending ? (
                                        <li role="option" className="selected">
                                            <div className="py-2 text-sm font-normal flex flex-col items-start bg-info w-full mb-1">
                                                <span className="overflow-ellipsis text-info-content overflow-hidden w-full whitespace-nowrap">
                                                    جاري البحث...
                                                </span>
                                            </div>
                                        </li>
                                    ) : <>
                                        {!results.length && !loading ? (
                                            <li role="option" className="selected">
                                                <div className="py-2 text-sm font-normal flex flex-col items-start bg-error w-full mb-1">
                                                    <span className="overflow-ellipsis text-error-content overflow-hidden w-full whitespace-nowrap">
                                                        {"لا توجد نتائج"}
                                                    </span>
                                                </div>
                                            </li>
                                        ) : ""}
                                    </>
                                }
                            </>
                        ) : ""
                    }
                </ul>
            </div>
        </label>
    )
}
