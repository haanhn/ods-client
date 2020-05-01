import React, { useEffect, useContext, useState } from 'react';
import CampaignProgressBar from '../common/CampaignProgressBar';
import CampaignStatistic from '../common/CampaignStatistic';
import ButtonSubscribeCampaign from '../common/ButtonSubscribeCampaign';
import ButtonDonate from '../common/ButtonDonate';
import CampaignHostInfo from '../common/CampaignHostInfo';
import CampaignBasicInfo from '../common/CampaignBasicInfo';
import RatingOverviewBox from '../common/RatingOverviewBox';
import CampaignTabs from '../campaigns/CampaignTabs';
import CampaignTabMoreInfo from '../campaigns/CampaignTabMoreInfo';
import CampaignTabUpdates from '../campaigns/CampaignTabUpdates';
import CampaignTabComments from '../campaigns/CampaignTabComments';
import CampaignTabDonations from '../campaigns/CampaignTabDonations';
import { Switch, Route } from 'react-router-dom';
import { odsBase, routes, localStoreKeys } from '../../odsApi';
import CampaignTabRatings from '../campaigns/CampaignTabRatings';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import NotFound from './NotFound';
import '../css/common.css';
// import '../css/social-css.css';
import axios from 'axios';
import Spinner from '../common/Spinner';
import CampaignTabExpenses from '../campaigns/campaign-detail/CampaignTabExpenses';
import { FacebookShareButton } from 'react-share';
import SuggestedCampaigns1 from '../campaigns/list-campaigns/SuggestedCampaigns1';
import SuggestedCampaigns2 from '../campaigns/list-campaigns/SuggestedCampaigns2';

const Campaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);

    const { slug } = props.match.params;
    const { id, campaignTitle,
        raised, campaignGoal, countDonations,
        campaignEndDate, campaignRatingPoint,
        campaignShortDescription, campaignDescription,
        campaignStatus,
        Category
    } = campaignsContext.viewingCampaign;
    const campaign = campaignsContext.viewingCampaign;

    const getHost = () => {
        if (campaign) {
            if (campaign.Users && campaign.Users.length > 0) {
                return campaign.Users[0];
            }
        }
        return {};
    }

    const { loading } = campaignsContext;

    // const [ratingStats, setRatingStats] = useState({});
    const [myRating, setMyRating] = useState({});
    const [allowedRating, setAllowedRating] = useState(false);
    const [owning, setOwning] = useState(false);
    const [following, setFollowing] = useState(false);
    const [resStatus, setResStatus] = useState(200);

    useEffect(() => {
        fetchCampaign();

        // return () => {
        //     console.log('Page Campaign unmounting...');
        //     campaignsContext.setCampaignToEmpty();
        // };
    }, []);

    const fetchCampaign = async () => {
        try {
            const returnedCampaign = await campaignsContext.getCampaignBySlug(slug);
            console.log(`get campaign done`);
            //After get campaign success, do not need to await to get comments, donations 
            // console.log(`start get comments`);
            campaignsContext.getCampaignPosts(slug);
            campaignsContext.getCampaignComments(slug);
            // console.log(`get comments`);
            campaignsContext.getCampaignDonations(slug);
            // console.log(`get donations`);
            campaignsContext.getCampaignRatings(slug);
            campaignsContext.getCampaignExpenses(slug);
            // campaignsContext.getSuggestedCampaigns1(slug);
            const userId = localStorage.getItem(localStoreKeys.userId);
            if (userId) {
                campaignsContext.getSuggestedCampaigns2(userId, returnedCampaign.id);
            }
            // const checkFollow = await campaignsContext.checkFollowCampaign(campaignsContext.checkFollowCampaign);
            const checkOwner = checkCampaignOwner(returnedCampaign);
            if (checkOwner === true) {
                setOwning(true);
            }
            const checkFollow = await checkFollowCampaign(
                campaignsContext.checkFollowCampaign,
                returnedCampaign.id
            );
            if (checkFollow === 1) {
                setFollowing(true);
            }
            campaignsContext.getCampaignRatingsStats(slug);
            const myCampRating = campaignsContext.myCampaignRating;
            const allowed = await getCampaignRatingAllow(slug);
            // setRatingStats(stats);
            setMyRating(myCampRating);
            setAllowedRating(allowed);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                const status = error.response.status;
                if (status === 404) {
                    setResStatus(status);
                }
            }
        }
    }

    const routeComments = routes.getRouteCampaignComments(slug);
    const routeDonations = routes.getRouteCampaignDetailDonations(slug);
    const routeRatings = routes.getRouteCampaignRatings(slug);
    const routeExpenses = routes.getRouteCampaignExpenses(slug);

    if (resStatus === 404) {
        return <NotFound />;
    }

    if (loading) {
        return <Spinner />;
    } else {
        return (
            // <div className="sidebar-page-container">
            // <div>
            <div className="auto-container campaign-detail">
                <h2 style={{ textAlign: 'center', padding: '50px 0 20px', borderBottom: '2px gray solid' }}>
                    {campaignTitle}
                </h2>
                <div className="row clearfix" style={{ padding: '30px 0 10px' }}>
                    {/* style={{ padding: '30px 0 50px' }} */}
                    {/* <!--Content Side / Blog Sidebar--> */}
                    <div className="content-side col-lg-8 col-md-12 col-sm-12">
                        {/* <!--Cause Details--> */}
                        <div className="cause-details">
                            <div className="inner-box">
                                <CampaignBasicInfo campaign={campaign} />
                            </div>
                        </div>

                    </div>

                    {/* <!--Sidebar Side--> */}
                    <div className="sidebar-side col-lg-4 col-md-12 col-sm-12" >
                        <div className='rating-host-container row'>
                            <RatingOverviewBox 
                            // campaignRatingPoint={campaignRatingPoint} 
                            // ratingStats={ratingStats} 
                            />
                            <aside className="sidebar col-lg-12 col-md-6 col-sm-6">
                                <CampaignHostInfo host={getHost()} />
                            </aside>
                        </div>
                        <aside className="sidebar col-lg-12 col-md-12 col-sm-12">
                            <CampaignProgressBar raised={raised} goal={campaignGoal}
                                campaignEndDate={campaignEndDate} campaignStatus={campaignStatus} />
                            <CampaignStatistic countDonations={countDonations} />
                            {campaignStatus === 'public' ? (
                                <ButtonDonate slug={slug} />
                            ) : null}
                            {!owning ? (
                                <ButtonSubscribeCampaign campaignId={id}
                                    following={following} setFollowing={setFollowing} />
                            ) : null}

                            {/* <div className="Demo__some-network"> */}
                            <div className="box-btn-fb">
                                <FacebookShareButton
                                    // url={'https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx'}
                                    url={window.location.href}
                                    quote={`Ủng hộ chiến dịch: ${campaignTitle}`}
                                >
                                    {/* <FacebookIcon size={22} round={true} /> */}
                                    <div className='btn-share-fb'>
                                        <i class="fab fa-facebook-f" style={{marginRight: '25px', fontSize: '110%'}}></i>
                                        Chia sẻ lên Facebook
                                    </div>
                                </FacebookShareButton>
                            </div>

                        </aside>
                    </div>
                </div>
                {/* End of section: basic info */}

                <div style={{ width: '100%' }}>
                    <CampaignTabs slug={slug} />
                    <Switch>
                        <Route exact path={`${routes.CAMPAIGN_DETAIL}`}>
                            <CampaignTabMoreInfo description={campaign.campaignDescription} />
                        </Route>
                        <Route exact path={`${routes.CAMPAIGN_DETAIL}/updates`}> <CampaignTabUpdates /> </Route>
                        <Route exact path={routeComments}> <CampaignTabComments /> </Route>
                        <Route exact path={routeDonations}> <CampaignTabDonations /> </Route>
                        <Route exact path={routeRatings}>
                            <CampaignTabRatings slug={slug}
                                // ratingPoint={campaignRatingPoint}
                                // ratingStats={ratingStats}
                                allowedRating={allowedRating} myRating={myRating} />
                        </Route>
                        <Route exact path={routeExpenses} component={CampaignTabExpenses} />
                    </Switch>
                </div>

                <SuggestedCampaigns1 />
                <SuggestedCampaigns2 />
            </div>

        );
    }
}

export default Campaign;

const getCampaignRatingAllow = async (slug) => {
    const route = '/api/campaignReviews/check-allow/' + slug;
    const token = localStorage.getItem(localStoreKeys.token);
    if (!token) {
        return false;
    }
    try {
        const res = await axios.post(`${odsBase}${route}`, {
            token: token
        });
        const result = res.data.result;
        console.log('result ' + result);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(`Error when get campaign rating allow: ${error}`);
        return false; //fail
    }
};

const checkFollowCampaign = async (checkFollowFn, campaignId) => {
    const token = localStorage.getItem(localStoreKeys.token);
    if (!token) {
        return -1;
    }
    try {
        const result = await checkFollowFn(campaignId);
        return result;
    } catch (error) {
        console.error(`Error when check follow campaign: ${error}`);
        return -2; //fail
    }
}

const checkCampaignOwner = (campaign) => {
    const userId = localStorage.getItem(localStoreKeys.userId);
    if (userId) {
        if (campaign && campaign.Users) {
            if (campaign.Users.length > 0) {
                const owner = campaign.Users[0];
                if (owner.id === userId) {
                    console.log('owner of this campaign')
                    return true;
                }
            }
        }
    }
    return false;
}

/* <div className="Demo__some-network">
    <FacebookShareButton
        url={'https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx'}
        quote={'title'}
        className="Demo__some-network__share-button"
    >
        {/* <FacebookIcon size={52} round={false} /> */
//                     </FacebookShareButton>

//     <div>
//         <FacebookShareCount url={'https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx'} className="Demo__some-network__share-count">
//             {count => <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{count}</span>}
//         </FacebookShareCount>
//     </div>
// </div> */}