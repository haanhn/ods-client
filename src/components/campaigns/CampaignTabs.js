import React, { useContext, useState } from 'react';
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

    //State for set tab active css
    const [activeBasicInfo, setActiveBasicInfo] = useState(false);
    const [activePosts, setActivePosts] = useState(false);
    const [activeComments, setActiveComments] = useState(false);
    const [activeDonations, setActiveDonations] = useState(false);
    const [activeReviews, setActiveReviews] = useState(false);
    const [activeExpenses, setActiveExpenses] = useState(false);

    const setActive = (event) => {
        const target = event.target;
        if (!target) {
            return;
        }
        const id = target.id;
        setActiveBasicInfo(false);
        setActivePosts(false);
        setActiveComments(false);
        setActiveDonations(false);
        setActiveReviews(false);
        setActiveExpenses(false);
        switch (id) {
            case 'linkTabInfo':
                setActiveBasicInfo(true);
                break;
            case 'linkTabPosts':
                setActivePosts(true);
                break;
            case 'linkTabComments':
                setActiveComments(true);
                break;
            case 'linkTabDonations':
                setActiveDonations(true);
                break;
            case 'linkTabReviews':
                setActiveReviews(true);
                break;
            case 'linkTabExpenses':
                setActiveExpenses(true);
                break;
        }
    }

    return (
        <nav className="navbar navbar-expand-sm">
            <ul className="navbar-nav">
                <li className={`nav-item  ${activeBasicInfo ? 'active' : null}`}>
                    <Link className='nav-link' onClick={setActive}
                        to={routeCampaign} id='linkTabInfo'>Thông tin</Link>
                </li>
                <li className={`nav-item ${activePosts ? 'active' : null}`}>
                    <Link className='nav-link' onClick={setActive}
                        to={routePosts} id='linkTabPosts'>Cập nhật</Link>
                </li>
                <li className={`nav-item ${activeComments ? 'active' : null}`}>
                    <Link className='nav-link' onClick={setActive}
                        to={routeComments} id='linkTabComments'>Bình luận</Link>
                </li>
                <li className={`nav-item ${activeDonations ? 'active' : null}`}>
                    <Link className='nav-link' onClick={setActive}
                        to={routeDonations} id='linkTabDonations'>Quyên góp</Link>
                </li>
                <li className={`nav-item ${activeReviews ? 'active' : null}`}>
                    <Link className='nav-link' onClick={setActive}
                        to={routeRatings} id='linkTabReviews'>Đánh giá</Link>
                </li>
                {hasExpenses ? (
                    <li className={`nav-item ${activeExpenses ? 'active' : null}`}>
                        <Link className='nav-link' onClick={setActive}
                            to={routeExpenses} id='linkTabExpenses'>Chi phí</Link>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
}

export default CampaignTabs;
