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
    default:
      return state;
  }
};