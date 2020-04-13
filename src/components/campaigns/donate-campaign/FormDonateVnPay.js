import React, { useState, useContext } from 'react';
import CurrencyFormat from 'react-currency-format';
import { routes, localStoreKeys } from '../../../odsApi';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import Alert from '../../common/Alert';
import { getDefaultData, validateMoney } from './FormDonateCashOrBanking';
import { checkOnLyAsciiWordAndDigit } from '../../../utils/commonUtils';
import '../../css/create-campaign.css';

const FormDonateVnPay = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { slug } = props.match.params;
    const history = props.history;

    const { method, donateVnPay } = props;
    const defaultData = getDefaultData(method);

    const [money, setMoney] = useState(defaultData.money);
    const inputBank = React.createRef();
    const inputName = React.createRef();
    const inputAnonymous = React.createRef();
    const inputEmail = React.createRef();
    const inputNoti = React.createRef();
    const inputMessage = React.createRef();


    const [alertMoney, setAlertMoney] = useState(null);
    const [alertName, setAlertName] = useState(null);
    const [alertEmail, setAlertEmail] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    //Jsx
    let emailJsx = <input type="email" className="form-control" placeholder="Email"
        ref={inputEmail} />
    if (localStorage.getItem(localStoreKeys.token)) {
        emailJsx = <input type="text" className="form-control" placeholder="Email"
            defaultValue={defaultData.email} ref={inputEmail}
            disabled />
    }
    let banksJsx = [];
    banksJsx.push(
        <option value='NCB' key='NCB' selected>
            Ngân hàng Quốc dân NCB
        </option>
    );

    const donate = async (event) => {
        event.preventDefault();

        const bankCode = inputBank.current.value;
        const name = inputName.current.value;
        const anonymous = inputAnonymous.current.checked;
        const email = inputEmail.current.value;
        const noti = inputNoti.current.checked;
        const message = inputMessage.current.value;

        setAlertMoney(null);
        setAlertName(null);
        setAlertEmail(null);
        setAlertMessage(null);
        const messages = validateData(money, name, email, message, method);
        if (messages) {
            if (messages.money) {
                setAlertMoney({ type: 'danger', msg: messages.money });
            }
            if (messages.name) {
                setAlertName({ type: 'danger', msg: messages.name });
            }
            if (messages.email) {
                setAlertEmail({ type: 'danger', msg: messages.email });
            }
            if (messages.message) {
                setAlertMessage({ type: 'danger', msg: messages.message });
            }
        } else {
            const campaignId = campaignsContext.viewingCampaign.id;
            console.log(method + ' ' + money)
            setLoading(true);
            await donateVnPay(campaignId, money, bankCode, name, email, anonymous, noti, message);
            setLoading(false);
        }
    }

    if (!method) {
        const route = routes.getRouteDonateCampaign(slug);
        history.replace(route);
    }

    return (
        <div>
            <form>
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
                <div className="row">
                    <label className="col-sm-12 col-form-label">Ngân hàng</label>
                    <div className="col-sm-12">
                        <select className="custom-select" ref={inputBank} >
                            {banksJsx}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-12 col-form-label">Tên</label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tên"
                            ref={inputName} />
                        <Alert alert={alertName} />
                    </div>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" ref={inputAnonymous} />
                        Ẩn danh
                    </label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-12 col-form-label">Email</label>
                    <div className="col-sm-12">
                        {emailJsx}
                        <Alert alert={alertEmail} />
                    </div>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" ref={inputNoti} />
                        Nhận thông báo của chiến dịch
                    </label>
                </div>

                <div className="form-group row">
                    <label className="col-sm-12 col-form-label">Gửi lời nhắn</label>
                    <div className='col-sm-12'>
                        <textarea className="form-control" rows="3" placeholder='Gửi lời nhắn'
                            ref={inputMessage}>
                        </textarea>
                        <Alert alert={alertMessage} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ textAlign: 'center' }}>
                        {loading ? (
                            <button class="btn btn-success" type="button" disabled>
                                <span class="spinner-border spinner-border-sm"></span>
                                &nbsp; Đang gửi...
                            </button>
                        ) : (
                                <button className="btn btn-success" style={{ minWidth: '120px' }} onClick={donate} >Xác nhận</button>
                            )}
                        {/* <button className="btn btn-success" style={{ minWidth: '120px' }} onClick={donate} >Xác nhận</button> */}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormDonateVnPay;

const validateData = (money, name, email, message, method) => {
    let msg = {};
    //Validate Money
    const msgMoney = validateMoney(money, method);
    if (msgMoney) {
        msg.money = msgMoney;
    }
    //Validate Name
    if (name.length === 0) {
        msg.name = 'Xin nhập tên';
    } else {
        const valid = checkOnLyAsciiWordAndDigit(name);
        if (valid !== true) {
            msg.name = 'Tên tiếng việt không dấu, không có kí tự đặc biệt';
        }
    }
    //Validate Email
    if (email.length === 0) {
        msg.email = 'Xin nhập email';
    }

    //Validate Message
    if (method === 'vnpay') {
        if (message.length > 50) {
            msg.message = 'Lời nhắn không quá 50 kí tự';
        } else if (message.length > 0) {
            const valid = checkOnLyAsciiWordAndDigit(message);
            if (valid !== true) {
                msg.message = 'Lời nhắn tiếng việt không dấu, không có kí tự đặc biệt và không xuống hàng';
            }
        }
    }

    //format.....
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}