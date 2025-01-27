import { memo } from 'react';
import Loading from '@/components/Base/Loading';
import { Server } from '@/app/[lang]/anime/[id]/@player/episode/[ep]/types';
import ServerItem from './ServerItem';

interface ServerButtonsProps {
    servers: Server[];
    onServerSelect: (link: string) => void;
    loading?: boolean;
}

const ServerButtons = memo(({ servers, onServerSelect, loading }: ServerButtonsProps) => {
    if (loading) {
        return <div className="w-full h-full rounded-lg bg-base-100 skeleton skeleton-b1-b2" />;
    }

    return (
        <div className="w-full h-full grid grid-rows-min gap-2 grid-cols-1">
            {servers.map(srv => (
                <ServerItem
                    key={srv.link}
                    onClick={() => onServerSelect(srv.link)}
                >
                    {srv.title}
                </ServerItem>
            ))}
        </div>
    );
});

ServerButtons.displayName = 'ServerButtons';

export default ServerButtons;