import React from 'react';
import CampaignPosts from './campaign-detail/campaign-posts/CampaignPosts';
import '../css/campaign-detail-tabs.css';

const CampaignTabUpdates = () => {
    return (
        <div className='campaign-tab-updates'>
            <CampaignPosts />
        </div>
    );
}

export default CampaignTabUpdates;
