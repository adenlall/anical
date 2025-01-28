"use client"

import { Calendar } from "@/utils/ics/calendar"
import { useEffect, useState } from "react";

export default () => {
    const [cal, setCal] = useState<string>("{}");

    useEffect(() => {
        saveFile();
    }, []);

    const saveFile = async () => {
        const calendar = new Calendar("hello", "AniCal", "adenlall");
        calendar.createEvent(1736604000, 1736604000, "this is the summary", "this is the discription", "Netflix", "DAILY", 4)
            .alarm("this alarm desc", "5D")
            .alarm("this alarm other desc", "3D");
        calendar.createEvent(1736604000, 1736604000, "this is the second summary", "this is the second discription", "HULU", "WEEKLY", 4)
        await calendar.finish();
        setCal(calendar.content);
    }

    return <pre className="p-8">
        {cal}
    </pre>
}