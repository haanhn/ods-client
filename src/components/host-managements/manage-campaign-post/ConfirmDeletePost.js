import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';

const ConfirmDeletePost = (props) => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const { slug, postId, postName } = props;
    //State Alerts
    const [alertResult, setAlertResult] = useState(null);
    const [result, setResult] = useState(false);

    const deletePost = async () => {
        setAlertResult(null);
        const result = await myCampaignsContext.deleteCampaignPost(postId);
        if (result) {
            setAlertResult({ type: 'success', msg: 'Xóa bài viết thành công' });
            setResult(true);
        } else {
            setAlertResult({ type: 'danger', msg: 'Xóa bài viết thất bại, xin thử lại' });
        }
    }

    const hideModal = () => {
        props.setShowingModal(false);
        setAlertResult(null);
        setResult(false);
        // If delete success => reload posts
        if (result) {
            myCampaignsContext.getMyCampaignPosts(slug);
        }
    }

    return (
        <Modal
            show={props.showingModal}
            onHide={hideModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                Bạn có muốn xóa bài viết: {postName} ?
                <Alert alert={alertResult} />
            </Modal.Body>
            <Modal.Footer>
                {!result ? (
                    <button className="btn btn-danger" onClick={deletePost} >Xoá</button>
                ) : null}
                <button className="btn btn-light" onClick={hideModal} >Đóng</button>
            </Modal.Footer>
        </Modal>

    );
}

export default ConfirmDeletePost;