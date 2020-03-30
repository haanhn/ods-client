import React, { Fragment, useEffect, useContext } from 'react';
import HomeBigIntro from '../layout/HomeBigIntro';
import HomeFeatures from '../layout/HomeFeatures';
import Campaigns from '../campaigns/Campaigns';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import '../css/home.css';


function Home() {
    const campaignsContext = useContext(CampaignsContext);

    useEffect(() => {
        console.log('get campaigns from Home')
        campaignsContext.getAllAvailableCampaigns();

        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <HomeBigIntro />
            <div className='auto-container' style={{ padding: '0 0 25px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Các chiến dịch nổi tiếng nhất</h2>
                <Campaigns />
            </div>
            <HomeFeatures />
            {/* <div className="dropdown" > */}
            {/* <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                            </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ display: 'block' }}>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            // </div> */}
        </Fragment>
    );
}

export default Home;