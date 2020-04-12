import React, { useContext } from 'react'
import MyCampaignStatsItem from './MyCampaignStatsItem';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import { getCampaignRunningDays, getCampaignTotalDays, getCampaignProgress } from '../../../utils/myCampaignDashboardStatsUtils';

const MyCampaignStatsProgress = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);

    const stats = myCampaignsContext.viewingCampaignStats;
    const campaign = myCampaignsContext.hostViewingCampaign;
    const raised = stats && stats.raised ? stats.raised : 0;
    const goal = campaign && campaign.campaignGoal ? campaign.campaignGoal : 0;

    const runningDays = getCampaignRunningDays(campaign);
    let avgRaised = 0;
    if (runningDays > 0) {
        avgRaised = Math.round(raised / runningDays);
    }

    const totalDays = getCampaignTotalDays(campaign);
    let minAvgRaised = 0;
    if (totalDays > 0) {
        minAvgRaised = Math.round(goal / totalDays);
    }

    let progress = 0;
    if (minAvgRaised > 0) {
        progress = avgRaised / minAvgRaised;
    }

    const avgRaisedStr = new Intl.NumberFormat('ja-JP').format(avgRaised);
    const minAvgStr = new Intl.NumberFormat('ja-JP').format(minAvgRaised);
    const progressStr = getCampaignProgress(progress, campaign);

    const avgRaisedJsx = <MyCampaignStatsItem statsNumber={`${avgRaisedStr}đ`} statsName='Trung bình 1 ngày quyên được' />;
    const minAvgRaisedJsx = <MyCampaignStatsItem statsNumber={`${minAvgStr}đ`} statsName='Trung bình tối thiểu 1 ngày cần quyên' />;
    let progressJsx = null;
    if (campaign && campaign.campaignStatus === 'public' && progressStr) {
        if (progress >= 1) {
            progressJsx = <span style={{ fontWeight: 'normal', fontSize: '93%' }}>Chiến dịch quyên được <span style={{ fontWeight: 'bold', color: '#10a44e' }}>{progressStr}</span> so với tiến độ dự kiến</span>;
        } else if (progress > 0 && progress < 1) {
            progressJsx = (
                <span style={{ fontWeight: 'normal', fontSize: '93%' }}>
                    Chiến dịch đang <b style={{color: '#a60f2f'}} >trễ tiến độ</b>, quyên được <span style={{ fontWeight: 'bold', color: '#a60f2f' }}>{progressStr}</span> so với tiến độ dự kiến
                </span>);
        }
    }

    return (
        <div className='group-of-stats'>
            <h5>Tiến độ: {progressJsx}</h5>
            <div className='row clearfix'>
                <div className='col-sm-6 col-12'>
                    {avgRaisedJsx}
                </div>
                <div className='col-sm-6 col-12'>
                    {minAvgRaisedJsx}
                </div>
            </div>
        </div>
    )
}

export default MyCampaignStatsProgress;