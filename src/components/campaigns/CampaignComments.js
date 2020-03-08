import React, { useContext } from 'react';
import CampaignComment from './CampaignComment';
import CampaignsContext from '../../context/campaigns/campaignsContext';

const CampaignComments = () => {
    const campaignsContext = useContext(CampaignsContext);
    const comments = campaignsContext.campaignComments;

    let commentsJsx = [];

    if (comments && comments.length > 0) {
        commentsJsx = comments.map((comment) => {
            return <CampaignComment comment={comment} />
        });
    } else {
        commentsJsx = <p>Hiện tại chưa có bình luận nào</p>
    }

    return (
        <div className='campaign-comments'>
            {commentsJsx}
        </div>
    );
}

export default CampaignComments;