import React from 'react';
import ProfileContainer from '../user-profile/ProfileContainer';
import '../css/user-profile.css';
import '../css/campaign-detail-tabs.css';
import '../campaigns/campaign2.css';

const UserProfile = () => {
    return (
        <div className='user-profile'>
            <ProfileContainer />
        </div>
    );
}

export default UserProfile;