import AuthBadgs, { AUTH_BADGE_FRAGMENT } from '@/components/main/profile/AuthBadgs';
import gql from 'graphql-tag';
import { Anilist } from '@/utils/anilist';
import { AuthBadgeFragment, ProfileQuery } from '@/lib/types/anilist';
import AnimeCard, { ANIME_CARD } from '@/components/@HooKit/AnimeCard';
import List from '@/components/@HooKit/AnimeListWrapper';
import AllOngoing from '@/components/main/profile/AllOngoing';
import { Suspense } from 'react';
import PickupAnimes from '@/components/main/profile/PickupAnimes';


export default async function ProfilePage() {
  const queryRes = await Anilist<ProfileQuery>(
    gql`query Profile($status: MediaListStatus, $type: MediaType, $userId: Int){
        Viewer {
          ...AuthBadge
        }
        Page {
          mediaList(status: $status, type: $type, userId: $userId) {
            media {
              ...AnimeCard
            }
          }
        }
      }
      ${ANIME_CARD}
      ${AUTH_BADGE_FRAGMENT}`,
    {
      status: "CURRENT",
      type: "ANIME",
      userId: 5783357
    }
  );


  return (
    <div className="container mx-auto md:px-4 py-8">
      <AuthBadgs {...(queryRes.Viewer as AuthBadgeFragment)} />
      <PickupAnimes />
      <List>
        <List.Header>
          <h2 className='ml-4 mt-2 text-2xl'>Currently Watching :</h2>
        </List.Header>
        <List.List>
          {queryRes.Page?.mediaList?.map(media => (
            <AnimeCard key={media?.media?.id} id={media?.media?.id || 0} {...media?.media} />
          ))}
        </List.List>
      </List>
      <Suspense fallback={<div className="p-14 w-auto bg-primary rounded-lg skeleton" />}>
        <AllOngoing />
      </Suspense>
    </div>
  );
}