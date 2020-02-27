import React from 'react';
import '../../css/create-campaign.css';

const CreateCampaignContentBox = (props) => {
    const campaignTitle = 'Giúp đỡ đồng bào miền Trung';

    return (
        <div className='create-campaign-content-box'>
            <h3>
                { campaignTitle ? campaignTitle: 'Chiến dịch của bạn' }
            </h3>
            {props.children}
        </div>
    );
}

export default CreateCampaignContentBox;