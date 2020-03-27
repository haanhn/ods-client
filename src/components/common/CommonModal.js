import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CommonModal = (props) => {
    const { showingModal, setShowingModal } = props;
    const message = props.message ? props.message : null;

    const hideModal = () => {
        setShowingModal(false);
    }

    return ((message) ? (
        <Modal
            show={showingModal}
            onHide={hideModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h5 style={{ marginBottom: '7px', fontWeight: 'bold' }}>Lưu ý</h5>
                <div>
                    {message}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-sm btn-light" onClick={hideModal} >Đóng</button>
            </Modal.Footer>
        </Modal >
    ) : null
    );
}

export default CommonModal;