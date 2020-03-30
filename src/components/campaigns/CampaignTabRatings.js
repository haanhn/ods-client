import React, { useContext } from 'react';
import CampaignRatings from './CampaignRatings';
import FormCreateRating from './campaign-detail/campaign-ratings/FormCreateRating';
import RatingStatisticsContainer from '../common/rating-statistics/RatingStatisticsContainer';
import CampaignsContext from '../../context/campaigns/campaignsContext';

const CampaignTabRatings = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { slug, allowedRating, myRating } = props;

    const ratingStats = campaignsContext.ratingStats;
    const ratingPoint = ratingStats.campaignRatingPoint;

    
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