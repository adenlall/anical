import gql from 'graphql-tag';;
import { LoveIcon } from "../AnimeDetails/Stats";
import { formated } from "@/utils/helpers";
import { AnimeCharacterEntryFragment } from '@/lib/types/anilist';

export const ANIME_CHARACTER_ENTRY = gql`
fragment AnimeCharacterEntry on CharacterEdge {
    node{
        name {
            first
        }
        image {
           medium
        }
        favourites
    }
    voiceActors(language:JAPANESE) {
        name {
            native
        }
        image {
            medium
        }
    }
}
`;
export default function Entry({ data }: { data: AnimeCharacterEntryFragment }) {
    if (!data.node || !data.voiceActors) {
        return
    }
    return <div dir="ltr" className="w-auto group flex p-1 h-auto rounded-lg primary">
        <div className="w-20 relative primary">
            <img alt={data.node.name?.first + " photo"} src={data.node.image?.medium as string} className='w-20 h-28 object-cover rounded-l-lg rounded-r-lg group-hover:rounded-r-none' />
            <Favourites data={data.node.favourites} />
            <h3 className="inline-1 text-center">{data.node.name?.first}</h3>
        </div>
        <div className="w-20 -ml-20 group-hover:ml-0 transition-all duration-500">
            <img alt={data.voiceActors[0]?.name?.native + " photo"} src={data.voiceActors[0]?.image?.medium as string} className='w-20 h-28 object-cover bg-base-100 rounded-r-lg' />
            <h3 className="inline-1 text-center hidden group-hover:[display:-webkit-box]">{data.voiceActors[0]?.name?.native}</h3>
        </div>
    </div>
}

const Favourites = ({ data }: { data: number | undefined | null }) => {
    return data ?
        <div className="invisible group-hover:visible absolute rounded-l-lg w-20 h-28 text-base-content bg-base-100/60 top-0 flex-center-col">
            <span className="flex gap-1 font-bold">
                <LoveIcon className={"w-6 h-6 stroke-base-content fill-base-contestroke-base-content"} /> {formated(data)}
            </span>
        </div> : <></>;
}