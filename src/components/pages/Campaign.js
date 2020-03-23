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
import '../css/campaign-detail.css';
import axios from 'axios';

const Campaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);

    const { slug } = props.match.params;
    const { id,
        campaignTitle, 
        raised, campaignGoal, countDonations,
        campaignEndDate, campaignRatingPoint,
        campaignShortDescription, campaignDescription,
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

    const [ratingStats, setRatingStats] = useState({});
    const [myRating, setMyRating] = useState({});
    const [allowedRating, setAllowedRating] = useState(false);
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
            await campaignsContext.getCampaignBySlug(slug);
            console.log(`get campaign done`);
            //After get campaign success, do not need to await to get comments, donations 
            // console.log(`start get comments`);
            campaignsContext.getCampaignComments(slug);
            // console.log(`get comments`);
            campaignsContext.getCampaignDonations(slug);
            // console.log(`get donations`);
            campaignsContext.getCampaignRatings(slug);
            const stats = await campaignsContext.getCampaignRatingsStats(slug);
            const myCampRating = campaignsContext.myCampaignRating;
            const allowed = await getCampaignRatingAllow(slug);
            setRatingStats(stats);
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

    if (resStatus === 404) {
        return <NotFound />;
    }

    if (loading) {
        return <div>
            LOADING............
        </div>;
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
                            {/* <aside className="sidebar col-lg-12 col-md-6 col-sm-6"> */}
                                <RatingOverviewBox campaignRatingPoint={campaignRatingPoint} ratingStats={ratingStats} />
                            {/* </aside> */}
                            <aside className="sidebar col-lg-12 col-md-6 col-sm-6">
                                <CampaignHostInfo host={getHost()} />
                            </aside>
                        </div>
                        <aside className="sidebar col-lg-12 col-md-12 col-sm-12">
                            <CampaignProgressBar raised={raised} goal={campaignGoal} />
                            <CampaignStatistic countDonations={countDonations} />
                            <ButtonDonate slug={slug} />
                            <ButtonSubscribeCampaign />
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
                                ratingPoint={campaignRatingPoint} 
                                ratingStats={ratingStats}
                                allowedRating={allowedRating} myRating={myRating} />
                        </Route>
                    </Switch>
                </div>
            </div>

            // </div>
            // </div>
            // {/* <!-- End Sidebar Page Container --> */}

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
        console.log('result ' +result);
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