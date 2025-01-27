import ThemesList from "@/components/@HooKit/Themes/ThemesList";

export default function ThemeSwitcher() {

    return <div style={{zIndex: 3}} className="dropdown dropdown-end dropdown-hover">
        <button className={"outline-base-content overflow-hidden rounded-box text-left"}>
            <div className="grid grid-cols-5 grid-rows-3">
                <div
                    className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-2">
                    <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                        <div className="bg-primary w-2 h-5 rounded"/>
                        <div className="bg-secondary w-2 h-5 rounded"/>
                        <div className="bg-accent w-2 h-5 rounded"/>
                        <div className="bg-neutral w-2 h-5 rounded"/>
                    </div>
                </div>
            </div>
        </button>
        <ul tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow-md bg-base-200 space-y-2 max-h-[340px] block overflow-y-scroll rounded-box w-52">
            <ThemesList/>
        </ul>
    </div>
}
