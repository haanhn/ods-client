import React from 'react';
import '../../../common/campaign.css';

const FormRatingStars = (props) => {
    const maxStars = 5;
    const initPoint = props.initPoint;
    const { init, setInit, point, setPoint, maxIndexStarChecked, setMaxIndexStarChecked } = props;

    if (init) {
        setMaxIndexStarChecked(initPoint - 1);
        setPoint(initPoint);
    }
    const chooseStars = (event) => {
        setInit(false);
        const hoverStarIndex = getStarIndex(event.target.className);
        setPoint(hoverStarIndex + 1);
        console.log('point choose ' + (hoverStarIndex + 1))
    }

    const onMouseOverStar = (event) => {
        setInit(false);
        const hoverStarIndex = getStarIndex(event.target.className);
        setMaxIndexStarChecked(hoverStarIndex);
    }

    const onMouseOutStars = () => {
        setMaxIndexStarChecked(point - 1);
    }

    let stars = [];
    for (let i = 0; i < maxStars; i++) {
        stars.push(<RatingStar starIndex={i} starChecked={i <= maxIndexStarChecked} 
            chooseStars={chooseStars} onMouseOver={onMouseOverStar} />)

    }

    return (
        <div className='form-rating-stars' onMouseOut={onMouseOutStars}>
            {stars}
        </div>
    );
}

const RatingStar = ({ starIndex, starChecked, chooseStars, onMouseOver }) => {
    const starClass = 'starIndex-' + starIndex;
    return (
        starChecked ?
            (<i className={`fas fa-star star-checked ${starClass}`} 
                onClick={chooseStars} onMouseOver={onMouseOver}></i>)
            : (<i className={`fas fa-star ${starClass}`} 
                onClick={chooseStars} onMouseOver={onMouseOver}></i>)
    );
}

const getStarIndex = (classStr) => {
    const classess = classStr.split(' ');
    let i = 0;
    for (i = 0; i < classess.length; i++) {
        const clazz = classess[i];
        if (clazz.indexOf('starIndex-') >= 0) {
            const splits = clazz.split('-');
            // console.log(splits);
            return parseInt(splits[1]);
        }
    }
}
export default FormRatingStars;
