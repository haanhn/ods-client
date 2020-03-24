import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

const CampaignTabs = (props) => {
    const slug = props.slug;
    const routeCampaign = routes.getRouteCampaignDetail(slug);
    const routePosts = routes.getRouteCampaignPosts(slug);
    const routeComments = routes.getRouteCampaignComments(slug);
    const routeDonations = routes.getRouteCampaignDetailDonations(slug);
    const routeRatings = routes.getRouteCampaignRatings(slug);

    return (
        <nav className="navbar navbar-expand-sm">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to={routeCampaign}>Thông tin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routePosts}>Cập nhật</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routeComments}>Bình luận</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routeDonations}>Quyên góp</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routeRatings}>Đánh giá</Link>
                </li>
            </ul>
        </nav>
    );
}

export default CampaignTabs;
