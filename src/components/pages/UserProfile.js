import React from 'react';
import ProfileContainer from '../user-profile/ProfileContainer';
import '../css/user-profile.css';

const UserProfile = () => {
    return (
        <div className='user-profile'>
            <ProfileContainer />
        </div>
    );
}

export default UserProfile;