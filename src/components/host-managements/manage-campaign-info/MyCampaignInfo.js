import React, { useState } from 'react';
import '../../css/host-manage-campaign.css';
import MyCampaignTabImage from './MyCampaignTabImage';
import MyCampaignTabDetails from './MyCampaignTabDetails';
import MyCampaignTabStory from './MyCampaignTabStory';
import { routes } from '../../../odsApi';
import { Switch, Route, Link } from 'react-router-dom';
import './my-campaign-tab-info.css';

const MyCampaignInfo = (props) => {
    const { slug } = props;
    const routeInfoImage = routes.getRouteMyCampaignInfo(slug);
    const routeInfoDetails = routes.getRouteMyCampaignInfoDetails(slug);
    const routeInfoStory = routes.getRouteMyCampaignInfoStory(slug);

    const [activeImg, setActiveImg] = useState(false);
    const [activeDetails, setActiveDetails] = useState(false);
    const [activeStory, setActiveStory] = useState(false);

    const setActive = (event) => {
        const target = event.target;
        if (!target) {
            return;
        }
        const id = target.id;
        setActiveImg(false);
        setActiveDetails(false);
        setActiveStory(false);
        switch (id) {
            case 'linkTabInfoImg':
                setActiveImg(true);
                break;
            case 'linkTabInfoDetails':
                setActiveDetails(true);
                break;
            case 'linkTabInfoStory':
                setActiveStory(true);
                break;
        }
    }

    return (
        <div className='my-campaign-info-container'>
            <div className='my-campaign-info-box'>
                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-2 col-md-3 col-sm-3 col-12 campaign-info-tabs'>
                            <ul className="list-group list-group-flush">
                                {/* <li class="list-group-item active"> */}
                                <li className={`list-group-item ${activeImg ? 'active' : null}`}>
                                    <Link to={routeInfoImage} id='linkTabInfoImg' onClick={setActive}>
                                        Ảnh bìa
                                    </Link>
                                </li>
                                <li className={`list-group-item ${activeDetails ? 'active' : null}`}>
                                    <Link to={routeInfoDetails} id='linkTabInfoDetails' onClick={setActive}>
                                        Chi tiết
                                    </Link>
                                </li>
                                <li className={`list-group-item ${activeStory ? 'active' : null}`}>
                                    <Link to={routeInfoStory} id='linkTabInfoStory' onClick={setActive}>
                                        Câu chuyện
                                    </Link>
                                </li>
                            </ul>

                        </div>
                        <div className='col-lg-10 col-md-9 col-sm-9 col-12 cammpaign-into-content'>
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
                </div>
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
