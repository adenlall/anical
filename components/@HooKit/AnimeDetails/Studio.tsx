import gql from 'graphql-tag'; 
import StudioImage from "./StudioImage";
import { LikeIcon } from "./Review";
import { AnimeStudioFragment } from '@/lib/types/anilist';

export const ANIME_STUDIO = gql`
fragment AnimeStudio on Media {
    studios(isMain:true){
      edges{
        node {
          name
          favourites
        }
      }
    }
}
`;
export default function Studio({ data }: { data: AnimeStudioFragment }) {
  if (!data.studios?.edges || !data.studios?.edges?.length) {
    return <></>;
  }
  return <div className="bg-base-300 rounded-lg p-2 flex items-center gap-2">
    <StudioImage studio={data.studios.edges[0]?.node?.name} />
    <div>
      <span className="text-lg font-bold">{data.studios.edges[0]?.node?.name}</span>
      <span className="flex items-center gap-1"><LikeIcon /> {data.studios.edges[0]?.node?.favourites}</span>
    </div>
  </div>
}