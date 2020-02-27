import React, { useState } from 'react';
import axios from 'axios';

const DonateCampaign = () => {
    //validate (if viewingCampaign === null) => search campaign or get page campaign (based on url...)
    const inputMoney = React.createRef();
    const inputName = React.createRef();
    const inputAnnonymous = React.createRef();
    const inputEmail = React.createRef();
    const inputNoti = React.createRef();
    const inputMessage = React.createRef();

    const [alertMoney, setAlertMoney] = useState(null);
    const [alertName, setAlertName] = useState(null);
    const [alertEmail, setAlertEmail] = useState(null);

    const bankingMethod = (event) => {
        event.preventDefault();
        const money = inputMoney.current.value;
        const name = inputName.current.value;
        const annonymous = inputAnnonymous.current.value;
        const email = inputEmail.current.value;
        const noti = inputNoti.current.value;
        const message = inputMessage.current.value;

        const messages = validateData(money, name, email);
        if (messages !== null) {
            if (messages.money !== null) {
                setAlertMoney(alertJsx(messages.money));
            }
            if (messages.name !== null) {
                setAlertName(alertJsx(messages.name));
            }
            if (messages.email !== null) {
                setAlertEmail(alertJsx(messages.email));
            }
        } else {
            // axios.post('http://localhost:3001/campaign/id')
            // (async () => {
            //     await getAbc();
            //     console.log();
            // })();
            alert('Cảm ơn bạn đã đăng ký ủng hộ, xin hãy check mail để biết thêm chi tiết');
        }
    }

    // const foo = async () => {
    //     await getAbc();
    //     console.log();
    // }

    return (
        <div className='container'>
            <h3>Đóng góp _Chiến dịch ABC_</h3>
            <h5>Sự chia sẻ của bạn rất quý giá đối với _Người nhận_</h5>
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Số tiền</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" placeholder="Số tiền"
                            ref={inputMoney} />
                        {alertMoney}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Tên</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Tên"
                            ref={inputName} />
                        {alertName}
                    </div>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" ref={inputAnnonymous} />
                    <label class="form-check-label">Ẩn danh</label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Email"
                            ref={inputEmail} />
                        {alertEmail}
                    </div>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" ref={inputNoti} />
                    <label class="form-check-label">Nhận thông báo của chiến dịch</label>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Gửi lời nhắn</label>
                    <div className='col-sm-10'>
                        <textarea className="form-control" rows="3" placeholder='Gửi lời nhắn'
                            ref={inputMessage}>
                        </textarea>
                    </div>
                </div>

                <div className="form-group row">
                    <div>
                        <button className="btn btn-primary" onClick={bankingMethod} >Chuyển khoản ngân hàng</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DonateCampaign;

const validateData = (money, name, email) => {
    let msg = {};
    const moneyNumber = parseFloat(money);
    if (money.length === 0) {
        msg.money = 'Xin nhập số tiền';
        console.log(moneyNumber);
    } else if (Number.isNaN(moneyNumber) || moneyNumber <= 0) {
        msg.money = 'Số tiền phải là số lớn hơn 0';
    }
    if (name.length === 0) {
        msg.name = 'Xin nhập tên';
    }
    if (name.email === 0) {
        msg.email = 'Xin nhập email';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

const alertJsx = (msg) => {
    return <p style={{ color: 'red' }}>{msg}</p>
}