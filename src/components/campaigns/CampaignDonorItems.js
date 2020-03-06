import React, { useContext } from 'react';
import CampaignDonorItem from './CampaignDonorItem';
import CampaignsContext from '../../context/campaigns/campaignsContext';

const CampaignDonorItems = () => {
    const campaignsContext = useContext(CampaignsContext);
    const donations = campaignsContext.campaignDonations;

    let donationsJsx = null;
    if (donations && donations.length > 0) {
        donationsJsx = donations.map(donation => <CampaignDonorItem donation={donation} /> );
    } else {
        donationsJsx = <p>Chưa có ai quyên góp cho chiến dịch này. Hãy là người quyên góp đầu tiên.</p>
    }

    return (
        <div className='row clearfix donor-items'> 
            { donationsJsx }
            {/* <CampaignDonorItem/>
            <CampaignDonorItem/>
            <CampaignDonorItem/>
            <CampaignDonorItem/>
            <CampaignDonorItem/>
            <CampaignDonorItem/>
            <CampaignDonorItem/> */}
        </div>
    );
};

export default CampaignDonorItems;