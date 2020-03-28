import React, { useContext } from 'react';
import UserProfileContext from '../../../../context/user-profile/UserProfileContext';
import DonationOfProfile from './DonationOfProfile';

const ListDonationsOfProfile = () => {
    const userProfileContext = useContext(UserProfileContext);
    const donations = userProfileContext.profileDonations;

    let donationsJsx = [];
    if (donations && donations.length > 0) {
        donationsJsx = donations.map((donation) => (
            <div key={donation.id} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                <DonationOfProfile donation={donation} />
            </div>
        ));
    } else {
        donationsJsx = (
            <div className='col-12'>
                Người dùng không có quyên góp nào
            </div>
        );
    }
    return (
        <div className='row clearfix' >
            {donationsJsx}
        </div>
    );
}

export default ListDonationsOfProfile;