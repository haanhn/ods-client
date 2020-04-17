import React, { useState, useContext } from 'react';
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
// import addDays from 'date-fns/addDays';
import addBusinessDays from 'date-fns/addBusinessDays'
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import "react-datepicker/dist/react-datepicker.css";
import Alert from '../../common/Alert';
import CommonModal from './create-campaign-modal-suggest/CommonModal';
import { tipsForGoal, tipsForAutoClose } from './create-campaign-modal-suggest/tipsModal';

const CreateCampaignStep3 = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { regions } = campaignsContext;
    const { campaign, loading, createCampaignStep3 } = props;

    let inputAddress = React.createRef();
    let inputRegion = React.createRef();
    const inputAutoClose = React.createRef();

    //State
    const initGoal = campaign && campaign.goal ? campaign.goal : 1000000;
    const initEndDate = campaign && campaign.endDate ? campaign.endDate : null;
    const [goal, setGoal] = useState(initGoal);
    const [endDate, setEndDate] = useState(initEndDate);
    //State Alerts
    const [alertAddress, setAlertAddress] = useState(null);
    const [alertGoal, setAlertGoal] = useState(null);
    const [alertEndDate, setAlertEndDate] = useState(null);
    // Alet result when update fail
    const [alertResult, setAlertResult] = useState(null);
    //State for suggestions
    const [showingModalGoal, setShowingModalGoal] = useState(false);
    const [showingModalAutoClose, setShowingModalAutoClose] = useState(false);

    let regionsJsx = null;
    if (regions) {
        regionsJsx =
            regions.map((region) => {
                return (campaign.campaignRegion === region.id ?
                    <option value={region.id} key={region.id} selected>
                        {region.name}
                    </option> :
                    <option value={region.id} key={region.id}>{region.name}</option>
                );
            });
    }

    const createStep3 = async (event) => {
        event.preventDefault();
        const address = inputAddress.current.value.trim();
        let region = inputRegion.current.value;
        const autoClose = inputAutoClose.current.checked;

        setAlertAddress(null);
        setAlertGoal(null);
        setAlertEndDate(null);
        setAlertResult(null);

        const messages = validateData(address, goal, endDate);
        if (messages) {
            if (messages.address) {
                setAlertAddress({ type: 'danger', msg: messages.address });
            }
            if (messages.goal) {
                setAlertGoal({ type: 'danger', msg: messages.goal });
            }
            if (messages.endDate) {
                setAlertEndDate({ type: 'danger', msg: messages.endDate });
            }
        } else {
            if (!region) {
                region = regions[0].id;
            }
            const result = await createCampaignStep3(address, region, goal, endDate, autoClose);
            if (result === false) {
                setAlertResult({ type: 'danger', msg: 'Lưu thất bại, xin hãy thử lại' });
            }
        }
    }

    return (

        <div className='create-campaign-details'>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Nơi thực hiện chiến dịch
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ chiến dịch"
                            // value={title} onChange={updateTitle} 
                            defaultValue={campaign.address}
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
                        Mục tiêu
                        <i class="fas fa-info-circle icon-small theme_color"
                            onClick={() => setShowingModalGoal(true)}
                            style={{ padding: '0 7px' }} ></i>
                    </label>
                    <div className="col-sm-12">
                        <div className="input-group"  >
                            <div className="form-control input-currency-container">
                                <CurrencyFormat value={goal}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        setGoal(value);
                                    }}
                                />
                            </div>
                            <div className="input-group-append">
                                <div className='btn btn-append-vnd'>
                                    vnđ
                                </div>
                            </div>
                        </div>
                        <Alert alert={alertGoal} />
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Ngày kết thúc
                    </label>
                    <div className="col-sm-12">
                        <div className="input-group">
                            <div className="form-control">
                                <DatePicker
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    minDate={addBusinessDays(new Date(), 3)}
                                    placeholderText="mm/dd/yyyy"
                                    showDisabledMonthNavigation
                                />
                            </div>
                            <div className="input-group-append">
                                <div className='btn btn-append-vnd'>
                                    <i className="far fa-calendar-alt "></i>
                                </div>
                            </div>
                        </div>
                        <Alert alert={alertEndDate} />
                    </div>
                </div>

                <div className="form-check" style={{ paddingTop: '7px' }}>
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                            ref={inputAutoClose}
                            defaultChecked={campaign ? campaign.autoClose : true}
                        />
                        Tự đóng khi đạt được mục tiêu
                    </label>
                    <i class="fas fa-info-circle icon-small theme_color"
                        onClick={() => setShowingModalAutoClose(true)}
                        style={{ padding: '0 7px' }} ></i>
                </div>

                <Alert alert={alertResult} />

                <div className="row justify-content-end">
                    <div className='box-button'>
                        {loading ? (
                            <button class="btn btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm"></span>
                                &nbsp; Đang lưu...
                            </button>) : (
                                <button className="btn btn-primary" onClick={createStep3}>Lưu và tiếp tục</button>
                            )}
                    </div>
                </div>
            </form>

            <CommonModal showingModal={showingModalGoal} setShowingModal={setShowingModalGoal}
                title='Cách chọn mục tiêu' message={tipsForGoal} />
            <CommonModal showingModal={showingModalAutoClose} setShowingModal={setShowingModalAutoClose}
                title='' message={tipsForAutoClose} />

        </div>
    )
}

const validateData = (address, goal, endDate) => {
    let msg = {};
    const goalMax = 3000000000;
    const goalMin = 100000;
    //Address
    if (address.length === 0) {
        msg.address = 'Xin nhập nơi thực hiện chiến dịch';
    } else if (address.length > 200) {
        msg.address = 'Địa chỉ không quá 200 kí tự';
    }
    //Goal
    let goalStr = goal + '';
    if (goalStr.length === 0) {
        msg.goal = 'Xin nhập mục tiêu';
    } else {
        const goalNumber = parseFloat(goalStr);
        if (goalNumber > goalMax) {
            msg.goal = 'Chúng tôi chỉ hỗ trợ mục tiêu từ dưới 3 tỷ đồng';
        } else if (goal < goalMin) {
            msg.goal = 'Mục tiêu cần lớn hơn 100,000 đồng';
        }
    }
    //endDate
    if (!endDate) {
        msg.endDate = 'Xin nhập ngày kết thúc';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default CreateCampaignStep3;