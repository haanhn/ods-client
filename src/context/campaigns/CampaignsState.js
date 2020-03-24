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
        campaignPosts: [],
        campaignComments: [],
        campaignDonations: [],
        campaignRatings: [],
        myCampaignRating: {},
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
            const campaign = res.data.campaign;
            campaign.raised = res.data.raised;
            campaign.countDonations = res.data.countDonations;
            dispatch({
                type: actionTypes.SET_VIEWING_CAMPAIGN,
                payload: campaign
            });
            console.log('get Campaign success');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            throw error;
        }
    };

    //**********
    //***** CAMPAIGN POSTS *****
    //**********
    const getCampaignPosts = async (slug) => {
        try {
            const route = odsAPIOpenRoutes.getCampaignPosts(slug);
            const res = await axios.get(`${odsBase}${route}`);
            dispatch({
                type: actionTypes.SET_POSTS,
                payload: res.data.result
            });
            console.log(`get posts success`);
        } catch (error) {
            console.error(`Error when get campaign posts: ${error}`);
            throw error;
        }
    };

    //**********
    //***** CAMPAIGN COMMENT *****
    //**********
    const createCampaignComment = async (commentContent) => {
        const token = localStorage.getItem(localStoreKeys.token);
        try {
            await axios.post(`${odsBase}${odsAPIOpenRoutes.createCampaignComment}`, {
                token: token,
                campaign: {
                    id: state.viewingCampaign.id
                },
                comment: {
                    content: commentContent
                }
            });
            await getCampaignComments(state.viewingCampaign.campaignSlug);
        } catch (error) {
            console.error(`Error when create comment: ${error}`);
            throw error;
        }
    };

    //***** GET CAMPAIGN COMMENTS *****
    const getCampaignComments = async (slug) => {
        try {
            const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getCampaignComments}${slug}`);
            dispatch({
                type: actionTypes.SET_COMMENTS,
                payload: res.data.comments
            });
            console.log(`get comments success`);

        } catch (error) {
            console.error(`Error when get campaign comments: ${error}`);
            throw error;
        }
    };

    //**********
    //***** CAMPAIGN DONATIONS *****
    //**********
    const getCampaignDonations = async (slug) => {
        const routeDonations = odsAPIOpenRoutes.getCampaignDonations(slug);
        try {
            const res = await axios.get(`${odsBase}${routeDonations}`);
            dispatch({
                type: actionTypes.SET_DONATIONS,
                payload: res.data.donations
            });
            console.log(`get donations success`);

        } catch (error) {
            console.error(`Error when get campaign comments: ${error}`);
            throw error;
        }
    };

    //**********
    //***** CAMPAIGN RATINGS *****
    //**********
    const getCampaignRatings = async (slug) => {
        const route = odsAPIOpenRoutes.getCampaignRatings(slug);
        try {
            const res = await axios.get(`${odsBase}${route}`);
            dispatch({
                type: actionTypes.SET_CAMPAIGN_RATINGS,
                payload: res.data.result
            });
            const myReview = getMyCampaignReview(res.data.result);
            dispatch({
                type: actionTypes.SET_MY_CAMPAIGN_RATING,
                payload: myReview
            });
            console.log(`get campaign ratings success`);
        } catch (error) {
            console.error(`Error when get campaign ratings: ${error}`);
            throw error;
        }
    };

    // Get campaign rating stats
    const getCampaignRatingsStats = async (slug) => {
        const route = odsAPIOpenRoutes.getCampaignRatingsStats(slug);
        try {
            const res = await axios.get(`${odsBase}${route}`);
            console.log(`get campaign ratings stats success`);
            return res.data.result;
        } catch (error) {
            console.error(`Error when get campaign ratings stats: ${error}`);
            throw error;
        }
    };

    const postCampaignRating = async (point, content) => {
        const route = odsAPIOpenRoutes.postCampaignRating;
        const token = localStorage.getItem(localStoreKeys.token);
        const campaignId = state.viewingCampaign.id;
        try {
            const res = await axios.post(`${odsBase}${route}`, {
                token,
                campaignId,
                review: {
                    point: point,
                    content: content
                }
            });
            dispatch({
                type: actionTypes.SET_MY_CAMPAIGN_RATING,
                payload: res.data.result
            });
            console.log(`post campaign ratings success`);
            return 1; //success
        } catch (error) {
            console.error(`Error when post campaign ratings: ${error}`);
            return -1; //fail
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
            campaignPosts: state.campaignPosts,
            campaignComments: state.campaignComments,
            campaignDonations: state.campaignDonations,
            campaignRatings: state.campaignRatings,
            myCampaignRating: state.myCampaignRating,
            getCategories: getCategories,
            loading: state.loading,
            //-------------------------------
            setLoading,
            getAllAvailableCampaigns,
            getCampaignBySlug,
            setCampaignToEmpty,
            searchCampaigns,
            getRegions,
            //Posts methods
            getCampaignPosts,
            //Comments methods
            createCampaignComment,
            getCampaignComments,
            //Donations
            getCampaignDonations,
            //Campaign Ratings
            getCampaignRatings,
            getCampaignRatingsStats,
            postCampaignRating
        }}>
            {props.children}
        </CampaignsContext.Provider>
    );
}

const getMyCampaignReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
        return {};
    }
    const userId = localStorage.getItem(localStoreKeys.userId);
    let myReview = {};
    let i = 0;
    for (i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        if (userId === review.userId) {
            myReview = review;
            break;
        }
    }
    return myReview;
}

export default CampaignsState;

//GET CAMPAIGN BY SLUG
// const getCampaignRatingPoint = async (slug) => {
//     try {
//         setLoading(true);
//         const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getCampaignDetailBySlug}${slug}`);
//         const campaign = res.data.campaign;
//         campaign.raised = res.data.raised;
//         campaign.countDonations = res.data.countDonations;
//         dispatch({
//             type: actionTypes.SET_CAMPAIGN_RATING_POINT,
//             payload: campaign.campaignRatingPoint
//         });
//         console.log('get Campaign rating success');
//         setLoading(false);
//     } catch (error) {
//         console.log(error);
//         // throw error;
//     }
// };