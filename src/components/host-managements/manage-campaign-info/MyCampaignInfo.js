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
                                    <MyCampaignTabDetails />
                                </Route>
                                <Route exact path={`${routes.MY_CAMPAIGN_INFO_STORY}`}>
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