import React, { Fragment } from 'react';
import './campaign.css';

const RatingStars = () => {
    const maxStars = 5;
    const points = 2.5;
    const pointsRounded = Math.floor(points);
    const maxIndexStarChecked = pointsRounded - 1;

    let stars = [];
    for (let i = 0; i < maxStars; i++) {
        stars.push(<RatingStar starChecked={i <= maxIndexStarChecked} />)

    }

    return (
        <Fragment>
            {stars}
        </Fragment>
    );
}

const RatingStar = ({ starChecked }) => {
    return (
        starChecked ?
            (<i className='fas fa-star star-checked'></i>)
            : (<i className='fas fa-star'></i>)
    );
}

export default RatingStars;
