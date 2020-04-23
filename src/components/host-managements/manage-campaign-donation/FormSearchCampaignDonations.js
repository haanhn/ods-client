import React, { useContext } from 'react';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';

const FormSearchCampaignDonations = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const { setCampaignFilteredDonations } = myCampaignsContext;
    const originDonations = myCampaignsContext.myCampaignDonations;

    const searchedValueInput = React.createRef();

    const onSubmit = (event) => {
        try {
            event.preventDefault();
            const searchedValue = searchedValueInput.current.value.trim();
            const filteredDonations = searchDonationsByCodeOrName(searchedValue, originDonations);
            setCampaignFilteredDonations(filteredDonations);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form className="input-group" onSubmit={onSubmit}>
                <input type="text" className="form-control" placeholder="Tìm theo mã quyên góp hoặc người quyên góp"
                    defaultValue='' ref={searchedValueInput} />
                <div className="input-group-append">
                    <button className='btn btn-light btn-append-vnd'>
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

const searchDonationsByCodeOrName = (searchedTitle, originDonations) => {
    if (!originDonations || originDonations.length === 0) {
        return [];
    }
    if (!searchedTitle) {
        return originDonations;
    }
    let i = 0;
    const filteredDonations = [];
    for (i = 0; i < originDonations.length; i++) {
        const donation = originDonations[i];
        const donationCode = donation.trackingCode;
        let donorName = '';
        if  (donation.donationMethod === 'outside') {
            donorName = donation.outsideDonor;
        } else {
            donorName = donation.User ? donation.User.fullname : '';
        }
        donorName = donorName ? donorName.toLowerCase() : '';
        if (donorName.indexOf(searchedTitle) >= 0  || donationCode.indexOf(searchedTitle) >= 0) {
            filteredDonations.push(donation);
        }
    }
    return filteredDonations;
}

export default FormSearchCampaignDonations;