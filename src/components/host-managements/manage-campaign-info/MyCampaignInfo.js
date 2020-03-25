import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import '../../css/host-manage-campaign.css';
import MyCampaignTabImage from './MyCampaignTabImage';
import MyCampaignTabDetails from './MyCampaignTabDetails';
import MyCampaignTabStory from './MyCampaignTabStory';
import { routes } from '../../../odsApi';
import { Switch, Route, Link } from 'react-router-dom';

const MyCampaignInfo = (props) => {
    const { slug } = props;
    const routeInfoImage = routes.getRouteMyCampaignInfo(slug);
    const routeInfoDetails = routes.getRouteMyCampaignInfoDetails(slug);
    const routeInfoStory = routes.getRouteMyCampaignInfoStory(slug);
    return (
        <div className='my-campaign-info-container'>
            <div className='my-campaign-info'>
                <Link to={routeInfoImage}>img</Link>
                <Link to={routeInfoDetails}>details</Link>
                <Link to={routeInfoStory}>story</Link>
                <Switch>
                    <Route exact path={`${routes.MY_CAMPAIGN_INFO}`}>
                        <MyCampaignTabImage />
                    </Route>
                    <Route exact path={`${routes.MY_CAMPAIGN_INFO_DETAILS}`}>
                        {/* <CampaignTabMoreInfo description={campaign.campaignDescription} /> */}
                        <MyCampaignTabDetails />
                    </Route>
                    <Route exact path={`${routes.MY_CAMPAIGN_INFO_STORY}`}>
                        {/* <CampaignTabMoreInfo description={campaign.campaignDescription} /> */}
                        <MyCampaignTabStory />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default MyCampaignInfo;

{/* <Tab.Container id="left-tabs-example" defaultActiveKey="campInfoImage">
    <Row>
        <Col sm={3}>
            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    <Nav.Link eventKey="campInfoImage">Ảnh bìa</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="campInfoDetails">Chi tiết</Nav.Link>
                </Nav.Item>
            </Nav>
        </Col>
        <Col sm={9}>
            <Tab.Content>
                <Tab.Pane eventKey="campInfoImage">
                    <MyCampaignTabImage />
                </Tab.Pane>
                <Tab.Pane eventKey="campInfoDetails">
                    <div>2nd</div>
                </Tab.Pane>
            </Tab.Content>
        </Col>
    </Row>
</Tab.Container> */}
