import React, { useContext } from 'react';
import UserProfileContext from '../../../../context/user-profile/UserProfileContext';
import CampaignOfProfile from './CampaignOfProfile';

const ListCampaignsOfProfile = () => {
    const userProfileContext = useContext(UserProfileContext);
    const campaigns = userProfileContext.profileCampaigns;

    let campaignsJsx = [];

    if (campaigns && campaigns.length > 0) {
        campaignsJsx = campaigns.map((campaign) => {
            return (
            <div className='col-lg-3 col-md-4 col-sm-6 col-12'>
                <CampaignOfProfile campaign={campaign} />
            </div>);
        });
    } else {
        campaignsJsx = (
            <div className='col-12'>
                Người dùng không có chiến dịch nào
            </div>
        );
    }

    return campaignsJsx;
}

export default ListCampaignsOfProfile;