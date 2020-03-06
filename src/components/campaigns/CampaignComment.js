import React, { useEffect } from 'react';
import '../campaigns/campaign2.css';

const CampaignComment = (props) => {
    const { content, createdAt, userId, User } = props.comment;
    // const 

    // "id": "91881846-b7de-431a-8264-0484f8348c9a",
    //     "email": "haanhx701@gmail.com",
    //         "fullname": "Nguyễn Thị Hà Anh",
    //             "avatar": null,

    return (
        // <div className='auto-container host-info'>
        <div className='campaign-comment'>
            <div className='row clearfix comment-avatar'>
                <img src={User.avatar ? User.avatar : '/images/default-data-images/default-user-avatar.png'} 
                    className='col' />
                <div className='col' >
                    <h6> {User ? User.fullname : ''} </h6>
                    {createdAt}
                </div>

            </div>
            <div className='comment-content'>
                {content}
            </div>
            {/* <div style={{textAlign: 'right'}} > 
                <button className='btn btn-sm btn-light'>Xóa ảnh</button>
            </div> */}
        </div>
        // </div>
    );
}

const popoverHtml = <div id='btnDeleteComment'>Xóa bình luận</div>
export default CampaignComment;