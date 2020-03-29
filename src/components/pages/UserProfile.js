import React, { useEffect, useContext, useState } from 'react';
import UserProfileContext from '../../context/user-profile/UserProfileContext';
import ProfileContainer from '../user-profile/ProfileContainer';
import '../css/user-profile.css';
import '../css/campaign-detail-tabs.css';
import '../campaigns/campaign2.css';

const UserProfile = (props) => {
    const userProfileContext = useContext(UserProfileContext);    
    const { userId } = props.match.params;
    const profile = userProfileContext.profile;

    //State
    const [allowedRating, setAllowedRating] = useState(false);

    const fetchProfileData = async () => {
        const result = await userProfileContext.getUserProfile(userId);
        if (result) {
            userProfileContext.getProfileStats(userId);
            userProfileContext.getProfileCampaigns(userId);
            userProfileContext.getProfileDonations(userId);
            userProfileContext.getProfileRatingStats(userId);
            userProfileContext.getProfileRatings(userId);
            const allowed = await userProfileContext.checkAllowRatingUser(userId);
            setAllowedRating(allowed);
        }
    }

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div className='user-profile'>
            <ProfileContainer userId={userId} allowedRating={allowedRating} />
        </div>
    );
}

export default UserProfile;