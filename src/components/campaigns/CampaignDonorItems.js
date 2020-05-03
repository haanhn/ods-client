import React, { useContext, useState } from 'react';
import CampaignDonorItem from './CampaignDonorItem';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import Alert from '../common/Alert';
import AboutDonationModal from './AboutDonationModal';

const CampaignDonorItems = () => {
    const campaignsContext = useContext(CampaignsContext);
    const donations = campaignsContext.campaignDonations;

    const [currentDonation, setCurrentDonation] = useState(null);
    const [showingModal, setShowingModal] = useState(false);

    const viewDonation = (donation) => {
        setCurrentDonation(donation);
        setShowingModal(true);
    }

    let donationsJsx = null;
    if (donations && donations.length > 0) {
        donationsJsx = donations.map(donation => <CampaignDonorItem donation={donation} viewDonation={viewDonation} />);
        return (
            <div className='row clearfix donor-items'>
                {donationsJsx}
                <AboutDonationModal showingModal={showingModal} setShowingModal={setShowingModal}
                    donation={currentDonation} />
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