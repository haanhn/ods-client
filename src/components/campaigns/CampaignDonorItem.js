import React from 'react';
import './campaign2.css';

function CampaignDonorItem() {
    return (
        <div className='donor-item grid-row col-lg-4 col-md-6 col-sm-12'>
            <div className='grid-col grid-col-1-of-4'>
                <img src='/images/icons/default-user-avatar.png' className='avatar' />
            </div>
            <div className='grid-col'>
                <h5><b>Host name</b></h5>
                <span>105,000 vnd</span>
            </div>

        </div>
    );
}

export default CampaignDonorItem;