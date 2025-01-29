import List from "@/components/@HooKit/AnimeListWrapper";
import ThemesList from "@/components/@HooKit/Themes/ThemesList";
import ColoredText from "@/components/ColoredText";
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
      <List>
        <List.Header>
          <ColoredText className={"pt-4 pl-4"}>
            <h2 className="text-4xl font-extrabold text-center">Change App Theme!</h2>
          </ColoredText>
          <List.List className="[display:flex!important] flex-wrap gap-2">
            <ThemesList style={{ width: '10rem' }} />
          </List.List>
        </List.Header>
      </List>
    </div>
}