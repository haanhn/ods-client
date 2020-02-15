import React from 'react';
import './campaign.css';

const CampaignProgressBar = (props) => {
    const { raised, goal } = props;

    return (
        <div className="campaign-progress">
            <div className="campaign-progress-number clearfix">

                <div><strong>10000</strong> / 5000000 vnd</div>
                <div>Còn <strong>5 ngày</strong> </div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "25%" }}
                ></div>
            </div>

        </div>

    );
}

export default CampaignProgressBar;