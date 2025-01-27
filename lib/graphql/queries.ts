import gql from "graphql-tag";

export const MEDIA_FRAGMENT = gql`
  fragment MediaFragment on Media {
    id
    title {
      english
      native
    }
    coverImage {
      large
    }
    bannerImage
    description
  }
`;

export const ANIME_QUERY = gql`
  query GetAnime($id: Int) {
    Media(id: $id, type: ANIME) {
      ...MediaFragment
      episodes
      status
      genres
    }
  }
  ${MEDIA_FRAGMENT}
`;