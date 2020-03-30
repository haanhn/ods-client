import React, { useContext } from 'react';
import { FacebookShareCount } from 'react-share';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import './campaign.css';

const CampaignStatistic = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const countFollowers = campaignsContext.countFollowers;
    const { countDonations } = props;
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
                        {countDonations ? countDonations : 0}
                    </strong>
                    <span>Quyên góp</span>
                </li>
                {/* <li className="list-inline-item">
                    <strong >
                        <FacebookShareCount url={'https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx'} >
                            {count => count}
                        </FacebookShareCount>
                    </strong>
                    <span>Chia sẻ</span>
                </li> */}
            </ul>
        </div>
    );
}

export default CampaignStatistic;