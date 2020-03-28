import React from 'react';
import CampaignOfProfile from './CampaignOfProfile';

const ProfileTabCampaigns = () => {
    return (
        <div>
            <div className='row clearfix'>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <CampaignOfProfile />
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <CampaignOfProfile />
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <CampaignOfProfile />
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <CampaignOfProfile />
                </div>

            </div>
        </div>
        
    )
}

export default ProfileTabCampaigns;