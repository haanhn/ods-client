import React, { useState, useContext, useEffect, Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import { routes, localStoreKeys, odsBase, odsAPIRegions } from '../../../odsApi';
import Alert from '../../common/Alert';
import { getRegionsByName } from '../../../utils/regionUtils';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import '../../css/create-campaign.css';
import axios from 'axios';

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
    //For cash
    const inputAddress = React.createRef();
    const inputRegion = React.createRef();
    const inputPhone = React.createRef();

    //States for data
    const [regions, setRegions] = useState(null);
    //States for alert & loading
    const [alertMoney, setAlertMoney] = useState(null);
    const [alertName, setAlertName] = useState(null);
    const [alertEmail, setAlertEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    //States for alert method cash
    const [alertPhone, setAlertPhone] = useState(null);
    const [alertAddress, setAlertAddress] = useState(null);


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
        //For cash
        let phone = '';
        let address = '';
        let regionId = null;
        if (method === 'cash') {
            phone = inputPhone.current.value;
            address = inputAddress.current.value;
            regionId = inputRegion.current.value;
        }

        setAlertMoney(null);
        setAlertName(null);
        setAlertEmail(null);
        //For cash
        setAlertAddress(null);
        setAlertPhone(null);
        
        const messages = validateData(money, name, email, method, phone, address);
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
            //For cash
            if (messages.phone) {
                setAlertPhone({ type: 'danger', msg: messages.phone });
            }
            if (messages.address) {
                setAlertAddress({ type: 'danger', msg: messages.address });
            }
        } else {
            const campaignId = campaignsContext.viewingCampaign.id;
            if (method === 'paypal') {
                console.log(method + ' ' + money)
                setLoading(true);
                await donatePaypal(campaignId, money, name, email, anonymous, noti, message);
                setLoading(false);
            } else {
                setLoading(true);
                const res = await sendDonate(campaignId, method, money, name, email, anonymous, noti, message, phone, address, regionId);
                console.log(res);
                setLoading(false);
            }

        }
    }

    if (!method) {
        const route = routes.getRouteDonateCampaign(slug);
        history.replace(route);
    }

    let regionsJsx = null;
    if (regions) {
        regionsJsx =
            regions.map((region) => {
                return (
                    <option value={region.id} key={region.id}>{region.name}</option>
                );
            });
    }

    useEffect(() => {
        fetchDataIfCash();
    }, []);

    const fetchDataIfCash = async () => {
        if (method && method === 'cash') {
            try {
                const resRegions = await axios.get(`${odsBase}${odsAPIRegions}`);
                let regionsData = resRegions.data.regions;
                regionsData = getRegionsByName('Hồ Chí Minh', regionsData);
                setRegions(regionsData);
            } catch (error) {
                console.error(error);
            }
        }
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

                {method === 'cash' ? (
                    <Fragment>
                        <div className="row">
                            <label className="col-sm-12 col-form-label">Số điện thoại</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control" placeholder="Số điện thoại liên hệ"
                                    ref={inputPhone} />
                                <Alert alert={alertPhone} />
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-12 col-form-label">Địa chỉ</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control" placeholder="Địa chỉ liên hệ"
                                    ref={inputAddress} />
                                <Alert alert={alertAddress} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-12 col-form-label">
                                Tỉnh thành:
                                <i style={{ fontSize: '90%' }}> (Phương thức thanh toán tại nhà chỉ hỗ trợ ở TP.HCM, phí dịch vụ là 15,000đ)</i>
                            </label>
                            <div className="col-sm-12">
                                <select className="custom-select" ref={inputRegion} >
                                    {regionsJsx}
                                </select>
                            </div>
                        </div>
                    </Fragment>
                ) : null}

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

const validateData = (money, name, email, method, phone, address) => {
    let msg = {};
    //Validate Money
    const msgMoney = validateMoney(money, method);
    if (msgMoney) {
        msg.money = msgMoney;
    }
    //Validate Name
    if (name.length === 0) {
        msg.name = 'Xin nhập tên';
    } else if (name.length > 100) {
        msg.name = 'Tên không quá 100 kí tự';
    }
    //Validate Email
    if (email.length === 0) {
        msg.email = 'Xin nhập email';
    }
    //Validate for cash
    if (method === 'cash') {
        validateForCash(msg, phone, address);
    }
    //format.....
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

const validateMoney = (money, method) => {
    const goalMax = 3000000000;
    const min10K = 10000;
    const minPaypal = 20000;
    const minMoney = (method === 'paypal') ? minPaypal : min10K;
    const minMoneyFormat = (method === 'paypal') ? '20,000' : '10,000';
    let msgMoney = null;
    if (typeof money === 'number') {
        if (money > goalMax) {
            msgMoney = 'Hiện tại chúng tôi chỉ hỗ trợ quyên góp từ dưới 3 tỷ đồng';
        } else if (money < minMoney) {
            msgMoney = `Số tiền quyên góp tối thiểu là ${minMoneyFormat} vnđ`;
        }
    } else {
        if (money.length === 0) {
            msgMoney = 'Xin nhập số tiền quyên góp';
        } else {
            const moneyNumber = parseFloat(money);
            if (moneyNumber > goalMax) {
                msgMoney = 'Hiện tại chúng tôi chỉ hỗ trợ quyên góp từ dưới 3 tỷ đồng';
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

const validateForCash = (msg, phone, address) => {
    //Address
    if (address.length === 0) {
        msg.address = 'Xin nhập địa chỉ liên hệ của bạn';
    } else if (address.length > 200) {
        msg.address = 'Địa chỉ không quá 200 kí tự';
    }
    //Validate Phone
    if (phone.length === 0) {
        msg.phone = 'Xin nhập số điện thoại của bạn';
    } else if (phone.length > 15) {
        msg.phone = 'Số điện thoại không quá 15 kí tự';
    } else {
        const regex = new RegExp('^[0-9]+$');
        const valid = regex.test(phone);
        if (!valid) {
            msg.phone = 'Số điện thoại chỉ chứa các chữ số';
        }
    }
}