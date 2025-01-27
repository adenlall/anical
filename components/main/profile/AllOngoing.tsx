import AnimeCard, { ANIME_CARD } from "@/components/@HooKit/AnimeCard"
import List from "@/components/@HooKit/AnimeListWrapper"
import { AllOngoingQuery } from "@/lib/types/anilist"
import { Anilist } from "@/utils/anilist"
import gql from "graphql-tag"

export default async () => {
  const queryRes = await Anilist<AllOngoingQuery>(
    gql`query AllOngoing($status: MediaStatus, $type: MediaType, $sort: [MediaSort]) {
        Page {
          media (status: $status, type: $type, sort: $sort) {
            ...AnimeCard
          }
        }
      }
      ${ANIME_CARD}`,
    {
      "status": "RELEASING",
      "type": "ANIME",
      "sort": "POPULARITY_DESC",
    }
  );

  return <List>
    <List.Header>
      <h2 className='ml-4 mt-2 text-2xl'>All Curruntly Releasing Anime :</h2>
    </List.Header>
    <List.List>
      {queryRes.Page?.media?.map(media => (
        <AnimeCard key={media?.id} id={media?.id || 0} {...media} />
      ))}
    </List.List>
  </List>
}