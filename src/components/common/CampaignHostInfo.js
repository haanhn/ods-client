import React from 'react';
import { routes } from '../../odsApi';
import { Link } from 'react-router-dom';

const CampaignHostInfo = (props) => {
    const host = props.host;

    const routeHostProfile = routes.getUserProfile(host ?  host.id : '');

    return (
        <div className='container host-info'>
            <div className='row clearfix'>
                <div className='col col-3 avatar child'>
                    <img src='/images/default-data-images/default-user-avatar.png' className='' />
                </div>
                <div className='col col-9 child host-name'>
                    <h6>
                        <Link to={routeHostProfile} style={{ color: 'inherit' }}>
                            {host ? host.fullname : ''}
                        </Link>
                    </h6>
                    <i class="fas fa-map-marker-alt icon-color-one"></i> {host ? host.region : ''}

                </div>
            </div>
        </div>
    );
}

export default CampaignHostInfo;
