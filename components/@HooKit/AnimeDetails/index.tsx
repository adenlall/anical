import { AnimeDetailsFragment } from '@/lib/types/anilist';
import gql from 'graphql-tag';
import Actions from './Actions';
import Review, { ANIME_REVIEWS } from './Review';
import Studio, { ANIME_STUDIO } from './Studio';
import Stats, { ANIME_STATS } from './Stats';
import { Key } from 'react';

export const ANIME_DETAILS = gql`
    fragment AnimeDetails on Media {
        coverImage{
            large
        }
        title{
            romaji
            english
        }
        description(asHtml:false)
        genres
        format
        ...AnimeReviews
        ...AnimeStudio
        ...AnimeStats
    }
    ${ANIME_REVIEWS}
    ${ANIME_STUDIO}
    ${ANIME_STATS}
`;
export default async function AnimeDetails({ data }: { data: AnimeDetailsFragment }) {
    return <div className="h-auto w-full bg-base-200 rounded-lg p-2 flex md:flex-row flex-col gap-2">
        <div className='md:w-52 md:min-w-52 w-full space-y-2'>
            <img src={data.coverImage?.large as string} className="sm:h-[20em] m-0 sm:m-auto md:m-0 h-auto w-full sm:w-auto md:w-full bg-base-300 rounded-md" />
            <Actions />
            <Studio data={{ studios: data.studios }} />
        </div>
        <div className='w-auto space-y-2 p-2'>
            <h1>{data.title?.romaji ?? data.title?.english}</h1>
            <ul>
                <li className='badge bg-base-200 border-base-100 border-[3px] shadow-lg'>{data?.format}</li>
                {data.genres?.map((genre: any, i: Key | null | undefined) => (
                    <li key={i} className='badge'>{genre}</li>
                ))}
            </ul>
            <p
                className='w-full indent-4'
                dangerouslySetInnerHTML={{ __html: data.description || '' }}
            />
            <div className='space-y-3 pt-2'>
                <Review data={{ reviews: data.reviews }} />
                <Stats data={{ favourites: data.favourites, meanScore: data.meanScore, staff: data.staff }} />
            </div>
        </div>
    </div>
}