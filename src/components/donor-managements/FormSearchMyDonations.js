import React, { useContext } from 'react';
import MyDonationsContext from '../../context/myDonations/MyDonationsContext';

const FormSearchMyDonations = () => {
    const myDonationsContext = useContext(MyDonationsContext);
    const { setFilteredDonations } = myDonationsContext;
    const originDonations = myDonationsContext.myDonations;

    const searchedValueInput = React.createRef();

    const onSubmit = (event) => {
        try {
            event.preventDefault();
            const searchedValue = searchedValueInput.current.value.trim();
            const filteredDonations = searchDonationsByCampaignTitle(searchedValue, originDonations);
            setFilteredDonations(filteredDonations);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form className="input-group mb-3" onSubmit={onSubmit}>
                <input type="text" className="form-control" placeholder="Tìm theo tên chiến dịch"
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

const searchDonationsByCampaignTitle = (searchedTitle, originDonations) => {
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
        const campaign = donation.Campaign;
        const title = campaign.campaignTitle.toLowerCase();
        if (title.indexOf(searchedTitle) >= 0) {
            filteredDonations.push(donation);
        }
    }
    return filteredDonations;
}

export default FormSearchMyDonations;