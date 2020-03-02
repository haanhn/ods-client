import React from 'react';
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
import { routes } from '../../odsApi';
import CampaignTabRatings from '../campaigns/CampaignTabRatings';


const CreateCampaignPreview = (props) => {
    const { id,
        campaignTitle, goal,
        endDate, campaignRatingPoint,
        campaignShortDescription, description,
        image, category,
        campaignRegion, address
    } = props.campaign;


    return (
        // <div className="sidebar-page-container">
        <div>
            <div className="auto-container">
                <h2 style={{ textAlign: 'center', padding: '50px 0 20px', borderBottom: '2px gray solid' }}>{campaignTitle}</h2>
                <div className="row clearfix" style={{ padding: '30px 0 50px' }}>

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
                    <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
                        <aside className="sidebar">
                            <RatingOverviewBox />
                        </aside>
                        <aside className="sidebar">
                            <CampaignProgressBar />
                            <CampaignStatistic />
                            <ButtonDonate />
                            <ButtonSubscribeCampaign />
                        </aside>
                        <aside className="sidebar">
                            <CampaignHostInfo />
                        </aside>
                    </div>
                    <div style={{ width: '100%' }}>
                        <CampaignTabs />
                        <Switch>
                            <Route exact path={`${routes.CAMPAIGN_DETAIL}`}> <CampaignTabMoreInfo /> </Route>
                            <Route exact path={`${routes.CAMPAIGN_DETAIL}/updates`}> <CampaignTabUpdates /> </Route>
                            <Route exact path={`${routes.CAMPAIGN_DETAIL}/comments`}> <CampaignTabComments /> </Route>
                            <Route exact path={`${routes.CAMPAIGN_DETAIL}/donations`}> <CampaignTabDonations /> </Route>
                            <Route exact path={`${routes.CAMPAIGN_DETAIL}/ratings`} component={CampaignTabRatings} />
                        </Switch>
                    </div>

                </div>
            </div>

        </div>
        // </div>
        // {/* <!-- End Sidebar Page Container --> */}

    );

}

export default CreateCampaignPreview;