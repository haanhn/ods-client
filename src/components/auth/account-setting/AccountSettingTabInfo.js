import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import Alert from '../../common/Alert';
import { localStoreKeys } from '../../../odsApi';

const AccountSettingTabInfo = () => {
    const authContext = useContext(AuthContext);
    const campaignsContext = useContext(CampaignsContext);

    const user = authContext.currentUser;
    const regions = campaignsContext.regions;

    const inputFullname = React.createRef();
    const inputAddress = React.createRef();
    const inputRegion = React.createRef();

    //State Alerts
    const [alertFullname, setAlertFullname] = useState(null);
    const [alertAddress, setAlertAddress] = useState(null);
    const [alertResult, setAlertResult] = useState(null);

    const updateUserInfo = async (event) => {
        event.preventDefault();
        const fullname = inputFullname.current.value.trim();
        const address = inputAddress.current.value.trim();
        let region = inputRegion.current.value;

        setAlertFullname(null);
        setAlertAddress(null);
        setAlertResult(null);

        const messages = validateData(fullname, address);
        if (messages !== null) {
            if (messages.fullname) {
                setAlertFullname({ type: 'danger', msg: messages.fullname });
            }
            if (messages.address) {
                setAlertAddress({ type: 'danger', msg: messages.address });
            }
        } else {
            if (!region) {
                region = regions[0].name;
            }
            const res = await authContext.updateUser(fullname, address, region);
            if (res === true) {
                localStorage.setItem(localStoreKeys.fullname, fullname);
                setAlertResult({ type: 'success', msg: 'Cập nhật thành công' });
            } else {
                setAlertResult({ type: 'danger', msg: 'Cập nhật thất bại, xin thử lại' });
            }
        }
    }

    let regionsJsx = null;
    if (regions) {
        regionsJsx =
            regions.map((region) => {
                return (user.regionId === region.id ?
                    <option value={region.id} key={region.id} selected>
                        {region.name}
                    </option> :
                    <option value={region.id} key={region.id}>{region.name}</option>
                );
            });
    }

    return (
        <div>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Họ tên
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Họ tên"
                            defaultValue={user && user.fullname ? user.fullname : ''}
                            ref={inputFullname}
                        />
                        <Alert alert={alertFullname} />
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Địa chỉ liên hệ
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ liên hệ"
                            defaultValue={user && user.address ? user.address : ''}
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
                    <div className='col-sm-12' style={{ textAlign: 'center', paddingTop: '12px' }}>
                        <Alert alert={alertResult} />
                        <button className="btn btn-primary"
                            onClick={updateUserInfo}
                        >Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const validateData = (fullname, address) => {
    let msg = {};
    //Fullname
    if (fullname.length === 0) {
        msg.fullname = 'Xin nhập họ tên';
    } else if (fullname.length > 100) {
        msg.fullname = 'Họ tên không quá 100 kí tự';
    }
    //Address
    if (address.length === 0) {
        msg.address = 'Xin nhập địa chỉ';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default AccountSettingTabInfo;