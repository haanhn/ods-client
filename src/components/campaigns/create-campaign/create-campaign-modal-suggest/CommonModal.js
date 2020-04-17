import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CommonModal = (props) => {
    const { title, showingModal, setShowingModal } = props;
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
                {title ? (
                    <h5 style={{ borderBottom: '1px solid #E5E5DF', paddingBottom: '12px', marginBottom: '15px', fontWeight: 'bold'}}>
                        {title}
                    </h5>
                ) : null}
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