import React from 'react';
import { getDateFormatDD_MM_YYYY } from '../../../../utils/commonUtils';
import './campaign-post.css';

const CampaignPost = (props) => {
    const { postTitle, postContent, createdAt } = props.post ? props.post : {};
    const createdAtFormat = getDateFormatDD_MM_YYYY(createdAt);
    const postContentHtml = { __html: postContent }; 
    return (
        <div className='campaign-post'>
            <div>
                <h5 style={{fontWeight: 'bold'}}>{postTitle ? postTitle : ''}</h5>
                <span style={{fontSize: '90%', fontStyle: 'italic'}}>Đăng ngày: { createdAtFormat }</span>
            </div>
            <div dangerouslySetInnerHTML={postContentHtml} />
        </div>
    );
}

export default CampaignPost;