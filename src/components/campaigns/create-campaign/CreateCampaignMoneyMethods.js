import React, { useState } from 'react';

const CreateCampaignMoneyMethods = (props) => {
    const { user, setUserAddress, setUserBankAccount, setCurrentStep } = props;

    //state
    const [address, setAddress] = useState(user.address);
    const [bankName, setBankName] = useState(user.bankAccount.bankName);
    const [bankAgency, setBankAgency] = useState(user.bankAccount.bankAgency);
    const [accountName, setAccountName] = useState(user.bankAccount.accountName);
    const [accountNumber, setAccountNumber] = useState(user.bankAccount.accountNumber);

    const updateAddress = (event) => {
        event.preventDefault();
        setUserAddress(address);
        alert('Cập nhật thành công');
    }
    
    const updateBankAccount = (event) => {
        event.preventDefault();
        setUserBankAccount({ bankName, bankAgency, accountName, accountNumber });
        alert('Cập nhật thành công');
    }

    const nextStep = () => {
        setCurrentStep(5);
    }

    return (
        <div className='money-methods'>
            <div className='money-method'>
                {/* <div>
                    <input type='checkbox' />
                    Nhận tiền mặt
                </div> */}
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Địa chỉ</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Địa chỉ"
                                defaultValue={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div>
                            <button className="btn btn-primary" onClick={updateAddress} >Cập nhật</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='money-method'>
                {/* <div>
                    <input type='checkbox' />
                    Nhận qua tài khoản ngân hàng
                </div> */}
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Tên chủ tài khoản</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Tên chủ tài khoản"
                                value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Số tài khoản</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Số tài khoản" 
                                value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Ngân hàng</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Ngân hàng" 
                                value={bankName} onChange={(e) => setBankName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Chi nhánh ngân hàng</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Chi nhánh ngân hàng" 
                                value={bankAgency} onChange={(e) => setBankAgency(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div>
                            <button className="btn btn-primary" onClick={updateBankAccount} >Cập nhật</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* <div className='money-method'>
                <div>
                    <input type='checkbox' />
                    Nhận qua Paypal
                </div>
            </div> */}
            <button className="btn btn-primary" onClick={nextStep} >Lưu và tiếp tục</button>
        </div>
    );
}

export default CreateCampaignMoneyMethods;