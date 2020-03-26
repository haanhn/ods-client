import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';
import CampaignsContext from '../../context/campaigns/campaignsContext';

const CampaignTabs = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const listExpenses = campaignsContext.campaignExpenses;
    const hasExpenses = (listExpenses && listExpenses.length > 0) ? true : false;

    const slug = props.slug;
    const routeCampaign = routes.getRouteCampaignDetail(slug);
    const routePosts = routes.getRouteCampaignPosts(slug);
    const routeComments = routes.getRouteCampaignComments(slug);
    const routeDonations = routes.getRouteCampaignDetailDonations(slug);
    const routeRatings = routes.getRouteCampaignRatings(slug);
    const routeExpenses = routes.getRouteCampaignExpenses(slug);

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
                { hasExpenses ? (
                    <li className="nav-item">
                        <Link className="nav-link" to={routeExpenses}>Chi phí</Link>
                    </li>
                ) : null }
            </ul>
        </nav>
    );
}

export default CampaignTabs;
