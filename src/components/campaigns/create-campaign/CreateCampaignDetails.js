import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import "react-datepicker/dist/react-datepicker.css";


const CreateCampaignDetails = () => {
    const campaign = {
        id: 1,
        cityId: 1
    };

    const cities = [
        {
            id: 1,
            cityName: 'TP.HCM'
        },
        {
            id: 2,
            cityName: 'Hà Nội'
        },
        {
            id: 3,
            cityName: 'Đà Lạt'
        }
    ];

    const [goal, setGoal] = useState(1000000);
    const [endDate, setEndDate] = useState(null);

    let citiesJsx = null;
    if (cities) {
        citiesJsx =
            cities.map((city) => {
                return (campaign.cityId == city.id ?
                    <option value={city.id} key={city.id} selected>
                        {city.cityName}
                    </option> :
                    <option value={city.id} key={city.id}>{city.cityName}</option>
                );
            });
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
                        />
                        {/* {alertTitle} */}
                    </div>
                </div>

                {citiesJsx ?
                    (<div className="row">
                        <label className="col-sm-12 col-form-label">Tỉnh thành</label>
                        <div className="col-sm-12">
                            <select className="custom-select">
                                {citiesJsx}
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
                        <div className="input-group mb-3"  >
                            <div className="form-control input-currency-container">
                                <CurrencyFormat value={goal}
                                    thousandSeparator={true}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        setGoal(value);
                                    }}
                                />
                            </div>
                            <div className="input-group-append">
                                <input type="submit" value="vnđ" className="btn btn-append-vnd" />

                            </div>
                        </div>
                        {/* {alertTitle} */}
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Ngày kết thúc
                    </label>
                    <div className="col-sm-12">
                        <div className="input-group mb-3"  >
                            <div className="form-control">
                                <DatePicker
                                    selected={endDate}
                                    onChange={ date => setEndDate(date) }
                                    minDate={addDays(new Date(), 3)}
                                    placeholderText="Ngày kết thúc"
                                    showDisabledMonthNavigation
                                />
                            </div>
                            <div className="input-group-append">
                                <button className='btn btn-append-vnd'>
                                    <i className="far fa-calendar-alt "></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-end">
                    <div className='box-button'>
                        <button className="btn btn-primary"
                        // onClick={onClick}
                        >Lưu và tiếp tục</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateCampaignDetails;