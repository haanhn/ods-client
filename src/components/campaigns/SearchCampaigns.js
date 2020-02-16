import React, { useState, useContext } from 'react';
import CampaignsContext from '../../context/campaigns/campaignsContext';

function SearchCampaigns() {
    const styles = {padding: '30px'}
    const [searchedValue, setSearchedValue] = useState('');
    const campaignsContext = useContext(CampaignsContext);

    const searchedValueOnChange = (event) => setSearchedValue(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(`Search key ${searchedValue}`);
        if (searchedValue !== "") {
            campaignsContext.searchCampaigns(searchedValue);
        }
    }

    return (
        <form className="input-group mb-3" style={styles} onSubmit={onSubmit} >
            <input type="text" className="form-control" placeholder="Nhập tên chiến dịch" 
                value={searchedValue} onChange={searchedValueOnChange} />
            <div className="input-group-append">
                <input type="submit" value="Tìm kiếm" className="btn btn-success"/>
            </div>
        </form>
    );
}

export default SearchCampaigns;