import AuthBadgs, { AUTH_BADGE_FRAGMENT } from "@/components/main/profile/AuthBadgs"
import { AuthBadgeFragment, SettingsQuery } from "@/lib/types/anilist";
import { Anilist } from "@/utils/anilist";
import gql from "graphql-tag";

export default async () => {

    const queryRes = await Anilist<SettingsQuery>(
        gql`query Settings{
        Viewer {
          ...AuthBadge
        }
      }
      ${AUTH_BADGE_FRAGMENT}`
    );

    return <div className="container mx-auto md:px-4 py-8">
        <AuthBadgs generate={false} {...queryRes.Viewer as AuthBadgeFragment} />
    </div>
}