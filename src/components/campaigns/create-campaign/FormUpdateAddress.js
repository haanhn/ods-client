import React from 'react';

const FormUpdateAddress = () => {
    return (
        <div className='child'>
            <h5>Thông tin địa chỉ <i class="fas fa-info-circle icon-small theme_color"
                        style={{ padding: '0 7px' }}
                        // onClick={showTipsStory} 
                        ></i> </h5>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Địa chỉ
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ thường trú"
                        />
                        {/* {alertTitle} */}
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

export default FormUpdateAddress;