import React, { useReducer } from 'react';
import axios from 'axios';
import UserProfileContext from './UserProfileContext';
import UserProfileReducer from './UserProfileReducer';
import { profileActionTypes } from '../types';
import { odsBase, odsAPIProfile, localStoreKeys } from '../../odsApi';

const UserProfileState = props => {
  const initialState = {
    profile: {},
    profileStats: {},
    profileCampaigns: [],
    profileDonations: [],
    profileRatingStats: {},
    profileRatings: [],
  };

  const [state, dispatch] = useReducer(UserProfileReducer, initialState);

  // API: Get User Profile
  const getUserProfile = async (userId) => {
    const api = odsAPIProfile.getUserProfile(userId);
    try {
      const res = await axios.get(`${odsBase}${api}`);
      const userProfile = res.data.user;
      dispatch({
        type: profileActionTypes.SET_USER_PROFILE,
        payload: userProfile
      });
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // API: Get Profile Stats
  const getProfileStats = async (userId) => {
    const api = odsAPIProfile.getProfileStats(userId);
    try {
      const res = await axios.get(`${odsBase}${api}`);
      const stats = res.data.result;
      dispatch({
        type: profileActionTypes.SET_PROFILE_STATS,
        payload: stats
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // API: Get Profile Campaigns
  const getProfileCampaigns = async (userId) => {
    const api = odsAPIProfile.getProfileCampaigns(userId);
    try {
      const res = await axios.get(`${odsBase}${api}`);
      const campaigns = res.data.campaigns;
      dispatch({
        type: profileActionTypes.SET_PROFILE_CAMPAIGNS,
        payload: campaigns
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // API: Get Profile Donations
  const getProfileDonations = async (userId) => {
    const api = odsAPIProfile.getProfileDonations(userId);
    try {
      const res = await axios.get(`${odsBase}${api}`);
      const donations = res.data.result;
      dispatch({
        type: profileActionTypes.SET_PROFILE_DONATIONS,
        payload: donations
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // API: Get Profile Rating Stats
  const getProfileRatingStats = async (userId) => {
    const api = odsAPIProfile.getProfileRatingStats(userId);
    try {
      const res = await axios.get(`${odsBase}${api}`);
      const stats = res.data.result;
      dispatch({
        type: profileActionTypes.SET_PROFILE_RATINGS_STATS,
        payload: stats
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // API: Get Profile Ratings
  const getProfileRatings = async (userId) => {
    const api = odsAPIProfile.getProfileRatings(userId);
    try {
      const res = await axios.get(`${odsBase}${api}`);
      const ratings = res.data.result;
      dispatch({
        type: profileActionTypes.SET_PROFILE_RATINGS,
        payload: ratings
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile: state.profile,
        profileStats: state.profileStats,
        profileCampaigns: state.profileCampaigns,
        profileDonations: state.profileDonations,
        profileRatingStats: state.profileRatingStats,
        profileRatings: state.profileRatings,
        //Methods
        getUserProfile,
        getProfileStats,
        getProfileCampaigns,
        getProfileDonations,
        getProfileRatingStats,
        getProfileRatings,
      }}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileState;