import { profileActionTypes } from '../types';

export default (state, action) => {
  const data = action.payload;
  switch (action.type) {
    case profileActionTypes.SET_USER_PROFILE:
      return {
        ...state,
        profile: data
      };
    case profileActionTypes.SET_PROFILE_STATS:
      return {
        ...state,
        profileStats: data
      };
    case profileActionTypes.SET_PROFILE_CAMPAIGNS:
      return {
        ...state,
        profileCampaigns: data
      };
    case profileActionTypes.SET_PROFILE_DONATIONS:
      return {
        ...state,
        profileDonations: data
      };
    case profileActionTypes.SET_PROFILE_RATINGS_STATS:
      return {
        ...state,
        profileRatingStats: data
      };
    case profileActionTypes.SET_PROFILE_RATINGS:
      return {
        ...state,
        profileRatings: data
      };
    case profileActionTypes.SET_MY_PROFILE_RATING:
      return {
        ...state,
        myProfileRating: data
      };
    default:
      return state;
  }
};