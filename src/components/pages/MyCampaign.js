import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../../odsApi';
import MyCampaignPosts from '../host-managements/manage-campaign-post/MyCampaignPosts';
import FormCreateCampaignPost from '../host-managements/manage-campaign-post/FormCreateCampaignPost';
import mycampaignsContext from '../../context/mycampaigns/mycampaignsContext';
import '../css/host-manage-campaign.css';
import MyCampaignDonations from '../host-managements/manage-campaign-donation/MyCampaignDonations';
import HostViewDonationDetail from '../host-managements/manage-campaign-donation/HostViewDonationDetail';
import HostHeader from '../host-managements/HostHeader';

const MyCampaign = (props) => {
    const myCampaignsContext = useContext(mycampaignsContext);
    const { slug } = props.match.params;

    useEffect(() => {
        myCampaignsContext.getCampaignBySlug(slug);
    }, []);

    return (
        <div className='my-campaign-management' >
            <HostHeader slug={slug} />
            <Switch>
                <Route exact path={routes.MY_CAMPAIGN_POSTS} component={MyCampaignPosts} />
                <Route exact path={routes.MY_CAMPAIGN_POST_CREATE} component={FormCreateCampaignPost} />
                <Route exact path={routes.MY_CAMPAIGN_POST_DETAIL} component={FormCreateCampaignPost} />
                <Route exact path={routes.MY_CAMPAIGN_DONATIONS} component={MyCampaignDonations} />
                <Route exact path={routes.MY_CAMPAIGN_DONATION_DETAIL} component={HostViewDonationDetail} />
            </Switch>
        </div>
    );
}

export default MyCampaign;