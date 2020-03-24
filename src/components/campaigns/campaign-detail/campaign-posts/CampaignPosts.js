import React, { useContext } from 'react';
import CampaignsContext from '../../../../context/campaigns/campaignsContext';
import CampaignPost from './CampaignPost';
import Alert from '../../../common/Alert';

const CampaignPosts = () => {
    const campaignsContext = useContext(CampaignsContext);
    const posts = campaignsContext.campaignPosts;

    let postsJsx = [];
    
    if (posts && posts.length > 0) {
        postsJsx = posts.map((post) => {
            return <CampaignPost key={post.id} post={post} />
        });
    } else {
        postsJsx = <Alert alert={alertEmpty} />;
    }

    return (
        <div>
            { postsJsx }
        </div>
    );
}
const alertEmpty = { type: 'secondary', msg: 'Hiện tại chưa có bài viết cập nhật nào' };

export default CampaignPosts;