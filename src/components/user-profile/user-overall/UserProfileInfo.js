import React, { useContext } from 'react';
import UserProfileContext from '../../../context/user-profile/UserProfileContext';

const UserProfileInfo = () => {
    const userProfileContext = useContext(UserProfileContext);
    const profile = userProfileContext.profile;
    const fullname = profile && profile.fullname ? profile.fullname : '';
    const avatar = profile && profile.avatar ? profile.avatar : '/images/default-data-images/default-user-avatar.png';
    const email = profile && profile.email ? profile.email : '';


    return (
        <div className='profile-info'>
            <div className='profile-avatar-box' style={{
                backgroundImage: `url('${avatar}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}></div>
            <h5> {fullname} </h5>
            <div className='other-info' >Email: {email}</div>
        </div>
    );
}

export default UserProfileInfo;