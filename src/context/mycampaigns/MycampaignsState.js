import React, { useReducer } from 'react';
import MycampaignsContext from './mycampaignsContext';
import mycampaingsReducer from './mycampaignsReducer';
import axios from 'axios';
import { GET_MYCAMPAIGNS, CLEAR_MYCAMPAIGNS, hostActionTypes } from '../types';
import { odsBase, odsAPIHost, localStoreKeys, odsAPIAuthorizedUser } from '../../odsApi';

const MycampaignsState = props => {
  const initialState = {
    mycampaigns: [],
    hostViewingCampaign: {},
    viewingCampaignStats: {},
    myCampaignPosts: [],
    myCampaignDonations: [],
    myCampaignExpenses: [],
    totalExpense: 0,
    loading: false,
    listLoading: false, //Loading list expenses, donations, posts
    updateDataLoading: false,
  };

  const [state, dispatch] = useReducer(mycampaingsReducer, initialState);

  // Load My Campaigns
  const getMyCampaigns = async () => {
    const token = localStorage.getItem(localStoreKeys.token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    try {
      setLoading(true);
      const res = await axios.get(
        `${odsBase}/api/campaign/get-by-relation/host`,
        config
      );
      dispatch({
        type: GET_MYCAMPAIGNS,
        payload: res.data.campaigns.Campaigns
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  //HOST GET CAMPAIGN BY SLUG
  const getMyCampaignBySlug = async (slug) => {
    const route = odsAPIHost.getMyCampaignBySlug(slug);
    const token = localStorage.getItem(localStoreKeys.token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    try {
      setLoading(true);
      const res = await axios.get(`${odsBase}${route}`, config);
      const stats = {
        raised: res.data.raised,
        countDonations: res.data.countDonations
      }
      dispatch({
        type: hostActionTypes.GET_CAMPAIGN_DETAIL,
        payload: res.data.campaign
      });
      dispatch({
        type: hostActionTypes.SET_CAMPAIGN_STATS,
        payload: stats
      });
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      console.log(error);
      return false;
    }
  };

  //HOST GET CAMPAIGN DASHBOARD STATS
  const getMyCampaignStats = async (slug) => {
    const route = odsAPIHost.getMyCampaignStats(slug);
    const token = localStorage.getItem(localStoreKeys.token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    try {
      const res = await axios.get(`${odsBase}${route}`, config);
      dispatch({
        type: hostActionTypes.SET_CAMPAIGN_STATS,
        payload: res.data.result
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateCampaignImage = async (imageBinary) => {
    try {
      const token = localStorage.getItem(localStoreKeys.token);
      const slug = state.hostViewingCampaign.campaignSlug;
      const routeUploadCampaignImg = odsAPIAuthorizedUser.uploadCampaignImageCover(slug);

      let imgUrl = null;
      if (imageBinary) {
        setUpdateDataLoading(true);
        let formData = new FormData();
        formData.append('image', imageBinary);
        const resImg = await axios.post(`${odsBase}${routeUploadCampaignImg}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          }
        });
        console.log(`update campaign img cover:`);
        console.log(resImg);
        imgUrl = resImg.data.data.campaignThumbnail;
        dispatch({
          type: hostActionTypes.SET_CAMPAIGN_IMAGE,
          payload: imgUrl
        });
        setUpdateDataLoading(false);
        return true;
      }
    } catch (error) {
      setUpdateDataLoading(false);
      console.error(`Host update campaign image error: ${error}`);
      return false;
    }
  }

  const updateCampaign = async (id, title, category, shortDesription, description,
    image, address, region, endDate, goal, autoClose) => {
    try {
      setUpdateDataLoading(true);
      const res = await axios.post(`${odsBase}${odsAPIHost.updateCampaignInfo}`, {
        token: localStorage.getItem(localStoreKeys.token),
        campaign: {
          id: id,
          campaignTitle: title,
          categoryId: category,
          campaignShortDescription: shortDesription,
          campaignDescription: description,
          campaignThumbnail: image,
          campaignAddress: address,
          campaignRegion: region,
          campaignEndDate: endDate,
          campaignGoal: goal,
          autoClose: autoClose
        }
      });
      dispatch({
        type: hostActionTypes.GET_CAMPAIGN_DETAIL,
        payload: res.data.result
      });
      setUpdateDataLoading(false);
      return true;
    } catch (error) {
      setUpdateDataLoading(false);
      console.error('Update campaign error');
      console.error(error);
      return false;
    }
  }

  // Clear MyCampaign
  const clearMycampaigns = () => {
    dispatch({
      type: CLEAR_MYCAMPAIGNS
    });
  };

  //Host Get Campaign Posts
  const getMyCampaignPosts = async (slug) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    const api = odsAPIHost.getCampaignPosts(slug);
    try {
      const res = await axios.get(`${odsBase}${api}`, config);
      dispatch({
        type: hostActionTypes.GET_POSTS,
        payload: res.data.result
      });
    } catch (error) {
      console.error('Error when host get posts');
      console.error(error);
    }
  }

  //Host Create Campaign Posts
  const createCampaignPost = async (title, content, status) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const campaignId = state.hostViewingCampaign.id;
    try {
      setUpdateDataLoading(true);
      const res = await axios.post(`${odsBase}${odsAPIHost.createCampaignPost}`,
        {
          token: token,
          campaignId: campaignId,
          post: {
            postTitle: title,
            postContent: content,
            postStatus: status,
          }
        }
      );
      setUpdateDataLoading(false);
      return res;
    } catch (error) {
      setUpdateDataLoading(false);
      console.error('Error when host create post');
      console.error(error);
      return false;
    }
  }

  //Host Update Campaign Posts
  const updateCampaignPosts = async (postId, title, content, status) => {
    const token = localStorage.getItem(localStoreKeys.token);
    try {
      setUpdateDataLoading(true);
      const res = await axios.post(`${odsBase}${odsAPIHost.updateCampaignPost}`,
        {
          token: token,
          post: {
            postId: postId,
            postTitle: title,
            postContent: content,
            postStatus: status,
          }
        }
      );
      setUpdateDataLoading(false);
      return res;
    } catch (error) {
      setUpdateDataLoading(false);
      console.error('Error when host update post ' + postId);
      console.error(error);
      return false;
    }
  }

  //Host Delete Post
  const deleteCampaignPost = async (postId) => {
    try {
      const token = localStorage.getItem(localStoreKeys.token);
      const api = odsAPIHost.deleteCampaignPost(postId);
      // const slug = state.hostViewingCampaign.campaignSlug;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      };
      await axios.delete(`${odsBase}${api}`, config);
      // await getMyCampaignPosts(slug);
      return true;
    } catch (error) {
      console.error('Error when host delete post');
      console.error(error);
      return false;
    }
  }

  //Host Get Campaign Donations
  const getCampaignDonations = async (slug) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    const api = odsAPIHost.getCampaignDonations(slug);
    try {
      const res = await axios.get(`${odsBase}${api}`, config);
      dispatch({
        type: hostActionTypes.GET_DONATIONS,
        payload: res.data.donations
      });
    } catch (error) {
      console.error('Error when host get donations');
      console.error(error);
    }
  }

  //Host Create Outside Donation
  const createOutsideDonation = async (name, amount, anonymous) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const campaignId = state.hostViewingCampaign.id;
    const api = odsAPIHost.createOutsideDonation;
    try {
      const res = await axios.post(`${odsBase}${api}`, {
        token: token,
        campaignId: campaignId,
        donation: { name, amount, anonymous }
      });
      return res.data.result;
    } catch (error) {
      console.error('Error when host update donation status');
      console.error(error);
      return false;
    }
  }

  //Host Update Donation Status
  const updateDonationStatus = async (donationId, action) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const userId = localStorage.getItem(localStoreKeys.userId);
    const api = odsAPIHost.updateCampaignDonationStatus(action);
    try {
      const res = await axios.post(`${odsBase}${api}`, {
        token: token,
        donationId: donationId,
        userId: userId
      });
      return res;
    } catch (error) {
      console.error('Error when host update donation status');
      console.error(error);
    }
  }

  //Host Get Campaign Expenses
  const getCampaignExpenses = async (slug) => {
    const api = odsAPIHost.getCampaignExpenses(slug);
    try {
      setListLoading(true);
      const res = await axios.get(`${odsBase}${api}`);
      dispatch({
        type: hostActionTypes.GET_EXPENSES,
        payload: res.data.result
      });
      setTotalExpense(res.data.result);
      setListLoading(false);
    } catch (error) {
      console.error('Error when host get expenses');
      console.error(error);
      setListLoading(false);
    }
  }

  //Host Create Campaign Expenses
  const createCampaignExpense = async (title, cost, description) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const campaignId = state.hostViewingCampaign.id;
    const api = odsAPIHost.createCampaignExpense;

    try {
      setUpdateDataLoading(true);
      const res = await axios.post(`${odsBase}${api}`, {
        token,
        campaignId,
        expense: { title, cost, description }
      });
      setUpdateDataLoading(false);
      return res.data.result.id;
    } catch (error) {
      setUpdateDataLoading(false);
      console.error('Error when host create expense');
      console.error(error);
      return false;
    }
  }

  //Host Update Campaign Expenses
  const updateCampaignExpense = async (id, title, cost, description) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const api = odsAPIHost.updateCampaignExpense;

    try {
      setUpdateDataLoading(true);
      await axios.post(`${odsBase}${api}`, {
        token,
        expense: { id, title, cost, description }
      });
      setUpdateDataLoading(false);
      return true;
    } catch (error) {
      setUpdateDataLoading(false);
      console.error('Error when host update expense');
      console.error(error);
      return false;
    }
  }

  //Host Delete Campaign Expenses
  const deleteCampaignExpense = async (expenseId) => {
    const token = localStorage.getItem(localStoreKeys.token);
    const api = odsAPIHost.deleteCampaignExpense(expenseId);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`
      }
    };
    try {
      await axios.delete(`${odsBase}${api}`, config);
      return true;
    } catch (error) {
      console.error('Error when host delete expense');
      console.error(error);
      return false;
    }
  }

  const setTotalExpense = (expenses) => {
    let total = 0;
    if (expenses && expenses.length > 0) {
      let i = 0;
      for (i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        total = expense.cost + total;
      }
    }
    dispatch({
      type: hostActionTypes.SET_TOTAL_EXPENSE,
      payload: total
    });
  }

  const setLoading = (isLoading) => dispatch({ type: hostActionTypes.SET_LOADING, payload: isLoading });
  const setListLoading = (isLoading) => dispatch({ type: hostActionTypes.SET_LIST_LOADING, payload: isLoading });
  const setUpdateDataLoading = (isLoading) => dispatch({
    type: hostActionTypes.SET_UPDATE_DATA_LOADING, payload: isLoading
  });

  return (
    <MycampaignsContext.Provider
      value={{
        mycampaigns: state.mycampaigns,
        hostViewingCampaign: state.hostViewingCampaign,
        viewingCampaignStats: state.viewingCampaignStats,
        myCampaignPosts: state.myCampaignPosts,
        myCampaignDonations: state.myCampaignDonations,
        myCampaignExpenses: state.myCampaignExpenses,
        totalExpense: state.totalExpense,
        loading: state.loading,
        listLoading: state.listLoading,
        updateDataLoading: state.updateDataLoading,
        //Methods
        getMyCampaigns,
        getMyCampaignBySlug,
        getMyCampaignStats,
        updateCampaignImage,
        updateCampaign,
        clearMycampaigns,
        //Methods for posts
        getMyCampaignPosts,
        createCampaignPost,
        updateCampaignPosts,
        deleteCampaignPost,
        //Methods for donations
        getCampaignDonations,
        createOutsideDonation,
        updateDonationStatus,
        //Methods for expenses
        getCampaignExpenses,
        createCampaignExpense,
        updateCampaignExpense,
        deleteCampaignExpense
      }}
    >
      {props.children}
    </MycampaignsContext.Provider>
  );
};

export default MycampaignsState;
