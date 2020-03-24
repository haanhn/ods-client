import React, { useState, useContext } from 'react';
import CurrencyFormat from 'react-currency-format';
import { routes, localStoreKeys } from '../../../odsApi';
import Alert from '../../common/Alert';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import '../../css/create-campaign.css';

const FormDonateCashOrBanking = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { slug } = props.match.params;
    const history = props.history;

    const { method, sendDonate, donatePaypal } = props;
    const defaultData = getDefaultData(method);

    const [money, setMoney] = useState(defaultData.money);
    const inputName = React.createRef();
    const inputAnonymous = React.createRef();
    const inputEmail = React.createRef();
    const inputNoti = React.createRef();
    const inputMessage = React.createRef();


    const [alertMoney, setAlertMoney] = useState(null);
    const [alertName, setAlertName] = useState(null);
    const [alertEmail, setAlertEmail] = useState(null);
    const [loading, setLoading] = useState(false);

    //Jsx
    let nameJsx = <input type="text" className="form-control" placeholder="Tên"
        ref={inputName} />;
    let emailJsx = <input type="email" className="form-control" placeholder="Email"
        ref={inputEmail} />
    if (localStorage.getItem(localStoreKeys.token)) {
        nameJsx = <input type="text" className="form-control" placeholder="Tên"
            value={defaultData.name} ref={inputName}
            disabled />;
        emailJsx = <input type="text" className="form-control" placeholder="Email"
            value={defaultData.email} ref={inputEmail}
            disabled />
    }




    const donate = async (event) => {
        event.preventDefault();

        const name = inputName.current.value;
        const anonymous = inputAnonymous.current.checked;
        const email = inputEmail.current.value;
        const noti = inputNoti.current.checked;
        const message = inputMessage.current.value;

        setAlertMoney(null);
        setAlertName(null);
        setAlertEmail(null);
        const messages = validateData(money, name, email, method);
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
        } else {
            const campaignId = campaignsContext.viewingCampaign.id;
            if (method === 'paypal') {
                console.log(method + ' ' + money)
                setLoading(true);
                await donatePaypal(campaignId, money, name, anonymous, noti, message);
                setLoading(false);
            } else {
                setLoading(true);
                const res = await sendDonate(campaignId, method, money, name, email, anonymous, noti, message);
                setLoading(false);
            }

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

                <div className="form-group row">
                    <label className="col-sm-12 col-form-label">Tên</label>
                    <div className="col-sm-12">
                        {nameJsx}
                        <Alert alert={alertName} />
                    </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" ref={inputAnonymous} />
                    <label className="form-check-label">Ẩn danh</label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-12 col-form-label">Email</label>
                    <div className="col-sm-12">
                        {emailJsx}
                        <Alert alert={alertEmail} />
                    </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" ref={inputNoti} />
                    <label className="form-check-label">Nhận thông báo của chiến dịch</label>
                </div>

                <div className="form-group row">
                    <label className="col-sm-12 col-form-label">Gửi lời nhắn</label>
                    <div className='col-sm-12'>
                        <textarea className="form-control" rows="3" placeholder='Gửi lời nhắn'
                            ref={inputMessage}>
                        </textarea>
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
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormDonateCashOrBanking;

const validateData = (money, name, email, method) => {
    let msg = {};
    //Validate Money
    const msgMoney = validateMoney(money, method);
    if (msgMoney) {
        msg.money = msgMoney;
    }
    //Validate Name
    if (name.length === 0) {
        msg.name = 'Xin nhập tên';
    }
    //Validate Email
    if (email.length === 0) {
        msg.email = 'Xin nhập email';
    }
    //format.....
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

const validateMoney = (money, method) => {
    const goal10M = 10000000000;
    const min10K = 10000;
    const minPaypal = 20000;
    const minMoney = (method === 'paypal') ? minPaypal : min10K;
    const minMoneyFormat = (method === 'paypal') ? '20,000' : '10,000';
    let msgMoney = null;
    if (typeof money === 'number') {
        if (money > goal10M) {
            msgMoney = 'Hiện tại chúng tôi chỉ hỗ trợ quyên góp dưới 10 tỷ đồng';
        } else if (money < minMoney) {
            msgMoney = `Số tiền quyên góp tối thiểu là ${minMoneyFormat} vnđ`;
        }
    } else {
        if (money.length === 0) {
            msgMoney = 'Xin nhập số tiền quyên góp';
        } else {
            const moneyNumber = parseFloat(money);
            if (moneyNumber > goal10M) {
                msgMoney = 'Hiện tại chúng tôi chỉ hỗ trợ quyên góp dưới 10 tỷ đồng';
            } else if (moneyNumber < minMoney) {
                msgMoney = `Số tiền quyên góp tối thiểu là ${minMoneyFormat} vnđ`;
            }
        }
    }
    return msgMoney;
}

const getDefaultData = (method) => {
    let defaultData = {
        name: '',
        email: '',
        money: 10000
    };
    if (method === 'paypal') {
        defaultData.money = 20000;
    }
    const token = localStorage.getItem(localStoreKeys.token);
    if (token) {
        defaultData.name = localStorage.getItem(localStoreKeys.userFullname);
        defaultData.email = localStorage.getItem(localStoreKeys.userEmail);
    }
    return defaultData;
}