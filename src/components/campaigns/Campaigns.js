import React, { useContext } from 'react';
import CampaignItem from './CampaignItem';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import '../css/list-campaigns.css';

function Campaigns(props) {
    const campaignsContext = useContext(CampaignsContext);
    const campaigns = campaignsContext.campaigns;

    const campaignsJsx = campaigns.map(campaign => (
        <div key={campaign.id} className='col-md-4 col-sm-6 col-12'>
            <CampaignItem campaign={campaign} />
        </div>
    ));

    return (
        <section className='list-campaigns'>
            <div className="row clearfix">
                {campaignsJsx}
            </div>
        </section>

    );
}

export default Campaigns;
