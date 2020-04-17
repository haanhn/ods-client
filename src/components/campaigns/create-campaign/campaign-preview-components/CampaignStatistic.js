import React from 'react';
import '../../../common/campaign.css';

const CampaignStatistic = () => {
    const countFollowers = 12;
    const countDonations = 9;
    return (
        <div className="campaign-stats">
            <ul className="list-inline">
                <li className="list-inline-item">
                    <strong>
                        {countFollowers}
                    </strong>
                    <span>Người theo dõi</span>
                </li>
                <li className="list-inline-item">
                    <strong >
                        {countDonations}
                    </strong>
                    <span>Quyên góp</span>
                </li>
            </ul>
        </div>
    );
}

export default CampaignStatistic;