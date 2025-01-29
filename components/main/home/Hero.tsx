import LoginButton from "../LoginButton"

export default async () => {
    return <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
            <div className="max-w-lg">
                <h1 className="text-5xl font-bold">Watching anime just got easier!</h1>
                <p className="py-6">
                    Stay ahead of new releases and get episode reminders by Export your AniList watching list into your Google Calendar, Outlook, or iCalendar.
                </p>
                <LoginButton />
            </div>
        </div>
    </div>
}
