import React, { useContext, useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import Alert from '../../common/Alert';

const MyCampaignTabDetails = () => {
    const campaignsContext = useContext(CampaignsContext);
    const myCampaignsContext = useContext(MyCampaignsContext);
    const campaign = myCampaignsContext.hostViewingCampaign;
    const campaignStats = myCampaignsContext.viewingCampaignStats;
    const { categories, regions } = campaignsContext;

    //Init campaign value
    const campaignCategory = campaign ? campaign.categoryId : null;
    const campaignRegion = campaign ? campaign.campaignRegion : null;
    const initGoalValue = campaign ? campaign.campaignGoal : 0;
    const initEndDateValue = campaign && campaign.campaignEndDate ? new Date(campaign.campaignEndDate) : null;
    const initStatus = campaign && campaign.campaignStatus ? campaign.campaignStatus : '';

    const inputTitle = React.createRef();
    const inputCategory = React.createRef();
    const inputAddress = React.createRef();
    const inputRegion = React.createRef();
    const inputAutoClose = React.createRef();
    const [initGoal, setInitGoal] = useState(true);
    const [goal, setGoal] = useState(0);
    const [endDate, setEndDate] = useState(null);
    const [initEndDate, setInitEndDate] = useState(true);

    //State Alerts
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertAddress, setAlertAddress] = useState(null);
    const [alertGoal, setAlertGoal] = useState(null);
    const [alertEndDate, setAlertEndDate] = useState(null);
    const [alertResult, setAlertResult] = useState(null);

    const saveCampaignDetails = async (event) => {
        event.preventDefault();

        const title = inputTitle.current.value.trim();
        const category = inputCategory.current.value;
        const address = inputAddress.current.value.trim();
        let region = inputRegion.current.value;
        const goalValue = initGoal ? initGoalValue : goal;
        const endValue = initEndDate ? initEndDateValue : endDate;
        const autoClose = inputAutoClose.current.checked;

        setAlertTitle(null);
        setAlertAddress(null);
        setAlertGoal(null);
        setAlertEndDate(null);
        setAlertResult(null);

        const minGoal = campaignStats && campaignStats.raised ? campaignStats.raised : 0;
        const messages = validateData(title, address, goalValue, minGoal, endValue);
        if (messages) {
            if (messages.title) {
                setAlertTitle({ type: 'danger', msg: messages.title });
            }
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
            const result = await myCampaignsContext.updateCampaign(
                campaign.id,
                title,
                category,
                campaign.campaignShortDescription,
                campaign.campaignDescription,
                campaign.campaignThumbnail,
                address,
                region,
                endValue,
                goalValue,
                autoClose
            );
            if (result) {
                setAlertResult({ type: 'success', msg: 'Cập nhật thành công' });
            } else {
                setAlertResult({ type: 'danger', msg: 'Cập nhật thất bại, xin thử lại' });
            }
        }
    }

    console.log('init end date ' + initEndDateValue)
    let categoriesJsx = null;
    if (campaign && campaign.id) {
        categoriesJsx = getCategoriesJsx(categories, campaignCategory);
    }
    let regionsJsx = null;
    if (campaign && campaign.campaignRegion) {
        regionsJsx = getRegionsJsx(regions, campaignRegion);
    }

    return (
        <div className='campaign-info-tab-details'>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Tên chiến dịch
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tên chiến dịch"
                            defaultValue={campaign ? campaign.campaignTitle : ''}
                            ref={inputTitle} disabled
                        />
                        <Alert alert={alertTitle} />
                    </div>
                </div>

                {categoriesJsx ?
                    (<div className="row">
                        <label className="col-sm-12 col-form-label">Thể loại</label>
                        <div className="col-sm-12">
                            <select className="custom-select" ref={inputCategory} >
                                {categoriesJsx}
                            </select>
                        </div>
                    </div>)
                    : null
                }

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Địa chỉ chiến dịch
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ chiến dịch"
                            defaultValue={campaign ? campaign.campaignAddress : ''}
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
                        {/* <i class="fas fa-info-circle icon-small theme_color"
                            data-toggle="modal" data-target="#modalTipsName"
                            style={{ padding: '0 7px' }} ></i> */}
                    </label>
                    <div className="col-sm-12">
                        <div className="input-group"  >
                            <div className="form-control input-currency-container">
                                <CurrencyFormat
                                    value={initGoal ? initGoalValue : goal}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        setInitGoal(false);
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
                                    selected={initEndDate ? initEndDateValue : endDate}
                                    onChange={(date) => {
                                        setEndDate(date);
                                        setInitEndDate(false);
                                    }}
                                    minDate={addDays(new Date(), 1)}
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
                </div>

                <Alert alert={alertResult} />
                {(initStatus !== 'close') ? (
                    <div className="row">
                        <div className="col-sm-12" style={{ textAlign: 'center', paddingTop: '7px' }}>
                            <button className="btn btn-sm btn-success"
                                onClick={saveCampaignDetails}
                            >Cập nhật</button>
                        </div>
                    </div>
                ) : (
                        <div style={{ textAlign: 'center' }}>
                            <Alert alert={{ type: 'secondary', msg: 'Chiến dịch đã kết thúc' }} />
                        </div>
                    )}
            </form>
        </div>
    );
}

const getCategoriesJsx = (categories, campaignCategory) => {
    let categoriesJsx = null;
    if (categories) {
        categoriesJsx = categories.map((category) => {
            return (campaignCategory === category.id ?
                <option value={category.id} key={category.id} selected>
                    {category.categoryTitle}
                </option> :
                <option value={category.id} key={category.id}>{category.categoryTitle}</option>
            );
        });
    }
    return categoriesJsx;
}

const getRegionsJsx = (regions, campaignRegion) => {
    let regionsJsx = null;
    if (regions) {
        regionsJsx = regions.map((region) => {
            return (campaignRegion === region.name ?
                <option value={region.name} key={region.name} selected>
                    {region.name}
                </option> :
                <option value={region.name} key={region.name}>{region.name}</option>
            );
        });
    }
    return regionsJsx;
}

const validateData = (title, address, goal, minGoal, endDate) => {
    let msg = {};
    const goal10M = 10000000000;
    // const goalMin = 100000;
    //Title
    if (title.length === 0) {
        msg.title = 'Xin nhập tên chiến dịch';
    } else if (title.length > 50) {
        msg.title = 'Tên chiến dịch không quá 50 kí tự';
    }
    //Address
    if (address.length === 0) {
        msg.address = 'Xin nhập địa chỉ thực hiện chiến dịch';
    } else if (address.length > 200) {
        msg.address = 'Địa chỉ không quá 200 kí tự';
    }
    //Goal
    let goalStr = goal + '';
    if (goalStr.length === 0) {
        msg.goal = 'Xin nhập mục tiêu';
    } else {
        const goalNumber = parseFloat(goalStr);
        if (goalNumber > goal10M) {
            msg.goal = 'Chúng tôi chỉ hỗ trợ mục tiêu dưới 10 tỷ đồng';
        } else if (goal < minGoal) {
            const goalFormat = new Intl.NumberFormat('ja-JP').format(minGoal);
            msg.goal = 'Mục tiêu cần lớn hơn số tiền quyên góp được: ' + goalFormat + ' đồng';
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
export default MyCampaignTabDetails;