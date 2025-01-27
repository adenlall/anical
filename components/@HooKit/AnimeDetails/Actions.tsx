import BellIcon from '~icons/gravity-ui/bell'
import BookmarkIcon from '~icons/gravity-ui/bookmark'
import ClockIcon from '~icons/gravity-ui/clock'

export default function Actions() {
    return <ul className="join w-full">
        <li className="btn join-item w-1/3 bg-base-300"><BellIcon /></li>
        <li className="btn join-item w-1/3 bg-base-300"><BookmarkIcon /></li>
        <li className="btn join-item w-1/3 bg-base-300"><ClockIcon /></li>
    </ul>
}