// components/ServerItem.tsx
interface ServerItemProps {
    children: React.ReactNode;
    [key: string]: any;
}

export default function ServerItem({ children, ...props }: ServerItemProps) {
    const getQualityBadge = (text: string) => {
        const qualities = ['fhd', 'sd', 'hd', 'bd', 'sub', 'dub', 'raw'];
        const lowerText = text.toLowerCase();
        for (const quality of qualities) {
            if (lowerText.includes(quality)) {
                return quality;
            }
        }
        return null;
    };

    const quality = getQualityBadge(children as string);

    return (
        <button className="btn btn-accent flex justify-between" {...props}>
            <span>
                {(children as string).toLowerCase().replace(quality as string, '')}
            </span>
            {quality && <span className="badge">{quality.toUpperCase()}</span>}
        </button>
    );
}