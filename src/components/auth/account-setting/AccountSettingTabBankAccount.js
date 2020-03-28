import React from 'react';

const AccountSettingTabBankAccount = () => {

    const inputAccountNumber = React.createRef();
    const inputBankName = React.createRef();
    const inputBankAgency = React.createRef();

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
                            // defaultValue={user.fullname ? user.fullname : ''}
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
                            // defaultValue={bankAccount.accountNumber ? bankAccount.accountNumber : ''}
                            ref={inputAccountNumber}
                        />
                        {/* <Alert alert={alertAccountNumber} /> */}
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Ngân hàng
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Ngân hàng"
                            // defaultValue={bankAccount.bankName ? bankAccount.bankName : ''}
                            ref={inputBankName}
                        />
                        {/* <Alert alert={alertBankName} /> */}
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Chi nhánh ngân hàng
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Chi nhánh ngân hàng"
                            // defaultValue={bankAccount.bankAgency ? bankAccount.bankAgency : ''}
                            ref={inputBankAgency}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12' style={{textAlign: 'center', paddingTop: '12px'}}>
                        <button className="btn btn-primary"
                            // onClick={createStep4}
                        >Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AccountSettingTabBankAccount;