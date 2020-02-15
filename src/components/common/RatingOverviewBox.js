import React from 'react';
import RatingStars from './RatingStars';

const RatingOverviewBox = (props) => {
    const {boxPointGrid, boxStarsGrid} = props;

    return (
        <div className='rating-overview'>
            <div className='row clearfix'>
                <div className={`rating-overview-point ${boxPointGrid}`}>
                    <span>4.5</span>
                </div>
                <div className={boxStarsGrid}>
                    <div className='rating-stars'>
                        <RatingStars/>
                    </div>
                    <div className='rating-users'>
                        (150 lượt đánh giá)
                </div>
                </div>
            </div>
        </div>
    );
}

RatingOverviewBox.defaultProps = {
    boxPointGrid: 'col',
    boxStarsGrid: 'col-8',
};

export default RatingOverviewBox;
