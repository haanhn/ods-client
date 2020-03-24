import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import { routes, localStoreKeys } from './odsApi';
import CampaignsState from './context/campaigns/CampaignsState';
import MycampaignsState from './context/mycampaigns/MycampaignsState';
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
import { clearLocalStorage } from './context/auth/AuthState';
import MyCampaign from './components/pages/MyCampaign';
const App = () => {

  return (
    <AuthState>
      <CampaignsState>
        <AlertState>
          <MycampaignsState>
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
                  
                  <Route path={routes.NOT_FOUND} component={NotFound} />

                  <Route exact path={routes.PAGE_SIGN_IN} component={Login} />
                  <Route
                    exact
                    path={routes.PAGE_REGISTER}
                    component={Register}
                  />
                </Switch>
                <Footer />
              </div>
            </Router>
          </MycampaignsState>
        </AlertState>
      </CampaignsState>
    </AuthState>
  );
};

export default App;
