import React from 'react';

const MyCampaignStatsItem = (props) => {
    const number = props.statsNumber ? props.statsNumber : 0; 
    const name = props.statsName ? props.statsName : 'Tên của số liệu'; 

    return (
        <div className='my-campaign-stats-item'>
            <div className='stats-number'>
                {number}
            </div>
            <div className='stats-name'>
                {name}
            </div>
        </div>
    );
}

export default MyCampaignStatsItem;