import React, { Fragment, useEffect, useContext } from 'react';
import HomeBigIntro from '../layout/HomeBigIntro';
import HomeFeatures from '../layout/HomeFeatures';
import Campaigns from '../campaigns/Campaigns';
import CampaignsContext from '../../context/campaigns/campaignsContext';

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
            <div className='auto-container' style={{padding: '60px 0 20px'}}>
                <h2 style={{textAlign: 'center', marginBottom:'40px'}}>Các chiến dịch nổi tiếng nhất</h2>
                <Campaigns />
            </div>
            <HomeFeatures />
        </Fragment>
    );
}

export default Home;