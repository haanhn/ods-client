import React, { useContext } from 'react'
import MyCampaignStatsItem from './MyCampaignStatsItem';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import { getAverageDonationAmount, getCampaignRunningDays } from '../../../utils/myCampaignDashboardStatsUtils';

const MyCampaignStatsOverall = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const stats = myCampaignsContext.viewingCampaignStats;
    const campaign = myCampaignsContext.hostViewingCampaign;
    const raised = stats && stats.raised ? stats.raised : 0;
    const countDonations = stats && stats.countDonations ? stats.countDonations : 0;
    const avgDonation = getAverageDonationAmount(raised, countDonations);

    const raisedStr = new Intl.NumberFormat('ja-JP').format(raised);
    const avgDonationStr = new Intl.NumberFormat('ja-JP').format(avgDonation);
    const runningDays = getCampaignRunningDays(campaign);

    const raisedJsx = <MyCampaignStatsItem statsNumber={`${raisedStr}đ`} statsName='Quyên được' />;
    const daysRunningJsx = <MyCampaignStatsItem statsNumber={runningDays} statsName='Số ngày chạy' />;
    const countDonationsJsx = <MyCampaignStatsItem statsNumber={countDonations} statsName='Lượt quyên góp' />;
    const avgDonationJsx = <MyCampaignStatsItem statsNumber={`${avgDonationStr}đ`} statsName='Trung bình mỗi quyên góp' />;

    return (
        <div className='group-of-stats'>
            <h5>Tổng quan</h5>
            <div className='row clearfix'>
                <div className='col-md-3 col-sm-6 col-12'>
                    {raisedJsx}
                </div>
                <div className='col-md-3 col-sm-6 col-12'>
                    {daysRunningJsx}
                </div>
                <div className='col-md-3 col-sm-6 col-12'>
                    {countDonationsJsx}
                </div>
                <div className='col-md-3 col-sm-6 col-12'>
                    {avgDonationJsx}
                </div>
            </div>
        </div>
    );
}

export default MyCampaignStatsOverall;