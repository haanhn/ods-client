import React from 'react';
import RatingStars from './RatingStars';

const RatingOverviewBox = (props) => {
    const { boxPointGrid, boxStarsGrid, campaignRatingPoint, ratingStats } = props;
    const point = (typeof campaignRatingPoint === 'number') ? campaignRatingPoint.toFixed(1) : campaignRatingPoint;
    let jsx = null;
    if (ratingStats && ratingStats.totalReviews) {
        if (ratingStats.totalReviews > 0) {
            const reviewsAmount = ratingStats.totalReviews;
            jsx = (
                <aside className="sidebar col-lg-12 col-md-6 col-sm-6">
                    <div className='rating-overview'>
                        <div className='row clearfix'>
                            <div className={`rating-overview-point ${boxPointGrid}`}>
                                <span>{point}</span>
                            </div>
                            <div className={boxStarsGrid}>
                                <div className='rating-stars'>
                                    <RatingStars points={campaignRatingPoint} />
                                </div>
                                <div className='rating-users'>
                                    ({reviewsAmount} lượt đánh giá)
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            );
        }
    }

    return jsx;
}

RatingOverviewBox.defaultProps = {
    boxPointGrid: 'col',
    boxStarsGrid: 'col-8',
};

export default RatingOverviewBox;
