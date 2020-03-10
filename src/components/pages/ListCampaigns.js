import React, { useContext, useEffect } from 'react';
import Categories from '../campaigns/Categories';
import Campaigns from '../campaigns/Campaigns';
import SearchCampaigns from '../campaigns/SearchCampaigns';
import CampaignsContext from '../../context/campaigns/campaignsContext';

function ListCampaigns(props) {
    const campaignsContext = useContext(CampaignsContext);

    useEffect(() => {
        console.log('get campaigns from ListCampaign page');
        campaignsContext.getAllAvailableCampaigns();
        campaignsContext.getCategories();
        //eslint-disable-next-line

        // return () => console.log('List campaigns umounting...')
    }, []);

    return (
        <div className='auto-container'>
            <SearchCampaigns />
            <div className='row clearfix'>
                <Categories />
                <Campaigns cssClasses='col-10'/>
            </div>
        </div>
    );
}

export default ListCampaigns;