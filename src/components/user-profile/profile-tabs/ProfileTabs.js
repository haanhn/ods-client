import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../odsApi';

const ProfileTabs = () => {

    const userCode = 12345637;
    const routeCampaigns = routes.getUserProfile(userCode);
    const routeDonations = routes.getUserProfileDonations(userCode);
    const routeRatings = routes.getUserProfileRatings(userCode);

    return (
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link className="nav-link" to={routeCampaigns}>Thông tin</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to={routeDonations}>Thông tin</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to={routeRatings}>Thông tin</Link>
                </li>
            </ul>
        </div>
    );
}

export default ProfileTabs;