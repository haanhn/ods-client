import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../odsApi';

const ProfileTabs = (props) => {
    const userId = props.userId;
    const routeCampaigns = routes.getUserProfile(userId);
    const routeDonations = routes.getUserProfileDonations(userId);
    const routeRatings = routes.getUserProfileRatings(userId);

    return (
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link className="nav-link" to={routeCampaigns}>Chiến dịch</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to={routeDonations}>Quyên góp</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to={routeRatings}>Đánh giá</Link>
                </li>
            </ul>
        </div>
    );
}

export default ProfileTabs;