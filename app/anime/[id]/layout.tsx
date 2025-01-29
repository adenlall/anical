import AuthBadgs, { AUTH_BADGE_FRAGMENT } from "@/components/main/profile/AuthBadgs";
import { AuthBadgeFragment, SettingsQuery } from "@/lib/types/anilist";
import { Anilist } from "@/utils/anilist";
import gql from "graphql-tag";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  }) {

  const queryRes = await Anilist<SettingsQuery>(
    gql`query Settings{
        Viewer {
          ...AuthBadge
        }
      }
      ${AUTH_BADGE_FRAGMENT}`
  );

  return <main className="container mx-auto md:px-4 pt-8">
    <AuthBadgs generate={false} {...queryRes.Viewer as AuthBadgeFragment} />
    {children}
  </main>

}