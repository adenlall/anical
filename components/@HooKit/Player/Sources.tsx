// components/SourceButtons.tsx
import { memo } from 'react';
import Loading from '@/components/Base/Loading';
import { Source } from '@/app/[lang]/anime/[id]/@player/episode/[ep]/types';

interface SourceButtonsProps {
    sources: Source[];
    onSourceSelect: (source: Source) => void;
    loading?: boolean;
    currentLang?: string;
}

const SourceButtons = memo(({
    sources,
    onSourceSelect,
    loading,
    currentLang
}: SourceButtonsProps) => {
    if (loading) {
        return <div className="rounded-lg p-2 py-8 skeleton skeleton-b1-b2" />;
    }

    return (
        <div className="bg-base-100 rounded-lg p-2 flex items-center gap-2">
            {sources.map(src => (
                <button
                    key={src.slug}
                    // style={{ background: src.bg, color: src.color }}
                    onClick={() => onSourceSelect(src)}
                    className={`btn ${currentLang === src.lang ? '' : ''} ${Math.random() < 0.33 ? 'btn-primary' : Math.random() > 0.5 ? 'btn-accent' : 'btn-secondary'}`}
                >
                    {src.name}
                </button>
            ))}
        </div>
    );
});

SourceButtons.displayName = 'SourceButtons';

export default SourceButtons;