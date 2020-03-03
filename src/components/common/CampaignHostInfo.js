import React from 'react';

const CampaignHostInfo = (props) => {
    const host = props.host;

    return (
        <div className='container host-info'>
            <div className='row clearfix'>
                <div className='col col-3 avatar child'>
                    <img src='/images/icons/default-user-avatar.png' className='' />
                </div>
                <div className='col col-9 child host-name'>
                    <h6>{host ? host.fullname : ''}</h6>
                    <i class="fas fa-map-marker-alt icon-color-one"></i> {host ? host.region : ''}

                </div>
            </div>
        </div>
    );
}

export default CampaignHostInfo;
