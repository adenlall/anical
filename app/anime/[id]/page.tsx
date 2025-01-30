import { Anilist } from '@/utils/anilist';
import type { AnimeHeaderQuery, GetAnimeQuery } from '@/lib/types/anilist';
import AnimeDetails, { ANIME_DETAILS } from '@/components/@HooKit/AnimeDetails';
import gql from 'graphql-tag';
import Characters, { ANIME_CHARACTERS } from '@/components/@HooKit/Characters';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ANIME_HEADER = gql`
  query AnimeHeader($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeDetails
      ...AnimeCharacters
    }
  }
  ${ANIME_DETAILS}
  ${ANIME_CHARACTERS}
`

export default async function AnimePage({ params }: PageProps) {
  const data = await Anilist<GetAnimeQuery>(ANIME_HEADER, {
    id: parseInt((await params).id), // Direct access without await
  }) as AnimeHeaderQuery;

  return (
    <div>
      <AnimeDetails data={{
        coverImage: data.Media?.coverImage,
        description: data.Media?.description,
        genres: data.Media?.genres,
        title: data.Media?.title,
        format: data.Media?.format,
        reviews: data.Media?.reviews,
        studios: data.Media?.studios,
        favourites: data.Media?.favourites,
        meanScore: data.Media?.meanScore,
        staff: data.Media?.staff,
      }} />

      <Characters data={{
        characters: data.Media?.characters,
        title: data.Media?.title
      }} />
    </div>
  );
}