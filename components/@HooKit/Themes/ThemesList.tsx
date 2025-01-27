"use client"

import { currentTheme, themes } from "@/utils/themes";
import { useEffect } from "react";

export default function ThemesList({ width }:{ width?:string|number|null} ) {

    useEffect(()=>{
        document.querySelector('html')?.setAttribute('data-theme', localStorage[currentTheme]??currentTheme);
    },[])
    const setheme = (item:string) => {
        localStorage[currentTheme] = item;
        document.querySelector('html')?.setAttribute('data-theme', item);
    }

    return (
        <>
            {
                themes.map((obj)=>obj.name).map((theme) => (
                    <button key={crypto.randomUUID()} onClick={() => { setheme(theme) }} className={"outline-base-content overflow-hidden rounded-box text-left " + (width ?? "w-full")} data-theme={theme}>
                        <div data-theme={theme} className="bg-base-100 text-base-content w-full cursor-pointer font-sans rounded-box">
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
                    </button>
                ))
            }
        </>
    )

}