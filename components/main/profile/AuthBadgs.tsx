import { AuthBadgeFragment } from "@/lib/types/anilist";
import gql from "graphql-tag";
import GenerateCalendar from "./GenerateCalendar";
import ProfileSettingsRouter from "./ProfileSettingsRouter";
import HomeIcon from "~icons/gravity-ui/house";
import SettingsIcon from "~icons/gravity-ui/gear";
import Link from "next/link";

export const AUTH_BADGE_FRAGMENT = gql`
    fragment AuthBadge on User {
        id
        name
        avatar {
          medium
        }
        statistics {
            anime {
                count
                episodesWatched
            }
        }
    }
`;

export default ({ generate = true, ...viewer }: AuthBadgeFragment & { generate?: boolean }) => {
  return <div className="flex justify-between items-center md:flex-row flex-col md:mb-0 mb-6">
    <div className="flex items-center gap-2 mb-8 group">
      <Navigation />
      <div className="avatar">
        <ProfileSettingsRouter />
        <div className="w-24 rounded-full">
          <img
            src={viewer?.avatar?.medium as string}
            alt={viewer?.name}
          />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{viewer?.name}</h1>
        <p className="text-gray-600">
          {viewer?.statistics?.anime?.count} anime watched
        </p>
        <p className="text-gray-600">
          {viewer?.statistics?.anime?.episodesWatched} episodes watched
        </p>
      </div>
    </div>
    {generate ? <GenerateCalendar /> : null}
  </div>
}

export const Navigation = () => <div className="join join-vertical">
  <Link href={"/"} className="join-item btn btn-sm btn-square">
    <HomeIcon />
  </Link>
  <Link href={"/settings"} className="join-item btn btn-sm btn-square">
    <SettingsIcon />
  </Link>
  <Link href={"https://github.com/adenlall/AnimeCal"} className="join-item btn btn-sm btn-square">
    <GitHubIcon className="fill-base-content w-5 h-5" />
  </Link>
</div>

const GitHubIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66a1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22a2.75 2.75 0 0 1-.41-2.06a3.7 3.7 0 0 0 0-1.41a7.7 7.7 0 0 0-2.09 1.09a1 1 0 0 1-.84.15a10.15 10.15 0 0 0-5.52 0a1 1 0 0 1-.84-.15a7.4 7.4 0 0 0-2.11-1.09a3.5 3.5 0 0 0 0 1.41a2.84 2.84 0 0 1-.43 2.08a4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66a1 1 0 0 1-.21 1a2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09a3.9 3.9 0 0 0-1.16-.88a1 1 0 1 1 .5-1.94a4.9 4.9 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.9 3.9 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33a.85.85 0 0 0 .13-.62a5.7 5.7 0 0 1 .33-3.21a1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57a5.7 5.7 0 0 1 .33 3.22a.75.75 0 0 0 .11.57a6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.3 4.3 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1"></path>
</svg>