import React, { useState, useContext } from 'react';
import CurrencyFormat from 'react-currency-format';
import Alert from '../../common/Alert';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';

const HostCreateOutsideDonation = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const { updateDataLoading } = myCampaignsContext;

    const [money, setMoney] = useState(20000);
    const inputName = React.createRef();
    const inputAnonymous = React.createRef();

    //State: Alerts
    const [alertMoney, setAlertMoney] = useState(null);
    const [alertName, setAlertName] = useState(null);
    const [result, setResult] = useState(false);
    const [alertResult, setAlertResult] = useState(null);

    const saveDonation = async () => {
        const name = inputName.current.value.trim();
        const anonymous = inputAnonymous.current.checked;

        setAlertMoney(null);
        setAlertName(null);

        const messages = validateData(name, money);
        if (messages) {
            if (messages.name) {
                setAlertName({ type: 'danger', msg: messages.name });
            }
            if (messages.money) {
                setAlertMoney({ type: 'danger', msg: messages.money });
            }
        } else {
            const result = await myCampaignsContext.createOutsideDonation(name, money, anonymous);
            if (result === true) {
                setResult(true);
                setAlertResult({ type: 'success', msg: 'Tạo quyên góp thành công' });
            } else if (result === false) {
                setAlertResult({ type: 'danger', msg: 'Tạo quyên góp thất bại, xin thử lại' });
            }
        }
    }

    const resetDonation = () => {
        setResult(false);
        setAlertResult(null);
        try {
            const inputIdName = document.getElementById('donationOutsideName');
            const inputIdAnonymous = document.getElementById('donationOutsideAnonymous');
            inputIdName.value = '';
            inputIdAnonymous.checked = false;
            setMoney(20000);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='host-create-outside-donation' >
            <div className='host-create-outside-donation-content' >
                <h5 style={{fontSize: '105%', paddingBottom: '7px', marginBottom: '5px', borderBottom: '1px #dddddd solid'}} >
                    <b>Tạo quyên góp nhận từ bên ngoài</b>
                </h5>
                <form>
                    <div className="row">
                        <label className="col-sm-12 col-form-label">Tên người quyên góp</label>
                        <div className="col-sm-12">
                            <input type="text" className="form-control" placeholder="Tên người quyên góp"
                                defaultValue={''} ref={inputName} id='donationOutsideName' />
                            <Alert alert={alertName} />
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-sm-12 col-form-label">
                            Số tiền
                    </label>
                        <div className="col-sm-12">
                            <div className="input-group"  >
                                <div className="form-control input-currency-container">
                                    <CurrencyFormat value={money}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        onValueChange={(values) => {
                                            const { value } = values;
                                            // formattedValue = $2,223
                                            // value ie, 2223
                                            setMoney(value);
                                        }}
                                    />
                                </div>
                                <div className="input-group-append">
                                    <div className='btn btn-append-vnd'>
                                        vnđ
                                </div>
                                </div>
                            </div>
                            <Alert alert={alertMoney} />
                        </div>
                    </div>

                    <div className="form-check" style={{ paddingTop: '5px' }}>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" ref={inputAnonymous} 
                                id='donationOutsideAnonymous' />
                        Ẩn danh
                    </label>
                    </div>

                    <div className="row">
                        <div className="col-sm-12" style={{ textAlign: 'center' }}>
                            <Alert alert={alertResult} />
                            {!result && !updateDataLoading ? (
                                <button class="btn btn-success" type="button" onClick={saveDonation}>
                                    Tạo quyên góp
                                </button>
                            ) : (
                                    null
                                )}

                            {!result && updateDataLoading ? (
                                <button class="btn btn-success" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm"></span>
                                    &nbsp; Đang gửi...
                                </button>
                            ) : (
                                    null
                                )}
                            {result ? (
                                <button class="btn btn-outline-success" type="button" onClick={resetDonation}>
                                    Tạo quyên góp khác
                                </button>
                            ) : null}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
const validateData = (name, money) => {
    const minMoney = 1000;

    let msg = {};
    if (name.length === 0) {
        msg.name = 'Xin nhập tên người quyên góp';
    } else if (name.length > 30) {
        msg.name = 'Tên người quyên góp không quá 30 kí tự';
    }
    //Money
    let moneyStr = money + '';
    if (moneyStr.length === 0) {
        msg.money = 'Xin nhập số tiền';
    } else {
        const moneyNumber = parseFloat(moneyStr);
        if (moneyNumber < minMoney) {
            msg.money = 'Số tiền quyên góp cần lớn hơn 1,000 đồng';
        }
    }

    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}
export default HostCreateOutsideDonation;