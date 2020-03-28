import React, { useEffect, useContext } from 'react';
import UserProfileContext from '../../context/user-profile/UserProfileContext';
import ProfileContainer from '../user-profile/ProfileContainer';
import '../css/user-profile.css';
import '../css/campaign-detail-tabs.css';
import '../campaigns/campaign2.css';

const UserProfile = (props) => {
    const userProfileContext = useContext(UserProfileContext);    
    const { userId } = props.match.params;
    const profile = userProfileContext.profile;

    useEffect( async () => {
        const result = await userProfileContext.getUserProfile(userId);
        if (result) {
            userProfileContext.getProfileStats(userId);
            userProfileContext.getProfileCampaigns(userId);
            userProfileContext.getProfileDonations(userId);
        }
    }, []);

    return (
        <div className='user-profile'>
            <ProfileContainer />
        </div>
    );
}

export default UserProfile;