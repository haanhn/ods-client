import React, { useReducer } from 'react';
import axios from 'axios';
import CampaignsContext from './campaignsContext';
import CampaignsReducer from './campaignsReducer';
import { odsBase, odsAPIRegions } from '../../odsApi';
import { actionTypes, GET_CATEGORIES, GET_CAMPAIGNS } from '../types';

const CampaignsState = (props) => {
    const initialState = {
        categories: [],
        regions: [],
        campaigns: [],
        viewingCampaign: {},
        loading: false
    }

    const [state, dispatch] = useReducer(CampaignsReducer, initialState);

    //GET ALL AVAILABLE CATEGORIES
    const getCategories = async () => {
        const res = await axios.get(`${odsBase}/api/categories`);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    };

    //GET ALL REGIONS
    const getRegions = async () => {
        const res = await axios.get(`${odsBase}${odsAPIRegions}`);
        dispatch({
            type: actionTypes.GET_REGIONS,
            payload: res.data.regions
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

    //GET CAMPAIGN BY SLUG
    const getCampaignBySlug = async (slug) => {
        try {
            setLoading(true);
            const res = await axios.get(`${odsBase}/campaigns/${slug}`);
            dispatch({
                type: actionTypes.SET_VIEWING_CAMPAIGN,
                payload: res.data
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const setCampaignToEmpty = () => dispatch({ type: actionTypes.SET_VIEWING_CAMPAIGN, payload: {} });

    const setLoading = (isLoading) => dispatch({ type: actionTypes.SET_LOADING, payload: isLoading });

    return (
        <CampaignsContext.Provider value={{
            categories: state.categories,
            campaigns: state.campaigns,
            viewingCampaign: state.viewingCampaign,
            regions: state.regions,
            getCategories: getCategories,
            loading: state.loading,
            setLoading,
            getAllAvailableCampaigns,
            getCampaignBySlug,
            setCampaignToEmpty,
            searchCampaigns,
            getRegions
        }}>
            {props.children}
        </CampaignsContext.Provider>
    );
}

export default CampaignsState;
