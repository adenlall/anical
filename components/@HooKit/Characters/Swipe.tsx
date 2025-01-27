import { AnimeCharactersListFragment } from '@/generated/graphql';
import gql from 'graphql-tag';
import Entry, { ANIME_CHARACTER_ENTRY } from './Entry';


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
        {data.edges?.map((char, index) => (
            <Entry key={index} data={{ node: char?.node, voiceActors: char?.voiceActors }} />
        ))}
    </div>
}