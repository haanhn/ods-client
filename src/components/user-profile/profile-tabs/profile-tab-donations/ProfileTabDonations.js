import React from 'react';
import DonationOfProfile from './DonationOfProfile';

const ProfileTabDonations = () => {
    return (
        <div>
            <div className='row clearfix'>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <DonationOfProfile />
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <DonationOfProfile />
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <DonationOfProfile />
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <DonationOfProfile />
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>

                    <DonationOfProfile />
                </div>
            </div>
        
        </div>
    );
}

export default ProfileTabDonations;