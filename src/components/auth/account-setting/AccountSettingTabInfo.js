import React from 'react';

const AccountSettingTabInfo = () => {

    const inputEmail = React.createRef();
    const inputFullname = React.createRef();
    const inputAddress = React.createRef();
    const inputRegion = React.createRef();

    return (
        <div>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ liên hệ"
                            // defaultValue={defaultAddress()}
                            ref={inputEmail}
                        />
                        {/* <Alert alert={alertAddress} /> */}
                    </div>
                </div>
                {/* {regionsJsx ?
                    (<div className="row">
                        <label className="col-sm-12 col-form-label">Tỉnh thành</label>
                        <div className="col-sm-12">
                            <select className="custom-select" ref={inputRegion} >
                                {regionsJsx}
                            </select>
                        </div>
                    </div>)
                    : null
                } */}

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Họ tên <i class="fas fa-info-circle icon-small theme_color"
                            style={{ padding: '0 7px' }}
                        // onClick={showTipsStory} 
                        ></i>
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Họ tên"
                            // defaultValue={user.fullname ? user.fullname : ''}
                            ref={inputFullname}
                        />
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Địa chỉ liên hệ<i class="fas fa-info-circle icon-small theme_color"
                            style={{ padding: '0 7px' }}
                        // onClick={showTipsStory} 
                        ></i>
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ liên hệ"
                            // defaultValue={defaultAddress()}
                            ref={inputAddress}
                        />
                        {/* <Alert alert={alertAddress} /> */}
                    </div>
                </div>
                {/* {regionsJsx ?
                    (<div className="row">
                        <label className="col-sm-12 col-form-label">Tỉnh thành</label>
                        <div className="col-sm-12">
                            <select className="custom-select" ref={inputRegion} >
                                {regionsJsx}
                            </select>
                        </div>
                    </div>)
                    : null
                } */}
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

export default AccountSettingTabInfo;