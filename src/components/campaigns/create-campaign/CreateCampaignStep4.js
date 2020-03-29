import React, { useState, useContext } from 'react';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import Alert from '../../common/Alert';

const CreateCampaignStep4 = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { regions } = campaignsContext;
    const { user, bankAccount, createCampaignStep4 } = props;

    const defaultAddress = () => {
        if (user) {
            if (user.address) {
                return user.address;
            }
        }
        return '';
    }

    let inputAddress = React.createRef();
    let inputRegion = React.createRef();
    let inputAccountNumber = React.createRef();
    let inputBankName = React.createRef();
    let inputBankAgency = React.createRef();

    //State Alerts
    const [alertAddress, setAlertAddress] = useState(null);
    const [alertAccountNumber, setAlertAccountNumber] = useState(null);
    const [alertBankName, setAlertBankName] = useState(null);

    let regionsJsx = null;
    if (regions) {
        regionsJsx =
            regions.map((region) => {
                return (user.region == region.name ?
                    <option value={region.name} key={region.name} selected>
                        {region.name}
                    </option> :
                    <option value={region.name} key={region.name}>{region.name}</option>
                );
            });
    }

    const createStep4 = (event) => {
        event.preventDefault();
        const address = inputAddress.current.value;
        let region = inputRegion.current.value;
        const accountNumber = inputAccountNumber.current.value;
        const bankName = inputBankName.current.value;
        const bankAgency = inputBankAgency.current.value;

        setAlertAddress(null);
        setAlertAccountNumber(null);
        setAlertBankName(null);

        const messages = validateData(address, accountNumber, bankName);
        if (messages !== null) {
            if (messages.address) {
                setAlertAddress({ type: 'danger', msg: messages.address });
            }
            if (messages.accountNumber) {
                setAlertAccountNumber({ type: 'danger', msg: messages.accountNumber });
            }
            if (messages.bankName) {
                setAlertBankName({ type: 'danger', msg: messages.bankName });
            }
        } else {
            console.log(`yayyyyyyyyyyyyyyyyyyyyyyy`);
            if (!region) {
                region = regions[0].name;
            }
            createCampaignStep4(address, region, accountNumber, bankName, bankAgency);

        }
    }

    return (
        <div className='create-campaign-methods' >
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Địa chỉ liên hệ<i class="fas fa-info-circle icon-small theme_color"
                            style={{ padding: '0 7px' }}
                        // onClick={showTipsStory} 
                        ></i>
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ liên hệ"
                            defaultValue={defaultAddress()}
                            ref={inputAddress}
                        />
                        <Alert alert={alertAddress} />
                    </div>
                </div>
                {regionsJsx ?
                    (<div className="row">
                        <label className="col-sm-12 col-form-label">Tỉnh thành</label>
                        <div className="col-sm-12">
                            <select className="custom-select" ref={inputRegion} >
                                {regionsJsx}
                            </select>
                        </div>
                    </div>)
                    : null
                }

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Tên tài khoản <i class="fas fa-info-circle icon-small theme_color"
                            style={{ padding: '0 7px' }}
                        // onClick={showTipsStory} 
                        ></i>
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tên tài khoản"
                            defaultValue={user.fullname ? user.fullname : ''}
                            disabled
                        />
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Số tài khoản
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Số tài khoản"
                            defaultValue={bankAccount.accountNumber ? bankAccount.accountNumber : ''}
                            ref={inputAccountNumber}
                        />
                        <Alert alert={alertAccountNumber} />
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Ngân hàng
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Ngân hàng"
                            defaultValue={bankAccount.bankName ? bankAccount.bankName : ''}
                            ref={inputBankName}
                        />
                        <Alert alert={alertBankName} />
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Chi nhánh ngân hàng
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Chi nhánh ngân hàng"
                            defaultValue={bankAccount.bankAgency ? bankAccount.bankAgency : ''}
                            ref={inputBankAgency}
                        />
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className='box-button'>
                        <button className="btn btn-primary"
                            onClick={createStep4}
                        >Lưu và tiếp tục</button>
                    </div>
                </div>
            </form>

            {/* <FormUpdateAddress /> */}
            {/* <FormUpdateBankAccount /> */}

        </div>
    );
}

const validateData = (address, accountNumber, bankName) => {
    let msg = {};
    //Address
    if (address.length === 0) {
        msg.address = 'Xin nhập địa chỉ liên hệ của bạn';
    } else if (address.length > 200) {
        msg.address = 'Địa chỉ không quá 200 kí tự';
    }
    //Account number
    if (accountNumber.length === 0) {
        msg.accountNumber = 'Xin nhập số tài khoản ngân hàng';
    } else if (accountNumber.length > 22) {
        msg.accountNumber = 'Số tài khoản ngân hàng không đúng';
    } else {
        const regex = new RegExp('^[0-9]+$');
        const valid = regex.test(accountNumber);
        if (!valid) {
            msg.accountNumber = 'Số tài khoản ngân hàng chỉ chứa các chữ số';
        }
    }
    //Bank name
    if (bankName.length === 0) {
        msg.bankName = 'Xin nhập tên ngân hàng';
    } else if (bankName.length > 100) {
        msg.bankName = 'Tên ngân hàng không quá 100 kí tự';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default CreateCampaignStep4;
