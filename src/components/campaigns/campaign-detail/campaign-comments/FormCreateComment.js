import React, { useContext } from 'react';
import CampaignsContext from '../../../../context/campaigns/campaignsContext';

const FormCreateComment = () => {
    const campaignsContext = useContext(CampaignsContext);

    const inputComment = React.createRef();

    const createComment = () => {
        try {
            const commentContent = inputComment.current.value.trim();
            if (commentContent.length > 0) {
                campaignsContext.createCampaignComment(commentContent);
            }
        } catch (error) {
            console.error(`Error when create comment: ${error}`);
            alert('Có lỗi xảy ra khi tạo comment, xin hãy thử lại');
        }
    }

    return (
        <div className='form-create-comment' >
            <div className="form-group">
                <textarea className="form-control" rows="3" placeholder='Bình luận về chiến dịch'
                    ref={inputComment} />
            </div>
            <div style={{ textAlign: 'right' }}>
                <button className="btn btn-success" onClick={createComment} >Bình luận</button>
            </div>
        </div >
    );
}

export default FormCreateComment;