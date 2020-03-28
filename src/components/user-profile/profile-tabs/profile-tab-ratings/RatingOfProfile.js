import React from 'react';
import RatingStars from '../../../common/RatingStars';

const RatingOfProfile = () => {
    const User = {};
    const point = 3;
    const updatedAtFormated = '16/03/2020';
    const content = 'ahihaihihihihih sfhisfho fdishfd';


    return (
        <div className='campaign-comment campaign-rating'>
            <div className='grid-row'>
                <img src='/images/default-data-images/default-user-avatar.png' className='grid-col' />
                <div className='grid-col'>
                    <h6> {User && User.fullname ? User.fullname : 'Tên donor'} </h6>
                    <span style={{fontSize: '90%'}}>
                        {updatedAtFormated}
                    </span>
                    <div>
                        <RatingStars points={point} />
                    </div>
                </div>

            </div>
            <div>
                {content}
            </div>
        </div>
    
    );
}

export default RatingOfProfile;