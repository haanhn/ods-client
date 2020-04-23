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
    let raisedFormat = getShortFormattedMoney(raisedValue);
        // raisedValue.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        // new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(raisedValue);

    let goalFormat = getShortFormattedMoney(goalValue);

    //left time
    const today = new Date();
    let leftTime = calculateDaysBetweenDates(today.toString(), campaignEndDate);
    return (
        <div className="campaign-progress" style={{ marginBottom: '5px', color: '#5d5d5d' }}>
            <div className="campaign-progress-number clearfix">
                <div>
                    <strong> {raisedFormat} / {goalFormat} đ </strong>
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

const getShortFormattedMoney = (money) => {
    try {
        let formattedMoney = '';
        if (1000 <= money && money <= 999999) {
            formattedMoney = money / 1000;
            formattedMoney = Math.floor(formattedMoney);
            formattedMoney = formattedMoney + 'N';
        } else if (1000000 <= money && money <= 999999999) {
            const flooredMoney = Math.floor(money / 1000000) + 0.1;
            formattedMoney = money / 1000000;
            if (formattedMoney < flooredMoney) {
                formattedMoney = Math.floor(formattedMoney);
            } else {
                formattedMoney = formattedMoney.toFixed(1);
            }
            formattedMoney = formattedMoney + 'tr';
        } else if (1000000000 <= money) {
            const flooredMoney = Math.floor(money / 1000000000) + 0.1;
            formattedMoney = money / 1000000000;
            if (formattedMoney < flooredMoney) {
                formattedMoney = Math.floor(formattedMoney);
            } else {
                formattedMoney = formattedMoney.toFixed(1);
            }
            formattedMoney = formattedMoney + 'T';
        } else {
            formattedMoney = money;
        }
        return formattedMoney;
    } catch (error) {
        console.error(error);
        return '';
    }
}