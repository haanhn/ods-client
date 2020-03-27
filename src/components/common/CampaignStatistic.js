import React from 'react';
import './campaign.css';

const CampaignStatistic = (props) => {
    const { countDonations, countFollowers } = props;
    return (
        <div className="campaign-stats">
            <ul className="list-inline">
                <li className="list-inline-item">
                    <strong>
                        {countFollowers ? countFollowers : 0}
                    </strong>
                    <span>Người theo dõi</span>
                </li>
                <li className="list-inline-item">
                    <strong >
                        { countDonations ? countDonations : 0 }
                    </strong>
                    <span>Quyên góp</span>
                </li>
            </ul>
        </div>
    );
}

export default CampaignStatistic;