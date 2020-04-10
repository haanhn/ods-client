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

    const emptyJsx = <div>Không tìm thấy chiến dịch nào</div>;

    return (
        <section className='list-campaigns'>
            <div className="row clearfix">
                {campaigns && campaigns.length > 0 ? campaignsJsx : emptyJsx}
            </div>
        </section>

    );
}

export default Campaigns;
