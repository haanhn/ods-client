import React, { useContext } from 'react';
import SuggestedCampaignItem from './SuggestedCampaignItem';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import './list-suggests.css';

const SuggestedCampaigns1 = () => {

    const campaignsContext = useContext(CampaignsContext);
    const campaigns = campaignsContext.suggestedCampaigns1;
    const campaignsJsx = campaigns.map(campaign => (
        <div key={campaign.id} className='col-md-3 col-sm-4 col-12'>
            <SuggestedCampaignItem campaign={campaign} />
        </div>
    ));
    const jsx = (
        <div className="list-suggests">
            <h4>Các chiến dịch khác</h4>
            <div className="row clearfix">
                {campaignsJsx}
            </div>
        </div>
    )
    return campaigns && campaigns.length > 0 ? jsx : null;
}

export default SuggestedCampaigns1;