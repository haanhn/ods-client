import React from 'react';
import CampaignRatings from './CampaignRatings';
import FormCreateRating from './campaign-detail/campaign-ratings/FormCreateRating';
import RatingStatisticsContainer from '../common/rating-statistics/RatingStatisticsContainer';

const CampaignTabRatings = (props) => {

    const { slug, ratingPoint, ratingStats, allowedRating, myRating } = props;
    
    return (
        <div className='campaign-tab-ratings'>
            <RatingStatisticsContainer point={ratingPoint} ratingStats={ratingStats} />

            {allowedRating ?
                <FormCreateRating slug={slug} myRating={myRating} ratingStats={ratingStats} />
                : null
            }
            <CampaignRatings />
        </div>
    );
}

export default CampaignTabRatings;