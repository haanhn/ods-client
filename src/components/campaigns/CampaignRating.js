import React from 'react';
import './campaign2.css';
import RatingStars from '../common/RatingStars';

const CampaignRating = () => {
    return (
        <div className='campaign-comment campaign-rating'>
            <div className='grid-row'>
                <img src='/images/default-data-images/default-user-avatar.png' className='grid-col' />
                <div className='grid-col'>
                    <h5>Host name</h5>
                    31/01/2020
                    <div>
                        <RatingStars />
                    </div>
                </div>

            </div>
            <div className='comment-content'>
                commenting commenting commenting commenting commenting commenting commenting
                commenting commenting
            </div>
        </div>
    );
}

export default CampaignRating;
