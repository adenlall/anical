'use client';

import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Cookies } from "typescript-cookie";
import BoltIcon from '~icons/gravity-ui/thunderbolt-fill';

export default function LoginButton() {

  const token = Cookies.get("anilist_token");

  const login = () => {
    const clientId = process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/api/auth/callback`
    );
    const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = authUrl;
  };

  const logout = () => {
    Cookies.remove("anilist_token");
    redirect("/");
  };

  return <div className="flex-center gap-2">
    {token ? (
      <Link href={"/profile"} className="btn flex-center gap-2 btn-primary transition-colors">
        <BoltIcon className="h-5 w-5" />
        Profile
      </Link>
    ) : null}
    <button
      onClick={token ? logout : login}
      className={clsx("group btn flex-center gap-2 transition-colors", token ? "btn-outline" : "btn-primary")}
    >
      <AniListIcon auth={token ? true : false} />
      {token ? 'Logout' : 'Login with AniList'}
    </button>
  </div>;
}
const AniListIcon = ({ auth }: { auth?: boolean }) => <svg className={clsx(auth ? 'fill-base-content group-hover:fill-base-200' : 'fill-primary-content')} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
  <path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96l-1.69-5.014l-1.541 5.015h3.23z"></path>
</svg>