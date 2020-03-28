import React from 'react';
import RatingStars from '../../../common/RatingStars';
import { getDateFormatDD_MM_YYYY } from '../../../../utils/commonUtils';

const RatingOfProfile = (props) => {
    const { point, content, updatedAt, reviewer } = props.rating;
    const updatedAtFormated = getDateFormatDD_MM_YYYY(updatedAt);
    const image = reviewer && reviewer.avatar ? reviewer.avatar : '/images/default-data-images/default-user-avatar.png';

    return (
        <div className='campaign-comment campaign-rating'>
            <div className='grid-row'>
                <img src={image} className='grid-col' />
                <div className='grid-col'>
                    <h6> {reviewer && reviewer.fullname ? reviewer.fullname : 'Tên người đánh giá'} </h6>
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