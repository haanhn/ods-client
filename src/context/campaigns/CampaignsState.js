import React, { useReducer } from 'react';
import axios from 'axios';
import CampaignsContext from './campaignsContext';
import CampaignsReducer from './campaignsReducer';
import { odsBase, odsAPIRegions, odsAPIOpenRoutes, localStoreKeys } from '../../odsApi';
import { actionTypes, GET_CATEGORIES } from '../types';

const CampaignsState = (props) => {
    const initialState = {
        categories: [],
        regions: [],
        campaigns: [],
        viewingCampaign: {},
        campaignComments: [],
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
        const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getAllCampaigns}`);
        dispatch({
            type: actionTypes.GET_CAMPAIGNS,
            payload: res.data.campaigns
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
            const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getCampaignDetailBySlug}${slug}`);
            dispatch({
                type: actionTypes.SET_VIEWING_CAMPAIGN,
                payload: res.data.campaign
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    //GET CAMPAIGN BY SLUG
    const createCampaignComment = async (commentContent) => {
        const token = localStorage.getItem(localStoreKeys.token);
        try {
            const res = await axios.post(`${odsBase}${odsAPIOpenRoutes.createCampaignComment}`, {
                token: token,
                campaign: {
                    id: state.viewingCampaign.id
                },
                comment: commentContent
            });
            const comments = state.campaignComments.concat();
            comments.unshift(res.data.comment);
            dispatch({
                type: actionTypes.CREATE_COMMENT,
                payload: comments
            });
        } catch (error) {
            console.error(`Error when create comment: ${error}`);
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
            getRegions,
            //Comments methods
            createCampaignComment
        }}>
            {props.children}
        </CampaignsContext.Provider>
    );
}

export default CampaignsState;
