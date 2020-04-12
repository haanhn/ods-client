import React, { useEffect, useContext } from 'react';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import MyCampaignStatsOverall from './MyCampaignStatsOverall';
import MyCampaignStatsProgress from './MyCampaignStatsProgress';
import '../../css/host-manage-campaign/host-manage-dashboard.css';
import MyPieCharts from './pie-chart/MyPieCharts';

const MyCampaignDashboard = (props) => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const campaign = myCampaignsContext.hostViewingCampaign;
    const { slug } = props.match.params;

    useEffect(() => {
        myCampaignsContext.getMyCampaignStats(slug);
    }, []);

    return (
        <div className='container host-manage-dashboard'>
            <MyCampaignStatsOverall />
            { campaign && campaign.campaignStatus !== 'close' && campaign.campaignStatus !== 'block' ? (
                <MyCampaignStatsProgress />
            ) : null }
            <MyPieCharts />
        </div>
    );
}

export default MyCampaignDashboard;