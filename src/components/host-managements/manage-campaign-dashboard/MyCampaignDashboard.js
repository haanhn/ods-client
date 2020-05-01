import React, { useEffect, useContext } from 'react';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import MyCampaignStatsOverall from './MyCampaignStatsOverall';
// import MyCampaignStatsProgress from './MyCampaignStatsProgress';
import '../../css/host-manage-campaign/host-manage-dashboard.css';
import MyCampaignCharts from './campaign-charts/MyCampaignCharts';

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
            {/* { campaign && campaign.campaignStatus !== 'close' && campaign.campaignStatus !== 'block' ? (
                <MyCampaignStatsProgress />
            ) : null } */}
            <MyCampaignCharts />
        </div>
    );
}

export default MyCampaignDashboard;