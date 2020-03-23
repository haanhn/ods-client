import React, { useContext } from 'react';
import CampaignRating from './CampaignRating';
import Alert from '../common/Alert';
import CampaignsContext from '../../context/campaigns/campaignsContext';

const CampaignRatings = () => {
    const campaignsContext = useContext(CampaignsContext);
    const ratings = campaignsContext.campaignRatings;

    let ratingsJsx = [];

    if (ratings && ratings.length > 0) {
        ratingsJsx = ratings.map((rating) => {
            return <CampaignRating rating={rating} />
        });
    } else {
        ratingsJsx = <Alert alert={alertEmpty} />
    }

    return (
        <div className='campaign-ratings'>
            { ratingsJsx }
        </div>
    )
}

const alertEmpty = { type: 'secondary', msg: 'Hiện tại chưa có đánh giá nào' };

export default CampaignRatings
