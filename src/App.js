import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import { routes } from './odsApi';
import CampaignsState from './context/campaigns/CampaignsState';
import ListCampaigns from './components/pages/ListCampaigns';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

const App = () => {
  return (
    <CampaignsState>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path={routes.HOME} component={Home} />
            <Route exact path={routes.CAMPAIGNS} component={ListCampaigns} />
            <Route exact path={routes.PAGE_SIGN_IN} component={Login} />
            <Route exact path={routes.PAGE_REGISTER} component={Register} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </CampaignsState>
  );
};

export default App;
