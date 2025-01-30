"use client"

import { currentTheme, themes } from "@/utils/themes";
import { CSSProperties, useEffect } from "react";
import { Cookies } from "typescript-cookie";

export default function ThemesList({ style }: { style?: CSSProperties | undefined }) {

    useEffect(() => {
        const theme = Cookies.get(currentTheme) as string;
        document.querySelector('html')?.setAttribute('data-theme', theme ?? currentTheme);
    }, []);
    const setheme = (item: string) => {
        Cookies.set(currentTheme, item);
        document.querySelector('html')?.setAttribute('data-theme', item);
    }

    return (
        <>
            {
                themes.map((obj)=>obj.name).map((theme) => (
                    <button
                        key={crypto.randomUUID()}
                        onClick={() => { setheme(theme) }}
                        className={"outline-base-content overflow-hidden rounded-lg text-left w-full"}
                        style={style}
                        data-theme={theme}
                    >
                        <NewThemeElement theme={theme} />
                    </button>
                ))
            }
        </>
    )

}

const NewThemeElement = ({ theme }: { theme: string }) => {
    return <div data-theme={theme} className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
        <div className="flex-center p-3 px-3">
            <div className="md:flex hidden flex-grow text-sm">{theme}</div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                <div className="bg-primary w-3 h-3 rounded-lg"></div>
                <div className="bg-secondary w-3 h-3 rounded-lg"></div>
                <div className="bg-accent w-3 h-3 rounded-lg"></div>
                <div className="bg-neutral-content w-3 h-3 rounded-lg"></div>
            </div>
        </div>
    </div>
}