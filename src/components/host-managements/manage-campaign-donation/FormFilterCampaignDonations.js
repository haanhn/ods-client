import React, { useContext, useState } from 'react';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import { getDateBeforeAmountOfDays } from '../../../utils/commonUtils';

const FormFilterCampaignDonations = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const { setCampaignFilteredDonations } = myCampaignsContext;
    const originDonations = myCampaignsContext.myCampaignDonations;

    const [chosenStatus, setChosenStatus] = useState('all');
    const [chosenTime, setChosenTime] = useState('7');

    const chooseTime = (event) => {
        try {
            event.preventDefault();
            const time = event.target.value;
            setChosenTime(time);
            const filtered = filterDonations(time, chosenStatus, originDonations);
            setCampaignFilteredDonations(filtered);
        } catch (error) {
            console.error(error);
        }
    }
    const chooseStatus = (event) => {
        try {
            event.preventDefault();
            const status = event.target.value;
            setChosenStatus(status);
            const filtered = filterDonations(chosenTime, status, originDonations);
            setCampaignFilteredDonations(filtered);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='row clearfix'>
            <div className='col-sm-6 col-12'>
                <label className="col-form-label">Thời gian</label>
                <select className="custom-select" value={chosenTime} onChange={chooseTime}>
                    <option value='-1' key='-1'>Tất cả</option>
                    <option value='7' key='7'>1 tuần qua</option>
                    <option value='30' key='30'>1 tháng qua</option>
                    <option value='90' key='90'>3 tháng qua</option>
                </select>
            </div>
            <div className='col-sm-6 col-12'>
                <label className="col-form-label">Trạng thái</label>
                <select className="custom-select"  value={chosenStatus} onChange={chooseStatus}>
                    <option value='all' key='all'>Tất cả</option>
                    <option value='pending' key='pending'>Chờ duyệt</option>
                    <option value='done' key='done'>Đã duyệt</option>
                    <option value='reject' key='reject'>Từ chối</option>
                </select>
            </div>
        </div>
    );
}

const filterDonations = (daysAmount, status, originDonations) => {
    if (!originDonations || originDonations.length === 0) {
        return [];
    }
    console.log(daysAmount)
    console.log(status)
    if ((daysAmount <= 0) && (status === 'all')) {
        return originDonations;
    }
    let i = 0;
    const filteredDonations = [];
    const filteredDonations2 = [];

    for (i = 0; i < originDonations.length; i++) {
        const donation = originDonations[i];
        if (daysAmount > 0) {
            const dateBefore = getDateBeforeAmountOfDays(daysAmount);
            const dateBeforeMili = dateBefore.getTime();
            const donatedDate = new Date(donation.createdAt);
            const donatedDateMili = donatedDate.getTime();
            const miliOfMinus = donatedDateMili - dateBeforeMili;
            if (miliOfMinus >= 0) {
                filteredDonations.push(donation);
            }
        } else {
            filteredDonations.push(donation);
        }
    }
    // console.log(filteredDonations)
    
    if (filteredDonations && filteredDonations.length > 0) {
        for (i = 0; i < filteredDonations.length; i++) {
            const donation = filteredDonations[i];
            if (status && status !== 'all') {
                if (donation.donationStatus === status) {
                    filteredDonations2.push(donation);
                }
            } else {
                filteredDonations2.push(donation);
            }
        }
    }
    
    // console.log(filteredDonations2)
    return filteredDonations2;
}

export default FormFilterCampaignDonations;