import AddToCalendar, { RemoveFromCalendar } from '@/components/main/profile/AddToCalendar';
import { AnimeCardFragment, MediaFormat, MediaStatus, MediaTitle } from '@/lib/types/anilist';
import gql from 'graphql-tag';;
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import ListIcon from '~icons/gravity-ui/list-ul';

export const ANIME_CARD = gql`
    fragment AnimeCard on Media {
        id
        coverImage{
            large
        }
        title{
            romaji
            english
        }
        description(asHtml:false)
        status
        format
    }
`;


export default function AnimeCard({ id, coverImage, title, status, format, removeAction }: AnimeCardFragment & { removeAction?: boolean }) {
    if (!id) return;
    return <article className="group hover:scale-[1.02][] transition-transform card-width">
        <div className="bg-gradient-to-b from-primary to-secondary rounded-lg shadow-xl relative">
            <TopBadge data={status} />
            {removeAction ? <RemoveFromCalendar id={id} /> : <AddToCalendar data={{ id, coverImage, title, status, format }} />}
            <Link href={"/anime/" + id} className="hidden bg-gradient-to-b from-transparent to-secondary group-hover:flex flex-col justify-between p-2 rounded-lg absolute z-2 full">
                <InsideTopBadge data={format} status={status} />
                <InsideBadge data={title} />
            </Link>
            <img fetchPriority="low" loading="lazy" className="group-hover:mix-blend-luminosity rounded-lg card-height" width={192} height={288} src={coverImage?.large as string} alt={"image poster hd"} />
        </div>
        <Link href={"/anime/" + id}>
            <BottomSec data={title} />
        </Link>
    </article>
}

const InsideBadge = ({ data }: { data: Maybe<MediaTitle> }) => <div className="flex flex-col space-y-2 w-full">
    <h3 className="text-secondary-content inline-text-2 text-sm sm:text-lg">
        {data?.english ?? data?.userPreferred ?? data?.romaji ?? data?.native}
    </h3>
    <button className={"btn sm:btn-md btn-sm btn-primary sm:w-[70%] w-[80%]"}><ListIcon /> details</button>
</div>

const TopBadge = ({ data }: { data: Maybe<MediaStatus> }) => {
    if (data && data === "RELEASING") {
        return <span className="absolute z-2 left-0 m-3 w-2 h-2 bg-accent rounded-full animate-ping"></span>;
    }
}

const InsideTopBadge = ({ data, status }: { data: Maybe<MediaFormat>, status?: Maybe<MediaStatus> }) => {
    if (data) {
        return <div className='flex justify-between'>
            <span className="badge badge-accent">
                {data}
            </span>
            {status === "RELEASING" ?
                <span className='badge badge-error'>
                    Ongoing
                </span>
                : ''}
        </div>
    }
    return <div />
}

const BottomSec = ({ data }: { data: Maybe<MediaTitle> }) => <div
    className="tooltip tooltip-bottom w-full"
    data-tip={data?.userPreferred ?? data?.romaji ?? data?.english ?? data?.native}
>
    <h3 className="inline-text-3 font-bold text-start" >
        {data?.userPreferred ?? data?.romaji ?? data?.english ?? data?.native}
    </h3>
</div>