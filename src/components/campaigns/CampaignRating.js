import React from 'react';
import './campaign2.css';
import RatingStars from '../common/RatingStars';
import { getDateFormatDD_MM_YYYY } from '../../utils/commonUtils';

const CampaignRating = (props) => {
    const { id, point, content, updatedAt, User } = props.rating;

    const updatedAtFormated = getDateFormatDD_MM_YYYY(updatedAt);

    const avatar = User && User.avatar ? User.avatar : '/images/default-data-images/default-user-avatar.png';

    return (
        <div className='campaign-comment campaign-rating'>
            <div className='grid-row'>
                <img src={avatar} className='grid-col' style={{width: '65px', height: '65px'}} />
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

export default CampaignRating;
