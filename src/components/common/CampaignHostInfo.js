import React from 'react';

const CampaignHostInfo = () => {
    return (
        <div className='auto-container host-info'>
            <div className='row clearfix'>
                <img src='images/icons/default-user-avatar.png' className='col avatar' />
                <div className='col-9'>
                    <h5>Host name</h5>
                    <i class="fas fa-map-marker-alt icon-color-one"></i> Location name
                </div>
            </div>
        </div>
    );
}

export default CampaignHostInfo;
