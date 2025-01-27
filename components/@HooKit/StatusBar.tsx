import gql from 'graphql-tag';

export const ANIME_TITLE = gql`
    fragment AnimeTitle on Media {
        title{
            romaji
        }
    }
`;
export default function StatusBar() {
    return <h2>Hello</h2>
}