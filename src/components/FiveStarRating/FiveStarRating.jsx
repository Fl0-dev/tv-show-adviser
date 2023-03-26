import s from './FiveStarRating.module.css';
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons"

export function FiveStarRating({rating}) {
    const starList = []

    const starFillCount = Math.floor(rating)
    const starHalfCount = rating - starFillCount >= 0.5
    const starEmptyCount = 5 - starFillCount - (starHalfCount ? 1 : 0)

    for (let i = 1; i <= starFillCount; i++) {
        starList.push(<StarFill key={"star-fill" + i} />)
    }

    if (starHalfCount) {
        starList.push(<StarHalf key={"star-half"} />)
    }

    for (let i = 0; i < starEmptyCount; i++) {
        starList.push(<StarEmpty key={"star-empty" + i} />)
    }

    return (
        <div className={s.rating}>
            {starList}
        </div>
    );
}