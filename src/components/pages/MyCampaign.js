import React, { useEffect, useContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../../odsApi';
import MyCampaignPosts from '../host-managements/manage-campaign-post/MyCampaignPosts';
import FormCreateCampaignPost from '../host-managements/manage-campaign-post/FormCreateCampaignPost';
import mycampaignsContext from '../../context/mycampaigns/mycampaignsContext';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import '../css/host-manage-campaign.css';
import MyCampaignDonations from '../host-managements/manage-campaign-donation/MyCampaignDonations';
import HostViewDonationDetail from '../host-managements/manage-campaign-donation/HostViewDonationDetail';
import HostHeader from '../host-managements/HostHeader';
import MyCampaignExpenses from '../host-managements/manage-campaign-expense/MyCampaignExpenses';
import MyCampaignInfo from '../host-managements/manage-campaign-info/MyCampaignInfo';
import HostCreateOutsideDonation from '../host-managements/manage-campaign-donation/HostCreateOutsideDonation';
import NotFound from './NotFound';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import MyCampaignDashboard from '../host-managements/manage-campaign-dashboard/MyCampaignDashboard';

const MyCampaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const myCampaignsContext = useContext(mycampaignsContext);
    const campaign = myCampaignsContext.hostViewingCampaign;
    const { loading } = myCampaignsContext;
    const { getCategories, getRegions } = campaignsContext;

    const { slug } = props.match.params;

    const [resStatus, setResStatus] = useState(200);

    const fetchData = async () => {
        const result = await myCampaignsContext.getMyCampaignBySlug(slug);
        if (result === true) {
            getCategories();
            getRegions();
        } else if (result === false) {
            setResStatus(404);
        }
    }

    useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, []);

    if (resStatus === 404) {
        return <NotFound />;
    }
    if (loading) {
        return <Spinner />;
    }
    if (campaign && campaign.campaignStatus) {
        if (campaign.campaignStatus === 'block') {
            return (<div style={{minHeight: '82vh', maxWidth: '900px', margin: '20px auto 0'}}>
                <Alert alert={{ type: 'danger', msg: 'Chiến dịch của bạn đã bị khóa' }} />
            </div>);
        }
    }

    return (
        <div className='my-campaign-management' >
            <HostHeader slug={slug} />
            <Switch>
                <Route exact path={routes.MY_CAMPAIGN_DETAIL} component={MyCampaignDashboard} />
                <Route path={routes.MY_CAMPAIGN_INFO} >
                    <MyCampaignInfo slug={slug} />
                </Route>
                <Route exact path={routes.MY_CAMPAIGN_POSTS} component={MyCampaignPosts} />
                <Route exact path={routes.MY_CAMPAIGN_POST_CREATE} component={FormCreateCampaignPost} />
                <Route exact path={routes.MY_CAMPAIGN_POST_DETAIL} component={FormCreateCampaignPost} />
                <Route exact path={routes.MY_CAMPAIGN_EXPENSES} component={MyCampaignExpenses} />
                <Route exact path={routes.MY_CAMPAIGN_DONATIONS} component={MyCampaignDonations} />
                <Route exact path={routes.MY_CAMPAIGN_CREATE_DONATION} component={HostCreateOutsideDonation} />
                <Route exact path={routes.MY_CAMPAIGN_DONATION_DETAIL} component={HostViewDonationDetail} />
            </Switch>
        </div>
    );
}

export default MyCampaign;