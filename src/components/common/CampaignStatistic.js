import React from 'react';
import './campaign.css';

const CampaignStatistic = (props) => {
    const { countDonations } = props;
    return (
        <div className="campaign-stats">
            <ul className="list-inline">
                <li className="list-inline-item">
                    <strong>
                        150k
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