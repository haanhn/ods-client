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

    const fetchProfileData = async () => {
        const result = await userProfileContext.getUserProfile(userId);
        if (result) {
            userProfileContext.getProfileStats(userId);
            userProfileContext.getProfileCampaigns(userId);
            userProfileContext.getProfileDonations(userId);
        }
    }

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div className='user-profile'>
            <ProfileContainer userId={userId} />
        </div>
    );
}

export default UserProfile;