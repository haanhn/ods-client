import React from 'react';

const UserProfileInfo = () => {

    return (
        <div className='profile-info'>
            <div className='profile-avatar-box'>
                <img src={'/images/default-data-images/default-user-avatar.png'} />
                <h5>Tên User</h5>
            </div>
            <div className='other-info' >Email: abcxyz@gmail.com</div>
        </div>
    );
}

export default UserProfileInfo;