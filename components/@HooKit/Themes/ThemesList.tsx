"use client"

import { currentTheme, themes } from "@/utils/themes";
import { CSSProperties, useEffect } from "react";
import { Cookies } from "typescript-cookie";

export default function ThemesList({ style }: { style?: CSSProperties | undefined }) {

    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', localStorage[currentTheme] ?? currentTheme);
    }, []);
    const setheme = (item: string) => {
        Cookies.set(currentTheme, item)
        localStorage[currentTheme] = item;
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

const ThemeElement = ({ theme }: { theme: string }) => {
    return <div data-theme={theme} className="bg-base-100 text-base-content w-full cursor-pointer font-sans rounded-box">
        <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center md:gap-2 gap-1 md:px-4 px-1 md:py-2 py-1">
                <div className="md:flex hidden flex-grow text-sm">{theme}</div>
                <div className="flex h-full flex-shrink-0 flex-wrap md:gap-1">
                    <div className="bg-primary md:w-2 w-4 h-4 md:h-5 md:rounded rounded-none rounded-tr-box rounded-br-box"></div>
                    <div className="bg-secondary md:w-2 w-4 h-4 md:h-5 md:rounded rounded-none"></div>
                    <div className="bg-accent md:w-2 w-4 h-4 md:h-5 md:rounded rounded-none"></div>
                    <div className="bg-neutral md:w-2 w-4 h-4 md:h-5 md:rounded rounded-none rounded-tl-box rounded-bl-box"></div>
                </div>
            </div>
        </div>
    </div>
}