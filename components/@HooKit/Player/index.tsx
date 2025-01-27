export default function Player({ url }: { url: string | null | undefined }) {
    return <iframe
        id="vid-frame"
        className="w-full h-[30rem] bg-base-100 rounded-lg"
        src={url as string}
        allow="fullscreen"
    ></iframe>
}