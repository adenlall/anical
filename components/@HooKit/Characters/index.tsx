import PersonsIcon from '~icons/gravity-ui/persons'
import gql from 'graphql-tag';
import Swipe, { ANIME_CHARACTERS_LIST } from './Swipe';
import { AnimeCharactersFragment } from '@/lib/types/anilist';

export const ANIME_CHARACTERS = gql`
fragment AnimeCharacters on Media {
    title {
        userPreferred
    }
    characters (perPage:7, sort:FAVOURITES_DESC) {
        ...AnimeCharactersList
    }
}
${ANIME_CHARACTERS_LIST}
`;

export default async function Characters({ data }: { data: AnimeCharactersFragment }) {
    if (!data?.characters?.edges) {
        return
    }
    return <div className="bg-base-200 p-3 my-4 rounded-lg">
        <div className='flex items-center gap-2 mb-2'>
            <PersonsIcon /><h2>{data.title?.userPreferred ?? 'Anime'} Characters</h2>
        </div>
        <Swipe data={{ edges: data.characters.edges }} />
    </div>;
}