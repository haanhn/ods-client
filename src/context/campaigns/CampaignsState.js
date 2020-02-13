import React, { useReducer } from 'react';
import axios from 'axios';
import CampaignsContext from './campaignsContext';
import CampaignsReducer from './campaignsReducer';
import { odsBase } from '../../odsApi';
import { GET_CATEGORIES, GET_CAMPAIGNS } from '../types';

const CampaignsState = (props) => {
    const initialState = {
        categories: [],
        campaigns: []
    }

    const [state, dispatch] = useReducer(CampaignsReducer, initialState);

    //GET ALL AVAILABLE CATEGORIES
    const getCategories = async () => {
        const res = await axios.get(`${odsBase}/categories`);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    };

    //GET ALL AVAILABLE CAMPAIGNS
    const getAllAvailableCampaigns = async () => {
        const res = await axios.get(`${odsBase}/campaigns`);
        dispatch({
            type: GET_CAMPAIGNS,
            payload: res.data
        });
    };

    //SEARCH CAMPAIGNS
    const searchCampaigns = async (searchedValue) => {
        console.log(`campaign state search value ${searchedValue}`);
        const res = await axios.get(`${odsBase}/campaigns?query=${searchedValue}`);
        console.log(res);
    }

    return (
        <CampaignsContext.Provider value={{
            categories: state.categories,
            campaigns: state.campaigns,
            getCategories: getCategories,
            getAllAvailableCampaigns,
            searchCampaigns
        }}>
            {props.children}
        </CampaignsContext.Provider>
    );
}

export default CampaignsState;
