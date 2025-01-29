import SettingsIcon from "~icons/gravity-ui/gear"
import ProfileIcon from "~icons/gravity-ui/person"
import Link from "next/link";
import { headers } from 'next/headers';

export default async () => {
    const profile = (await headers()).get("x-url")?.includes("profile");
    return <Link href={profile ? "/settings" : "/profile"} className="rounded-full group-hover:w-24 [display:flex!important] flex-center bg-base-100/60 w-0 h-24 absolute">
        {profile ? (
            <SettingsIcon className="fill-base-content w-12 h-12" />
        ) : (
            <ProfileIcon className="fill-base-content w-12 h-12" />
        )}
    </Link>
}