import React, { useState, useContext } from 'react';
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
// import addDays from 'date-fns/addDays';
import addBusinessDays from 'date-fns/addBusinessDays'
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import "react-datepicker/dist/react-datepicker.css";
import Alert from '../../common/Alert';


const CreateCampaignDetails = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { regions } = campaignsContext;
    const { campaign, createCampaignStep3 } = props;

    let inputAddress = React.createRef();
    let inputRegion = React.createRef();

    //State
    const [goal, setGoal] = useState(campaign.goal);
    const [endDate, setEndDate] = useState(campaign.endDate);
    //State Alerts
    const [alertAddress, setAlertAddress] = useState(null);
    const [alertGoal, setAlertGoal] = useState(null);
    const [alertEndDate, setAlertEndDate] = useState(null);

    let regionsJsx = null;
    if (regions) {
        regionsJsx =
            regions.map((region) => {
                return (campaign.campaignRegion == region.name ?
                    <option value={region.name} key={region.name} selected>
                        {region.name}
                    </option> :
                    <option value={region.name} key={region.name}>{region.name}</option>
                );
            });
    }

    const createStep3 = (event) => {
        event.preventDefault();
        const address = inputAddress.current.value;
        let region = inputRegion.current.value;

        setAlertAddress(null);
        setAlertGoal(null);
        setAlertEndDate(null);

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
            console.log('Create step 3: data valid');
            console.log(region);
            if (!region) {
                region = regions[0].name;
            }
            createCampaignStep3(address, region, goal, endDate);
        }

    }

    return (

        <div className='create-campaign-details'>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Địa chỉ
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ"
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
                            data-toggle="modal" data-target="#modalTipsName"
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
                        {/* {alertTitle} */}
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

                <div className="row justify-content-end">
                    <div className='box-button'>
                        <button className="btn btn-primary"
                            onClick={createStep3}
                        >Lưu và tiếp tục</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const validateData = (address, goal, endDate) => {
    let msg = {};
    const goal10M = 10000000000;
    if (address.length === 0) {
        msg.address = 'Xin nhập địa chỉ thực hiện chiến dịch';
    }
    //Goal
    if (typeof goal === 'number') {
        console.log(`goal typeof number ${goal}`);
        if (goal > goal10M) {
            msg.goal = 'Hiện tại chúng tôi chỉ hỗ trợ mục tiêu dưới 10 tỷ đồng';
        }
    } else {
        if (goal.length === 0) {
            msg.goal = 'Xin nhập mục tiêu';
        } else {
            const goalNumber = parseFloat(goal);
            if (goalNumber > goal10M) {
                msg.goal = 'Hiện tại chúng tôi chỉ hỗ trợ mục tiêu dưới 10 tỷ đồng';
            }
        }
    }
    console.log(`goal ${goal.length}`)
    console.log(`goal ${typeof goal}`);
    //endDate
    if (!endDate) {
        msg.endDate = 'Xin nhập ngày kết thúc';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default CreateCampaignDetails;