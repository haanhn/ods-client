import React, { useContext, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import Alert from '../../common/Alert';

const MyCampaignTabDetails = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);

    const campaignsContext = useContext(CampaignsContext);
    const { getCategories, getRegions } = campaignsContext;

    useEffect(() => {
        getCategories();
        getRegions();
        //eslint-disable-next-line
    }, []);



    return (
        <div>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Tên chiến dịch
                        <i class="fas fa-info-circle icon-small theme_color"
                            data-toggle="modal" data-target="#modalTipsName"
                            style={{ padding: '0 7px' }} ></i>
                        {/* <button data-toggle="modal" data-target="#modalTipsName">k</button> */}
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tên chiến dịch"
                        // defaultValue={campaign.campaignTitle}
                        // ref={inputTitle}
                        />
                        {/* <Alert alert={alertTitle} /> */}
                    </div>
                </div>

                {/* {categoriesJsx ?
                    (<div className="row">
                        <label className="col-sm-12 col-form-label">Thể loại</label>
                        <div className="col-sm-12">
                            <select className="custom-select" ref={inputCategory} >
                                {categoriesJsx}
                            </select>
                        </div>
                    </div>)
                    : null
                } */}

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Mô tả ngắn
                        <i class="fas fa-info-circle icon-small theme_color"
                            data-toggle="modal" data-target="#modalTipsShortDescr"
                            style={{ padding: '0 7px' }} ></i>
                    </label>
                    <div className="col-sm-12">
                        <textarea type="text" className="form-control" placeholder="Mô tả ngắn"
                            rows='3'
                        // ref={inputShortDescription}
                        // defaultValue={campaign.campaignShortDescription}
                        />
                        {/* <Alert alert={alertShortDescription} /> */}
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Địa chỉ chiến dịch
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ chiến dịch"
                        // value={title} onChange={updateTitle} 
                        // defaultValue={campaign.address}
                        // ref={inputAddress}
                        />
                        {/* <Alert alert={alertAddress} /> */}
                    </div>
                </div>

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
                                <CurrencyFormat
                                    // value={goal}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        // setGoal(value);
                                    }}
                                />
                            </div>
                            <div className="input-group-append">
                                <div className='btn btn-append-vnd'>
                                    vnđ
                                </div>
                            </div>
                        </div>
                        {/* <Alert alert={alertGoal} /> */}
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
                                    // selected={endDate}
                                    // onChange={date => setEndDate(date)}
                                    // minDate={addBusinessDays(new Date(), 3)}
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
                        {/* <Alert alert={alertEndDate} /> */}
                    </div>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                    // ref={inputNoti}
                    />
                    <label className="form-check-label">Tự đóng khi đạt được mục tiêu</label>
                </div>

                <div className="row justify-content-end">
                    <div className='box-button'>
                        <button className="btn btn-primary"
                        // onClick={createStep1}
                        >Lưu và tiếp tục</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const getCategoriesJsx = (categories, campaignCategory) => {
    let categoriesJsx = null;
    if (categories) {
        categoriesJsx =
            categories.map((category) => {
                return (campaignCategory == category.id ?
                    <option value={category.id} key={category.id} selected>
                        {category.categoryTitle}
                    </option> :
                    <option value={category.id} key={category.id}>{category.categoryTitle}</option>
                );
            });
    }
    return categoriesJsx;
}

export default MyCampaignTabDetails;