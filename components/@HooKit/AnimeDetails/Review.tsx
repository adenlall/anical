import { AnimeReviewsFragment } from '@/lib/types/anilist';
import gql from 'graphql-tag'; 

export const ANIME_REVIEWS = gql`
fragment AnimeReviews on Media {
    reviews (sort:SCORE, limit:5) {
        edges {
            node {
            user{
                name
                avatar {
                medium
                }
            }
            summary
            rating
            score
            }
        }
    }
}
`;
export default function Review({ data }: { data: AnimeReviewsFragment }) {
    if (!data.reviews || !data.reviews.edges?.length) {
        return <></>
    }
    const random = Math.floor(Math.random() * Math.min(data.reviews.edges?.length, 5));
    const review = data.reviews.edges[random];
    return <div>
        <div className="flex items-center gap-2">
            <img alt={review?.node?.user?.name + " profile image"} className="base-content border-base-100 border-4 btn-circle -mb-4 relative" src={review?.node?.user?.avatar?.medium as string} />
            <Rating score={review?.node?.score} />
            <span className="flex items-center gap-1 px-1 badge -mb-1 opacity-80"><LikeIcon /> {review?.node?.rating}</span>
        </div>
        <div className="w-fit primary shadow-sm p-3 pl-4 ml-4 rounded-lg">
            {review?.node?.summary}
        </div>
    </div>
}

const Rating = ({ score }: { score: number | undefined | null }) => {
    if (!score) {
        return
    }
    const stars = Math.floor((score / 100) * 5);
    return <div className="rating">
        <input checked={stars > 0 ? true : false} type="radio" name="rating-2" className="mask mask-star-2 cursor-default bg-orange-400 w-5 h-5" disabled />
        <input checked={stars > 1 ? true : false} type="radio" name="rating-2" className="mask mask-star-2 cursor-default bg-orange-400 w-5 h-5" disabled />
        <input checked={stars > 2 ? true : false} type="radio" name="rating-2" className="mask mask-star-2 cursor-default bg-orange-400 w-5 h-5" disabled />
        <input checked={stars > 3 ? true : false} type="radio" name="rating-2" className="mask mask-star-2 cursor-default bg-orange-400 w-5 h-5" disabled />
        <input checked={stars > 4 ? true : false} type="radio" name="rating-2" className="mask mask-star-2 cursor-default bg-orange-400 w-5 h-5" disabled />
    </div>
}

export const LikeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
        <g fill="none">
            <path fill="currentColor" d="m15 10l-.986-.164A1 1 0 0 0 15 11zM4 10V9a1 1 0 0 0-1 1zm16.522 2.392l.98.196zM6 21h11.36v-2H6zM18.56 9H15v2h3.56zm-2.573 1.164l.805-4.835L14.82 5l-.806 4.836zM14.82 3h-.214v2h.214zm-3.543 1.781L8.763 8.555l1.664 1.11l2.516-3.774zM7.93 9H4v2h3.93zM3 10v8h2v-8zm17.302 8.588l1.2-6l-1.96-.392l-1.2 6zM8.762 8.555A1 1 0 0 1 7.93 9v2a3 3 0 0 0 2.496-1.336zm8.03-3.226A2 2 0 0 0 14.82 3v2zM18.56 11a1 1 0 0 1 .981 1.196l1.961.392A3 3 0 0 0 18.561 9zm-1.2 10a3 3 0 0 0 2.942-2.412l-1.96-.392a1 1 0 0 1-.982.804zM14.606 3a4 4 0 0 0-3.328 1.781l1.664 1.11A2 2 0 0 1 14.606 5zM6 19a1 1 0 0 1-1-1H3a3 3 0 0 0 3 3z"></path>
            <path stroke="currentColor" strokeWidth={2} d="M8 10v10"></path>
        </g>
    </svg>
);