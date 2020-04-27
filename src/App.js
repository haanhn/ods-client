import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import { routes } from './odsApi';
import CampaignsState from './context/campaigns/CampaignsState';
import MycampaignsState from './context/mycampaigns/MycampaignsState';
import MyDonationsState from './context/myDonations/MyDonationsState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ListCampaigns from './components/pages/ListCampaigns';
import Campaign from './components/pages/Campaign';
import CreateCampaign from './components/pages/CreateCampaign';
import Mycampaigns from './components/pages/Mycampaigns';
import DonateCampaign from './components/pages/DonateCampaign';
import NotFound from './components/pages/NotFound';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import Register from './components/auth/Register';
import MyCampaign from './components/pages/MyCampaign';
import MyDonations from './components/donor-managements/MyDonations';
import UserProfile from './components/pages/UserProfile';
import AccountSetting from './components/pages/AccountSetting';
import UserProfileState from './context/user-profile/UserProfileState';
import About from './components/pages/About';
const App = () => {

  return (
    <AuthState>
      <UserProfileState>
        <CampaignsState>
          <AlertState>
            <MycampaignsState>
              <MyDonationsState>
                <Router>
                  <div>
                    <Header />
                    <Alerts />
                    <Switch>
                      <Route exact path={routes.HOME} component={Home} />
                      <Route
                        exact
                        path={routes.CAMPAIGNS}
                        component={ListCampaigns}
                      />
                      <Route path={routes.CAMPAIGN_DETAIL} component={Campaign} />
                      <Route
                        // exact
                        path={routes.CAMPAIGN_DONATE}
                        component={DonateCampaign}
                      />
                      <Route exact path={routes.CAMPAIGNS_CREATE} component={CreateCampaign} />

                      {/* Host Routes */}
                      <Route exact path={routes.MY_CAMPAIGNS} component={Mycampaigns} />
                      <Route path={routes.MY_CAMPAIGN_DETAIL} component={MyCampaign} />

                      {/* Donor Routes */}
                      <Route exact path={routes.MY_DONATIONS} component={MyDonations} />

                      {/* User Profile Routes */}
                      <Route path={routes.USER_PROFILE} component={UserProfile} />

                      {/* Account Setting Routes */}
                      <Route path={routes.MY_ACCOUNT} component={AccountSetting} />

                      <Route path={routes.NOT_FOUND} component={NotFound} />

                      <Route exact path={routes.PAGE_SIGN_IN} component={Login} />
                      <Route
                        exact
                        path={routes.PAGE_REGISTER}
                        component={Register}
                      />

                      {/* Route About */}
                      <Route path={routes.ABOUT} component={About} />
                    </Switch>
                    <Footer />
                  </div>
                </Router>
              </MyDonationsState>
            </MycampaignsState>
          </AlertState>
        </CampaignsState>
      </UserProfileState>
    </AuthState>
  );
};

export default App;
