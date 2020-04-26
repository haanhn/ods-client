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
    myProfileRating: {},
    loadingProfile: false
  };

  const [state, dispatch] = useReducer(UserProfileReducer, initialState);

  // API: Get User Profile
  const getUserProfile = async (userId) => {
    const api = odsAPIProfile.getUserProfile(userId);
    try {
      setLoading(true);
      const res = await axios.get(`${odsBase}${api}`);
      const userProfile = res.data.user;
      dispatch({
        type: profileActionTypes.SET_USER_PROFILE,
        payload: userProfile
      });
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
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
      const myRating = getMyHostRating(res.data.result);
      dispatch({
        type: profileActionTypes.SET_PROFILE_RATINGS,
        payload: ratings
      });
      dispatch({
        type: profileActionTypes.SET_MY_PROFILE_RATING,
        payload: myRating
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // API: Check Allow Rating User
  const checkAllowRatingUser = async (userId) => {
    const api = odsAPIProfile.checkAllowRatingUser(userId);
    const token = localStorage.getItem(localStoreKeys.token);
    const config = {
      headers: {
        'x-access-token': token
      }
    };
    if (!token) {
      return false;
    }
    try {
      const res = await axios.get(`${odsBase}${api}`, config);
      const allowedResult = res.data.result;
      let allowed = false;
      if (allowedResult > 0) {
        allowed = true;
      }
      return allowed;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

   // API: Create Host Rating
   const createProfileRating = async (point, content) => {
    const api = odsAPIProfile.createProfileRating;
    const token = localStorage.getItem(localStoreKeys.token);
    const hostId = state.profile.id;
    try {
      const res = await axios.post(`${odsBase}${api}`, {
        token,
        hostId,
        review: { point, content }
      });
      if (res.data.result) {
        return true;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const setLoading = (isLoading) => dispatch({ type: profileActionTypes.SET_LOADING_PROFILE, payload: isLoading });

  return (
    <UserProfileContext.Provider
      value={{
        profile: state.profile,
        profileStats: state.profileStats,
        profileCampaigns: state.profileCampaigns,
        profileDonations: state.profileDonations,
        profileRatingStats: state.profileRatingStats,
        profileRatings: state.profileRatings,
        myProfileRating: state.myProfileRating,
        loadingProfile: state.loadingProfile,
        //Methods
        getUserProfile,
        getProfileStats,
        getProfileCampaigns,
        getProfileDonations,
        getProfileRatingStats,
        getProfileRatings,
        checkAllowRatingUser,
        createProfileRating
      }}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

const getMyHostRating = (reviews) => {
  const userId = localStorage.getItem(localStoreKeys.userId);
  //No reviews
  if (!reviews || reviews.length === 0) {
      return {};
  }
  //Guest
  if (!userId) {
    return {};
  }
  //Logged in & has reviews
  let myReview = {};
  let i = 0;
  for (i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      if (userId === review.reviewerId) {
          myReview = review;
          break;
      }
  }
  return myReview;
}

export default UserProfileState;