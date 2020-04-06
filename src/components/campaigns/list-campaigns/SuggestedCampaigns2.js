import React, { useContext } from 'react';
import SuggestedCampaignItem from './SuggestedCampaignItem';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import './list-suggests.css';

const SuggestedCampaigns2 = () => {

    const campaignsContext = useContext(CampaignsContext);
    const campaigns = campaignsContext.suggestedCampaigns2;
    const campaignsJsx = campaigns.map(campaign => (
        <div key={campaign.id} className='col-md-3 col-sm-4 col-12'>
            <SuggestedCampaignItem campaign={campaign} />
        </div>
    ));
    const jsx = (
        <div className="list-suggests">
            <h4>Có thể bạn quan tâm</h4>
            <div className="row clearfix">
                {campaignsJsx}
            </div>
        </div>
    )
    return campaigns && campaigns.length > 0 ? jsx : null;
}

export default SuggestedCampaigns2;