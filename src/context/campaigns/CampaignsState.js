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
        campaignExpenses: [],
        myCampaignRating: {},
        ratingStats: {},
        countFollowers: 0,
        suggestedCampaigns1: [], //similar campaigns
        suggestedCampaigns2: [], //campaigns of similar users
        loading: false,
        initCreateLoading: false //Set init loading when clicks on link Create Campaign
    }

    const [state, dispatch] = useReducer(CampaignsReducer, initialState);

    //GET ALL AVAILABLE CATEGORIES
    const getCategories = async () => {
        try {
            const res = await axios.get(`${odsBase}/api/categories`);
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            });
        } catch (error) {
            console.error(error);
        }
    };

    //GET ALL REGIONS
    const getRegions = async () => {
        try {
            const res = await axios.get(`${odsBase}${odsAPIRegions}`);
            dispatch({
                type: actionTypes.GET_REGIONS,
                payload: res.data.regions
            });
        } catch (error) {
            console.error(error);
        }
    };

    //GET ALL AVAILABLE CAMPAIGNS
    const getAllAvailableCampaigns = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getAllCampaigns}`);
            dispatch({
                type: actionTypes.GET_CAMPAIGNS,
                payload: res.data.campaigns
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    //SEARCH CAMPAIGNS
    const searchCampaigns = async (searchedValue) => {
        try {
            if (!searchedValue || searchedValue.trim().length === 0) {
                console.log('Search value empty');
                return;
            }
            setLoading(true);
            const api = odsAPIOpenRoutes.searchCampaigns(searchedValue);
            const res = await axios.get(`${odsBase}${api}`);
            dispatch({
                type: actionTypes.GET_CAMPAIGNS,
                payload: res.data.campaigns
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const getCampaignsByCategory = async (categorySlug) => {
        try {
            setLoading(true);
            const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getCampaignsByCategory(categorySlug)}`);
            const campaigns = res.data.campaigns;
            dispatch({
                type: actionTypes.GET_CAMPAIGNS,
                payload: campaigns
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    //GET CAMPAIGN BY SLUG
    const getCampaignBySlug = async (slug) => {
        try {
            setLoading(true);
            const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getCampaignDetailBySlug}${slug}`);
            const campaign = res.data.campaign;
            campaign.raised = res.data.raised;
            campaign.countDonations = res.data.countDonations;
            campaign.countFollowers = res.data.countFollowers;
            dispatch({
                type: actionTypes.SET_VIEWING_CAMPAIGN,
                payload: campaign
            });
            dispatch({
                type: actionTypes.SET_COUNT_FOLLOWERS,
                payload: campaign.countFollowers
            });
            console.log('get Campaign success');
            setLoading(false);
            //ADD return campaign here
            return campaign;
        } catch (error) {
            setLoading(false);
            console.log(error);
            throw error;
        }
    };

    //Get similar campaigns
    const getSuggestedCampaigns1 = async (slug) => {
        try {
            const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getSuggestedCampaigns1(slug)}`);
            const campaigns = res.data.campaigns;
            dispatch({
                type: actionTypes.SET_SUGGESTED_CAMPAIGNS1,
                payload: campaigns
            });
        } catch (error) {
            console.error(error);
        }
    };

    //Get by similar users
    const getSuggestedCampaigns2 = async (userId, viewingId) => {
        try {
            const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getSuggestedCampaigns2(userId)}`);
            const campaigns = res.data.campaigns;
            if (campaigns && campaigns.length > 0) {
                let i = 0;
                let duplicate = -1;
                for (i = 0; i < campaigns.length; i++) {
                    if (campaigns[i].id === viewingId) {
                        duplicate = i;
                        break;
                    }
                }
                if (duplicate >= 0) {
                    campaigns.splice(duplicate, 1);
                }
            }
            dispatch({
                type: actionTypes.SET_SUGGESTED_CAMPAIGNS2,
                payload: campaigns
            });
        } catch (error) {
            console.error(error);
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
            return true;
        } catch (error) {
            console.error(`Error when create comment: ${error}`);
            return false;
        }
    };

    //DELETE CAMPAIGN COMMENT
    const deleteCampaignComment = async (commentId) => {
        const api = odsAPIOpenRoutes.deleteCampaignComment(commentId);
        const token = localStorage.getItem(localStoreKeys.token);
        const config = {
            headers: { 'x-access-token': token }
        };
        try {
            await axios.delete(`${odsBase}${api}`, config);
            await getCampaignComments(state.viewingCampaign.campaignSlug);
            return true;
        } catch (error) {
            console.error(`Error when delete comment: ${error}`);
            return false;
        }
    };

    //***** GET CAMPAIGN COMMENTS *****
    const getCampaignComments = async (slug) => {
        try {
            const api = odsAPIOpenRoutes.getCampaignComments(slug);
            const res = await axios.get(`${odsBase}${api}`);
            dispatch({
                type: actionTypes.SET_COMMENTS,
                payload: res.data.comments
            });
            console.log(`get comments success`);
        } catch (error) {
            console.error(`Error when get campaign comments: ${error}`);
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
            dispatch({
                type: actionTypes.SET_CAMPAIGN_RATING_STATS,
                payload: res.data.result
            });
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

    const getCampaignExpenses = async (slug) => {
        const api = odsAPIOpenRoutes.getCampaignExpenses(slug);
        try {
            const res = await axios.get(`${odsBase}${api}`);
            dispatch({
                type: actionTypes.SET_EXPENSES,
                payload: res.data.result
            });
            // setTotalExpense(res.data.result);
        } catch (error) {
            console.error('Error when host get expenses');
            console.error(error);
        }
    }

    const followCampaign = async (userId, email, name) => {
        const route = odsAPIOpenRoutes.followCampaign;
        const campaignId = state.viewingCampaign.id;
        try {
            const res = await axios.post(`${odsBase}${route}`, {
                campaignId, userId,
                email: email,
                name: name
            });
            const success = res.data.success;
            if (success === 'true') {
                return true;
            }
        } catch (error) {
            console.error(`Error when follow campaign: ${error}`);
            return false; //fail
        }
    };

    const unFollowCampaign = async (userId) => {
        const route = odsAPIOpenRoutes.unFollowCampaign;
        const campaignId = state.viewingCampaign.id;
        try {
            const res = await axios.post(`${odsBase}${route}`, {
                campaignId, userId
            });
            const success = res.data.success;
            if (success === true) {
                return true;
            }
        } catch (error) {
            console.error(`Error when follow campaign: ${error}`);
            return false; //fail
        }
    };

    const checkFollowCampaign = async (campaignId) => {
        const token = localStorage.getItem(localStoreKeys.token);
        const route = odsAPIOpenRoutes.checkFollowCampaign(campaignId);
        const config = {
            headers: {
                'x-access-token': token
            }
        };
        try {
            const res = await axios.get(`${odsBase}${route}`, config);
            const following = res.data.follow;
            return following ? 1 : 0;
        } catch (error) {
            console.error(`Error when follow campaign: ${error}`);
            return -2; //fail
        }
    };

    const countCampaignFollowers = async (campaignId) => {
        const route = odsAPIOpenRoutes.countFollowers(campaignId);
        try {
            const res = await axios.get(`${odsBase}${route}`);
            const count = res.data.countFollowers;
            console.log('checkFollowCampaign: ' + count);
            dispatch({
                type: actionTypes.SET_COUNT_FOLLOWERS,
                payload: count
            });
        } catch (error) {
            console.error(`Error when follow campaign: ${error}`);
        }
    };

    const setCampaignToEmpty = () => dispatch({ type: actionTypes.SET_VIEWING_CAMPAIGN, payload: {} });

    const setLoading = (isLoading) => dispatch({ type: actionTypes.SET_LOADING, payload: isLoading });

    //Set init loading when clicks on link Create Campaign
    const setInitCreateLoading = (isLoading) => dispatch({ type: actionTypes.SET_INIT_CREATE_LOADING, payload: isLoading });

    return (
        <CampaignsContext.Provider value={{
            categories: state.categories,
            campaigns: state.campaigns,
            viewingCampaign: state.viewingCampaign,
            suggestedCampaigns1: state.suggestedCampaigns1,
            suggestedCampaigns2: state.suggestedCampaigns2,
            regions: state.regions,
            campaignPosts: state.campaignPosts,
            campaignComments: state.campaignComments,
            campaignDonations: state.campaignDonations,
            campaignRatings: state.campaignRatings,
            myCampaignRating: state.myCampaignRating,
            campaignExpenses: state.campaignExpenses,
            countFollowers: state.countFollowers,
            ratingStats: state.ratingStats,
            getCategories: getCategories,
            loading: state.loading,
            initCreateLoading: state.initCreateLoading,
            //-------------------------------
            setLoading,
            setInitCreateLoading,
            getAllAvailableCampaigns,
            getCampaignsByCategory,
            getCampaignBySlug,
            getSuggestedCampaigns1,
            getSuggestedCampaigns2,
            setCampaignToEmpty,
            searchCampaigns,
            getRegions,
            //Posts methods
            getCampaignPosts,
            //Comments methods
            getCampaignComments,
            createCampaignComment,
            deleteCampaignComment,
            //Donations
            getCampaignDonations,
            //Campaign Ratings
            getCampaignRatings,
            getCampaignRatingsStats,
            postCampaignRating,
            //Expenses
            getCampaignExpenses,
            //Follow Campaign
            followCampaign,
            unFollowCampaign,
            countCampaignFollowers,
            checkFollowCampaign
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