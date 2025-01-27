"use client"

import { useEffect, useState } from "react";

export default function StudioImage({ studio }: { studio: string | null | undefined }) {
    if (!studio) {
        return <></>;
    }
    const [url, setUrl] = useState();
    useEffect(() => {
        fetchAPI();
    }, []);
    async function fetchAPI() {
        const res = await fetch('/api/image?q=' + studio, { cache: 'force-cache' });
        const data = await res.json();
        setUrl(data.url ?? 'none')
    }
    return url !== 'none' ? <img src={url} className="bg-base-100 w-auto h-14 shadow-md rounded-lg" style={{ aspectRatio: 1 }} /> : <></>;
}