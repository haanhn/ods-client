import React, { useReducer } from 'react';
import MycampaignsContext from './mycampaignsContext';
import mycampaingsReducer from './mycampaignsReducer';
import axios from 'axios';
import { GET_MYCAMPAIGNS, CLEAR_MYCAMPAIGNS, hostActionTypes } from '../types';
import { odsBase, odsAPIOpenRoutes, odsAPIHost, localStoreKeys } from '../../odsApi';

const MycampaignsState = props => {
  const initialState = {
    mycampaigns: [],
    hostViewingCampaign: {},
    myCampaignPosts: [],
    myCampaignDonations: [],
  };

  const [state, dispatch] = useReducer(mycampaingsReducer, initialState);

  // Load My Campaign
  const getMyCampaign = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${localStorage.token}`
      }
    };
    try {
      const res = await axios.get(
        `${odsBase}/api/campaign/get-by-relation/host`,
        config
      );
      dispatch({
        type: GET_MYCAMPAIGNS,
        payload: res.data.campaigns.Campaigns
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //HOST GET CAMPAIGN BY SLUG
  const getCampaignBySlug = async (slug) => {
    try {
      // setLoading(true);
      const res = await axios.get(`${odsBase}${odsAPIOpenRoutes.getCampaignDetailBySlug}${slug}`);
      dispatch({
        type: hostActionTypes.GET_CAMPAIGN_DETAIL,
        payload: res.data.campaign
      });
      // setLoading(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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
      return res;
    } catch (error) {
      console.error('Error when host create post');
      console.error(error);
    }
  }

  //Host Update Campaign Posts
  const updateCampaignPosts = async (postId, title, content, status) => {
    const token = localStorage.getItem(localStoreKeys.token);
    try {
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
      return res;
    } catch (error) {
      console.error('Error when host update post ' + postId);
      console.error(error);
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

  return (
    <MycampaignsContext.Provider
      value={{
        mycampaigns: state.mycampaigns,
        myCampaignPosts: state.myCampaignPosts,
        myCampaignDonations: state.myCampaignDonations,
        //Methods
        getMyCampaign,
        getCampaignBySlug,
        clearMycampaigns,
        //Methods for posts
        getMyCampaignPosts,
        createCampaignPost,
        updateCampaignPosts,
        //Methods for donations
        getCampaignDonations,
        updateDonationStatus
      }}
    >
      {props.children}
    </MycampaignsContext.Provider>
  );
};

export default MycampaignsState;
