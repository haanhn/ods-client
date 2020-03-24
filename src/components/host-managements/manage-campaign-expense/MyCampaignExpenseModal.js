import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CurrencyFormat from 'react-currency-format';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';

const MyCampaignExpenseModal = (props) => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const { slug } = props;
    const expense = props.expense;
    const initId = expense ? expense.id : null;
    const initTitle = expense ? expense.title : '';
    const initCost = expense ? expense.cost : 100000;
    const initDescription = expense ? expense.description : '';
    
    //init for showing init cost value because setCost(initCost) does not get the initCost value
    //also for id, setId(initId)
    const [init, setInit] = useState(true);

    const inputTitle = React.createRef();
    const inputDescription = React.createRef();
    const [id, setId] = useState(initId);
    const [cost, setCost] = useState(initCost);
    
    //State Alerts
    const [alertResult, setAlertResult] = useState(null);
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertCost, setAlertCost] = useState(null);
    const [alertDescription, setAlertDescription] = useState(null);

    const saveExpense = () => {
        setId(initId);
        const title = inputTitle.current.value.trim();
        const description = inputDescription.current.value.trim();

        setAlertResult(null);
        setAlertTitle(null);
        setAlertCost(null);
        setAlertDescription(null);

        let result = false;
        const messages = validateData(title, cost, description);
        if (messages) {
            if (messages.title) {
                setAlertTitle({ type: 'danger', msg: messages.title });
            }
            if (messages.cost) {
                setAlertCost({ type: 'danger', msg: messages.cost });
            }
            if (messages.description) {
                setAlertDescription({ type: 'danger', msg: messages.description });
            }
        } else {
            if (id) {
                console.log('Update expense');
                result = myCampaignsContext.updateCampaignExpense(id, title, cost, description);

            } else {
                console.log('Create expense');
                result = myCampaignsContext.createCampaignExpense(title, cost, description);
            }
        }
        if (result) {
            setAlertResult({ type: 'success', msg: 'Lưu thành công' })
        } else if (!messages) {
            setAlertResult({ type: 'danger', msg: 'Lưu thất bại, xin thử lại' })
        }
    }

    const hideModal = () => {
        setInit(true);
        setAlertResult(null);
        setAlertTitle(null);
        setAlertCost(null);
        setAlertDescription(null);
        myCampaignsContext.getCampaignExpenses(slug);
        props.setShowingModal(false);
    }

    return (
        <Modal
            show={props.showingModal}
            onHide={hideModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Chi phí
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="row">
                        <label className="col-sm-12 col-form-label">
                            Chi phí
                        </label>
                        <div className="col-sm-12">
                            <input type="text" className="form-control" placeholder="Chi phí"
                                defaultValue={initTitle}
                                ref={inputTitle}
                            />
                            <Alert alert={alertTitle} />
                        </div>
                    </div>
                    <div className='row'>
                        <label className="col-sm-12 col-form-label">
                            Số tiền
                        </label>
                        <div className="col-sm-12">
                            <div className="input-group"  >
                                <div className="form-control input-currency-container">
                                    <CurrencyFormat value={init ? initCost : cost}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        onValueChange={(values) => {
                                            const { value } = values;
                                            // formattedValue = $2,223
                                            // value ie, 2223
                                            if (init) {
                                                setInit(false);
                                            }
                                            setCost(value);
                                        }}
                                    />
                                </div>
                                <div className="input-group-append">
                                    <div className='btn btn-append-vnd'>
                                        vnđ
                                </div>
                                </div>
                            </div>
                            <Alert alert={alertCost} />
                        </div>
                    </div>

                    <div className="row">
                        <label className="col-sm-12 col-form-label">
                            Ghi chú
                        </label>
                        <div className="col-sm-12">
                            <textarea type="text" className="form-control" placeholder="Ghi chú"
                                rows='2'
                                ref={inputDescription}
                                defaultValue={initDescription}
                            />
                            <Alert alert={alertDescription} />
                        </div>
                    </div>
                    <Alert alert={alertResult} />

                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={saveExpense} >Lưu</button>
                <button className="btn btn-light" onClick={hideModal} >Đóng</button>
            </Modal.Footer>
        </Modal>
    );
}
const validateData = (title, cost, description) => {
    let msg = {};
    const minCost = 1000;
    const maxCost = 5 * 100 * 1000000;
    //Title
    if (title.length === 0) {
        msg.title = 'Xin nhập chi phí';
    } else if (title.length > 100) {
        msg.title = 'Chi phí không quá 100 kí tự';
    }
    //Cost
    let costStr = cost + '';
    if (costStr.length === 0) {
        msg.cost = 'Xin nhập số tiền';
    } else {
        const costNumber = parseFloat(costStr);
        if (costNumber > maxCost) {
            msg.cost = 'Chi phí không quá 500 triệu, bạn nên chia nhỏ chi phí của mình ra.';
        } else if (cost < minCost) {
            msg.cost = 'Chi phí không được nhỏ hơn 1,000đ';
        }
    }
    //Description
    if (description.length > 500) {
        msg.description = 'Ghi chú không quá 500 kí tự';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default MyCampaignExpenseModal;