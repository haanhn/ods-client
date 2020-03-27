import React from 'react';
import UserProfileInfo from './UserProfileInfo';
import UserProfileStats from './UserProfileStats';

const ProfileOverallContainer = () => {
    return (
        <div className='profile-overal-container row clearfix'>
            <div className='col-lg-4 col-md-3 col-sm-12'style={{borderRight: '1px #ccc solid'}} >
                <UserProfileInfo />
            </div>
            <div className='col-lg-8 col-md-9 col-sm-12' >
                <UserProfileStats />
            </div>
        </div>
    );
}

export default ProfileOverallContainer;