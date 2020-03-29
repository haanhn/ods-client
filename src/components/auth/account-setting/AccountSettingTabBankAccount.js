import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import { validateBankAccount } from '../../../utils/authUtils';
import Alert from '../../common/Alert';

const AccountSettingTabBankAccount = () => {
    const authContext = useContext(AuthContext);

    const initBankAccount = authContext.bankAccount ? authContext.bankAccount : {};
    const accountName = initBankAccount.accountName ? initBankAccount.accountName : '';
    const initAccountNumber = initBankAccount.accountNumber ? initBankAccount.accountNumber : '';
    const initBankName = initBankAccount.bankName ? initBankAccount.bankName : '';   
    const initBankAgency = initBankAccount.bankAgency ? initBankAccount.bankAgency : '';   

    const inputAccountNumber = React.createRef();
    const inputBankName = React.createRef();
    const inputBankAgency = React.createRef();

    //State Alerts
    const [alertAccountNumber, setAlertAccountNumber] = useState(null);
    const [alertBankName, setAlertBankName] = useState(null);
    const [alertBankAgency, setAlertBankAgency] = useState(null);
    const [alertResult, setAlertResult] = useState(null);

    const updateBankAccount = async (event) => {
        event.preventDefault();
        const accountNumber = inputAccountNumber.current.value.trim();
        const bankName = inputBankName.current.value.trim();
        const bankAgency = inputBankAgency.current.value.trim();

        setAlertAccountNumber(null);
        setAlertBankName(null);
        setAlertBankAgency(null);
        setAlertResult(null);

        const messages = validateBankAccount(accountNumber, bankName, bankAgency);
        if (messages) {
            if (messages.accountNumber) {
                setAlertAccountNumber({ type: 'danger', msg: messages.accountNumber });
            }
            if (messages.bankName) {
                setAlertBankName({ type: 'danger', msg: messages.bankName });
            }
            if (messages.bankAgency) {
                setAlertBankAgency({ type: 'danger', msg: messages.bankAgency });
            }
        } else {
            const result = await authContext.updateBankAccount(accountNumber, bankName, bankAgency);
            if (result === true) {
                setAlertResult({ type: 'success', msg: 'Cập nhật thành công' });
            } else {
                setAlertResult({ type: 'danger', msg: 'Cập nhật thất bại, xin thử lại' });
            }
        }
    }

    return (
        <div>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Tên tài khoản <i class="fas fa-info-circle icon-small theme_color"
                            style={{ padding: '0 7px' }}
                        // onClick={showTipsStory} 
                        ></i>
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tên tài khoản"
                            defaultValue={accountName} disabled />
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Số tài khoản
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Số tài khoản"
                            defaultValue={initAccountNumber}
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
                            defaultValue={initBankName}
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
                            defaultValue={initBankAgency}
                            ref={inputBankAgency}
                        />
                        <Alert alert={alertBankAgency} />
                        <Alert alert={alertResult} />
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12' style={{textAlign: 'center', paddingTop: '12px'}}>
                        <button className="btn btn-primary"
                            onClick={updateBankAccount}
                        >Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AccountSettingTabBankAccount;