import React, { useContext } from 'react'
import MyCampaignStatsItem from './MyCampaignStatsItem';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import { getAverageDonationAmount, getCampaignRunningDays } from '../../../utils/myCampaignDashboardStatsUtils';

const MyCampaignStatsOverall = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const stats = myCampaignsContext.viewingCampaignStats;
    const campaign = myCampaignsContext.hostViewingCampaign;
    const goal = campaign && campaign.campaignGoal ? campaign.campaignGoal : 0;
    const raised = stats && stats.raised ? stats.raised : 0;
    const countDonations = stats && stats.countDonations ? stats.countDonations : 0;
    const avgDonation = getAverageDonationAmount(raised, countDonations);

    const goalStr = new Intl.NumberFormat('ja-JP').format(goal);
    const raisedStr = new Intl.NumberFormat('ja-JP').format(raised);
    const avgDonationStr = new Intl.NumberFormat('ja-JP').format(avgDonation);
    const runningDays = getCampaignRunningDays(campaign);

    const goalJsx = <MyCampaignStatsItem statsNumber={`${goalStr}đ`} statsName='Mục tiêu' />;
    const raisedJsx = <MyCampaignStatsItem statsNumber={`${raisedStr}đ`} statsName='Quyên được' />;
    const daysRunningJsx = <MyCampaignStatsItem statsNumber={runningDays} statsName='Số ngày đã chạy' />;
    const countDonationsJsx = <MyCampaignStatsItem statsNumber={countDonations} statsName='Lượt quyên góp' />;
    const avgDonationJsx = <MyCampaignStatsItem statsNumber={`${avgDonationStr}đ`} statsName='Trung bình mỗi quyên góp' />;

    const status = campaign.campaignStatus;
    const success = campaign.success;
    const type = getType(status);

    return (
        <div>
            <div className='group-of-stats'>
                <div>
                    <h5>
                        Trạng thái: <span className={'badge ' +
                            (status === 'public' ? 'badge-success' : status === 'close'
                                ? 'badge-secondary' : status === 'waiting'
                                    ? 'badge-warning' : 'badge-danger')
                        }
                        >
                            {type}
                        </span>
                        {status === 'close' && success === true ? (
                            <span style={{color: 'green', marginLeft: '12px'}}>Đã quyên đủ tiền</span>
                        ) : null}
                        {status === 'close' && !success ? (
                            <span style={{color: 'orange', marginLeft: '12px'}}>Chưa quyên đủ tiền</span>
                        ) : null}
                    </h5>
                </div>
                <h5>Tổng quan</h5>
                <div className='row clearfix'>
                    <div className='col-sm-6 col-12'>
                        {goalJsx}
                    </div>
                    <div className='col-sm-6 col-12'>
                        {raisedJsx}
                    </div>
                </div>
                {/* <div className='row clearfix'>
                    <div className='col-md-4 col-sm-4 col-12'>
                        {daysRunningJsx}
                    </div>
                    <div className='col-md-4 col-sm-4 col-12'>
                        {countDonationsJsx}
                    </div>
                    <div className='col-md-4 col-sm-4 col-12'>
                        {avgDonationJsx}
                    </div>
                </div> */}
            </div>
            <div className='group-of-stats' style={{ marginTop: '-12px' }}>
                <h5>Quyên góp</h5>
                <div className='row clearfix'>
                    <div className='col-md-4 col-sm-4 col-12'>
                        {daysRunningJsx}
                    </div>
                    <div className='col-md-4 col-sm-4 col-12'>
                        {countDonationsJsx}
                    </div>
                    <div className='col-md-4 col-sm-4 col-12'>
                        {avgDonationJsx}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyCampaignStatsOverall;

const getType = (status) => {
    let type = 'đang mở';
    if (status === 'close') {
        type = 'đã đóng';
    } else if (status === 'waiting') {
        type = 'chờ xác nhận';
    } else if (status === 'setting') {
        type = 'đang tạo';
    } else if (status === 'block') {
        type = 'bị khóa';
    }
    return type;
}