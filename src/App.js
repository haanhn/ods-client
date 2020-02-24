import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import { routes } from './odsApi';
import CampaignsState from './context/campaigns/CampaignsState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ListCampaigns from './components/pages/ListCampaigns';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import Register from './components/auth/Register';

const App = () => {
  return (
    <AuthState>
      <CampaignsState>
        <AlertState>
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
                <Route exact path={routes.PAGE_SIGN_IN} component={Login} />
                <Route exact path={routes.PAGE_REGISTER} component={Register} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </AlertState>
      </CampaignsState>
    </AuthState>
  );
};

export default App;
