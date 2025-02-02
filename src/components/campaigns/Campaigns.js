import React, { useContext } from 'react';
import CampaignItem from './CampaignItem';
import CampaignsContext from '../../context/campaigns/campaignsContext';

function Campaigns(props) {
    const campaignsContext = useContext(CampaignsContext);
    const campaigns = campaignsContext.campaigns;
    
    const campaignsJsx = campaigns.map(campaign => (
        <CampaignItem key={campaign.id} campaign={campaign} />
    ));

    const { cssClasses } = props;

    return (
        <section className={`causes-section ${cssClasses}`}>
            {/* <div class="auto-container"> */}
                
                <div className="row clearfix">
                    {campaignsJsx}
                </div>
            {/* </div> */}
        </section>

    );
}

export default Campaigns;
