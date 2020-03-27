import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProfileOverallContainer from './user-overall/ProfileOverallContainer';
import ProfileTabs from './profile-tabs/ProfileTabs';
import ProfileTabCampaigns from './profile-tabs/profile-tab-campaigns/ProfileTabCampaigns';
import ProfileTabDonations from './profile-tabs/profile-tab-donations/ProfileTabDonations';
import ProfileTabRatings from './profile-tabs/profile-tab-ratings/ProfileTabRatings';
import { routes } from '../../odsApi';

const ProfileContainer = () => {

    return (
        <div className='profile-container'>

            <ProfileOverallContainer />
            <div className='profile-tabs-container'>
                <ProfileTabs />
                <div className='profile-tab-content'>
                    <Switch>
                        <Route exact path={routes.USER_PROFILE}>
                            <ProfileTabCampaigns />
                        </Route>
                        <Route exact path={routes.USER_PROFILE_DONATIONS}> <ProfileTabDonations /> </Route>
                        <Route exact path={routes.USER_PROFILE_RATINGS}> <ProfileTabRatings /> </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default ProfileContainer;