import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';

const ConfirmDeleteExpense = (props) => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const { slug, expenseId, expenseName } = props;
    //State Alerts
    const [alertResult, setAlertResult] = useState(null);
    const [result, setResult] = useState(false);

    const deleteExpense = async () => {
        setAlertResult(null);
        const result = await myCampaignsContext.deleteCampaignExpense(expenseId);
        if (result) {
            setAlertResult({ type: 'success', msg: 'Xóa chi phí thành công' });
            setResult(true);
        } else {
            setAlertResult({ type: 'danger', msg: 'Xóa chi phí thất bại, xin thử lại' });
        }
    }

    const hideModal = () => {
        props.setShowingModal(false);
        setAlertResult(null);
        setResult(false);
        myCampaignsContext.getCampaignExpenses(slug);
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
                Bạn có muốn xóa chi phí: {expenseName} ?
                <Alert alert={alertResult} />
            </Modal.Body>
            <Modal.Footer>
                {!result ? (
                    <button className="btn btn-danger" onClick={deleteExpense} >Xoá</button>
                ) : null}
                <button className="btn btn-light" onClick={hideModal} >Đóng</button>
            </Modal.Footer>
        </Modal>

    );
}

export default ConfirmDeleteExpense;