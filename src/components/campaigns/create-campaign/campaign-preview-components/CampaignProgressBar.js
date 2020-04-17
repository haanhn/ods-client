import React from 'react';
import CurrencyFormat from 'react-currency-format';
import '../../../common/campaign.css';

const CampaignProgressBar = (props) => {
    const { goal } = props;
    const goalValue = goal ? goal : 0;
    const raisedValue = goal / 2;
    const raisedJsx = <CurrencyFormat value={raisedValue} displayType={'text'} thousandSeparator={true} />;
    const goalJsx = <CurrencyFormat value={goalValue} displayType={'text'} thousandSeparator={true} />;
    const progress = '50%';
    
    return (
        <div className="campaign-progress">
            <div className="campaign-progress-number clearfix">
                <div>
                    <strong> {raisedJsx} / {goalJsx} vnđ </strong>
                </div>
                <div><strong>Còn 5 ngày</strong></div>
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