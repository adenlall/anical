import { AuthBadgeFragment } from "@/lib/types/anilist";
import gql from "graphql-tag";
import GenerateCalendar from "./GenerateCalendar";
import ProfileSettingsRouter from "./ProfileSettingsRouter";

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
    <div className="flex items-center space-x-4 mb-8 group">
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