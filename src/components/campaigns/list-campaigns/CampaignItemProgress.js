import React from 'react';
import { calculateDaysBetweenDates } from '../../../utils/commonUtils';
import '../../common/campaign.css';

const CampaignItemProgress = (props) => {
    const { raised, goal, campaignEndDate, campaignStatus } = props;
    const raisedValue = raised ? raised : 0;
    const goalValue = goal ? goal : 0;
    // const raisedJsx = <CurrencyFormat value={raisedValue} displayType={'text'} thousandSeparator={true} />;
    // const goalJsx = <CurrencyFormat value={goalValue} displayType={'text'} thousandSeparator={true} />;
    //Progress value
    let progress = (raisedValue / goal) * 100;
    if (progress > 100) {
        progress = 100;
    } else if (progress < 1) {
        progress = '5px';
    }
    if (progress >= 1) {
        progress = progress + '%';
    }
    const raisedFormat =
        new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(raisedValue);

    const goalFormat =
        new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(goalValue);

    //left time
    const today = new Date();
    let leftTime = calculateDaysBetweenDates(today.toString(), campaignEndDate);
    return (
        <div className="campaign-progress" style={{marginBottom: '5px', color: '#5d5d5d'}}>
            <div className="campaign-progress-number clearfix">
                <div>
                    <strong> {raisedFormat} / {goalFormat} vnđ </strong>
                </div>
                {campaignStatus === 'public' ? (
                    <div>Còn <strong>{leftTime}</strong> </div>
                ) : (
                        <div><strong>Đã kết thúc</strong></div>
                    )}
            </div>
            <div className="progress">
                <div className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: progress }}
                ></div>
            </div>
        </div>
    );
}

export default CampaignItemProgress;