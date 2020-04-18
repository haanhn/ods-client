import React, { useContext } from 'react';
import '../campaigns/campaign2.css';
import { getDateFormatDD_MM_YYYY } from '../../utils/commonUtils';
import { localStoreKeys } from '../../odsApi';
import CampaignsContext from '../../context/campaigns/campaignsContext';

const CampaignComment = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { id, content, createdAt, userId, User } = props.comment;
    const date = getDateFormatDD_MM_YYYY(createdAt);
    const currentUserId = localStorage.getItem(localStoreKeys.userId);

    const deleteComment = async () => {
        try {
            await campaignsContext.deleteCampaignComment(id);
        } catch (error) {
            console.error(error);
        }
    }

    let btnDeleteJsx = null;
    if (currentUserId === userId) {
        btnDeleteJsx = (
            <div style={{ textAlign: 'right' }} >
                <button className='btn btn-sm btn-light' onClick={deleteComment}>Xóa bình luận</button>
            </div>
        );
    }

    return (
        <div className='campaign-comment'>
            <div className='row clearfix comment-avatar'>
                <img src={User && User.avatar ? User.avatar : '/images/default-data-images/default-user-avatar.png'}
                    className='col' />
                <div className='col' >
                    <h6> {User ? User.fullname : ''} </h6>
                    {date}
                </div>

            </div>
            <div className='comment-content'>
                {content}
            </div>
            {btnDeleteJsx}
        </div>
    );
}

export default CampaignComment;