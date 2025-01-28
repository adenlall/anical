import { AuthBadgeFragment } from "@/lib/types/anilist";
import gql from "graphql-tag";
import GenerateCalendar from "./GenerateCalendar";

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

export default (viewer: AuthBadgeFragment) => {
  return <div className="flex justify-between items-center">
    <div className="flex items-center space-x-4 mb-8">
      <img
        src={viewer?.avatar?.medium as string}
        alt={viewer?.name}
        className="w-24 h-24 rounded-full"
      />
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
    <GenerateCalendar />
  </div>
}