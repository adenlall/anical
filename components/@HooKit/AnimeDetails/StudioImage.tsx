"use client";

import { useEffect, useState } from "react";

export default function StudioImage({ studio }: { studio: string | null | undefined }) {
    const [url, setUrl] = useState<string | undefined>();

    useEffect(() => {
        async function fetchAPI() {
            if (!studio) return; // Early return if studio is not defined
            const res = await fetch('/api/image?q=' + studio, { cache: 'force-cache' });
            const data = await res.json();
            setUrl(data.url ?? 'none');
        }
        fetchAPI();
    }, [studio]);

    if (!studio || url === 'none') {
        return null;
    }

    return (
        <img
            src={url}
            alt={studio + " studio logo"}
            className="bg-base-100 w-auto h-14 shadow-md rounded-lg"
            style={{ aspectRatio: 1 }}
        />
    );
}