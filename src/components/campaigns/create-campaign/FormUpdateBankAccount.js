import React from 'react';

const FormUpdateBankAccount = () => {
    return (
        <div className='child'>
            <h5>Thông tin tài khoản ngân hàng <i class="fas fa-info-circle icon-small theme_color"
                        style={{ padding: '0 7px' }}
                        // onClick={showTipsStory} 
                        ></i> </h5>
            <form>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                    Tên chủ tài khoản
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tên chủ tài khoản"
                        />
                        {/* {alertTitle} */}
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                    Số tài khoản
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Số tài khoản"
                        />
                        {/* {alertTitle} */}
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                    Ngân hàng
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Ngân hàng"
                        />
                        {/* {alertTitle} */}
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                    Chi nhánh ngân hàng
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Chi nhánh ngân hàng"
                        />
                    </div>
                </div>

                <div className="row justify-content-end">
                    <div className='box-button'>
                        <button className="btn btn-outline-info"
                        // onClick={onClick}
                        >Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormUpdateBankAccount;
