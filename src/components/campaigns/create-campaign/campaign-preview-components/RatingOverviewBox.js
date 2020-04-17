import React from 'react';
import RatingStars from '../../../common/RatingStars';

const RatingOverviewBox = () => {
    const ratingStats = {
        campaignRatingPoint: 4.3,
        totalReviews: 35,
        count1: 0,
        count2: 2,
        count3: 10,
        count4: 8,
        count5: 15
    };
    const campaignRatingPoint = 4.3;
    const point = 4.3;

    // const { boxPointGrid, boxStarsGrid } = props;
    let jsx = null;
    if (ratingStats && ratingStats.totalReviews) {
        if (ratingStats.totalReviews > 0) {
            const reviewsAmount = ratingStats.totalReviews;
            jsx = (
                <aside className="sidebar col-lg-12 col-md-6 col-sm-6">
                    <div className='rating-overview'>
                        <div className='row clearfix'>
                            <div className='rating-overview-point col'>
                                <span>{point}</span>
                            </div>
                            <div className='col-8' >
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

export default RatingOverviewBox;