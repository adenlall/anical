import gql from 'graphql-tag'; 
import clsx from "clsx";
import { AnimeStatsFragment } from '@/lib/types/anilist';
import { formated } from '@/utils/helpers';

export const ANIME_STATS = gql`
fragment AnimeStats on Media {
    meanScore
    favourites
    staff(sort:RELEVANCE){
      edges{
        role
        node{
          name {
            userPreferred
          }
          image{
            medium
          }
          primaryOccupations 
        }
      }
    }
}
`;
export default async function Stats({ data }: { data: AnimeStatsFragment }) {
    if (!data || !data.favourites || !data.meanScore) {
        return <></>;
    }

    return <div className="stats flex lg:flex-row flex-col shadow w-full">
        <div className="stat">
            <div className="stat-figure text-primary">
                <LoveIcon />
            </div>
            <div className="stat-title">total anime likes</div>
            <div className="stat-value text-primary">{formated(data.favourites)}</div>
            <div className="stat-desc">{data.favourites} like for this show</div>
        </div>

        <div className="stat">
            <div className="stat-figure text-secondary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            </div>
            <div className="stat-title">mean score</div>
            <div className="stat-value text-secondary">{data.meanScore} %</div>
            <div className="stat-desc">{data.meanScore}% average rating</div>
        </div>
        {
            data.staff?.edges?.length ?
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img alt={data.staff.edges[0]?.node?.name?.userPreferred + " photo"} src={data.staff?.edges[0]?.node?.image?.medium as string} />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">{data.staff?.edges[0]?.node?.primaryOccupations}</div>
                    <div className="stat-title">{data.staff?.edges[0]?.node?.name?.userPreferred}</div>
                    <div className="stat-desc text-primary font-bold drop-shadow-xl shadow-primary-content">{data.staff?.edges[0]?.role}</div>
                </div>
                : ''
        }
    </div>
}

export const LoveIcon = ({ className }: { className?: string | undefined }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={clsx(className ?? "inline-block h-8 w-8 stroke-current")}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
    </svg>
)