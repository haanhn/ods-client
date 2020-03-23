import React, { useContext } from 'react';
import CampaignComment from './CampaignComment';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import Alert from '../common/Alert';

const CampaignComments = () => {
    const campaignsContext = useContext(CampaignsContext);
    const comments = campaignsContext.campaignComments;

    let commentsJsx = [];

    if (comments && comments.length > 0) {
        commentsJsx = comments.map((comment) => {
            return <CampaignComment comment={comment} />
        });
    } else {
        commentsJsx = <Alert alert={alertEmpty} />;
    }

    return (
        <div className='campaign-comments'>
            {commentsJsx}
        </div>
    );
}
const alertEmpty = { type: 'secondary', msg: 'Hiện tại chưa có bình luận nào' };

export default CampaignComments;