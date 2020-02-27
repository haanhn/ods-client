import React from 'react';
import CampaignComment from './CampaignComment';

const CampaignComments = () => {
    const commentsJsx = [];
    commentsJsx.push(<CampaignComment/>);
    commentsJsx.push(<CampaignComment/>);
    commentsJsx.push(<CampaignComment/>);
    commentsJsx.push(<CampaignComment/>);

    return (
        <div className='campaign-comments'>
            {commentsJsx}
        </div>
    );
}

export default CampaignComments;