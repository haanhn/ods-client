import React, { useContext, useEffect } from 'react';
import Categories from '../campaigns/Categories';
import Campaigns from '../campaigns/Campaigns';
import SearchCampaigns from '../campaigns/SearchCampaigns';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import ListCampaignSpinner from '../common/ListCampaignSpinner';

function ListCampaigns(props) {
    const campaignsContext = useContext(CampaignsContext);
    const { loading } = campaignsContext;

    useEffect(() => {
        campaignsContext.getAllAvailableCampaigns();
        campaignsContext.getCategories();
        //eslint-disable-next-line

        // return () => console.log('List campaigns umounting...')
    }, []);

    return (
        <div className='auto-container' style={{ paddingBottom: '30px', minHeight: '90vh' }}>
            <SearchCampaigns />
            <div className='row clearfix'>
                <div className='col-md-2 col-sm-12' style={{ marginBottom: '12px' }}>
                    <Categories />
                </div>
                <div className='col-md-10 col-sm-12'>
                    {loading ? (<ListCampaignSpinner />) : (<Campaigns />)}
                </div>
            </div>
        </div>
    );
}

export default ListCampaigns;