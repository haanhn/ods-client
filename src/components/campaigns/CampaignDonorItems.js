import React, { useContext } from 'react';
import CampaignDonorItem from './CampaignDonorItem';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import Alert from '../common/Alert';

const CampaignDonorItems = () => {
    const campaignsContext = useContext(CampaignsContext);
    const donations = campaignsContext.campaignDonations;

    let donationsJsx = null;
    if (donations && donations.length > 0) {
        donationsJsx = donations.map(donation => <CampaignDonorItem donation={donation} />);
        return (
            <div className='row clearfix donor-items'>
                {donationsJsx}
            </div>
        );
    } else {
        return <Alert alert={alertEmpty} />
    }
}

const alertEmpty = {
    type: 'secondary',
    msg: 'Chưa có ai quyên góp cho chiến dịch này. Hãy là người quyên góp đầu tiên.'
};


export default CampaignDonorItems;