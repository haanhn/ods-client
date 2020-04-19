import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './campaign.css';
import { calculateDaysBetweenDates } from '../../utils/commonUtils';

const CampaignProgressBar = (props) => {
    const { raised, goal, campaignEndDate, campaignStatus } = props;
    const raisedValue = raised ? raised : 0;
    const goalValue = goal ? goal : 0;
    const raisedJsx = <CurrencyFormat value={raisedValue} displayType={'text'} thousandSeparator={true} />;
    const goalJsx = <CurrencyFormat value={goalValue} displayType={'text'} thousandSeparator={true} />;
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
    //left time
    const today = new Date();
    let leftTime = calculateDaysBetweenDates(today.toString(), campaignEndDate);
    return (
        <div className="campaign-progress">
            <div className="campaign-progress-number clearfix">
                <div>
                    <strong> {raisedJsx} / {goalJsx} đ </strong>
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

export default CampaignProgressBar;