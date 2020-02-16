import React from 'react';

const CampaignComment = (props) => {
    return (
        // <div className='auto-container host-info'>
        <div className='campaign-comment'>
            <div className='row clearfix comment-avatar'>
                <img src='/images/icons/default-user-avatar.png' className='col' />
                <div className='col-9'>
                    <h5>Host name</h5>
                    31/01/2020
                </div>
                
            </div>
            <div className='comment-content'>
                commenting commenting commenting commenting commenting commenting commenting
                commenting commenting 
            </div>
        </div>
        // </div>
    );
}

export default CampaignComment;