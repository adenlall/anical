import gql from 'graphql-tag';
import Entry, { ANIME_CHARACTER_ENTRY } from './Entry';
import { AnimeCharactersFragment, AnimeCharactersListFragment } from '@/lib/types/anilist';


export const ANIME_CHARACTERS_LIST = gql`
fragment AnimeCharactersList on CharacterConnection {
    edges {
        ...AnimeCharacterEntry
    }
}
${ANIME_CHARACTER_ENTRY}
`;

export default function Swipe({ data }: { data: AnimeCharactersListFragment }) {
    if (!data.edges) {
        return
    }
    return <div className='flex overflow-x-scroll gap-3'>
        {data.edges?.map((char: any, index: number) => (
            <Entry key={index} data={{ node: char?.node, voiceActors: char?.voiceActors }} />
        ))}
    </div>
}