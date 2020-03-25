import { GET_MYCAMPAIGNS, CLEAR_MYCAMPAIGNS, hostActionTypes } from '../types';

export default (state, action) => {
  const data = action.payload;
  switch (action.type) {
    case GET_MYCAMPAIGNS:
      return {
        ...state,
        mycampaigns: action.payload
      };
    case hostActionTypes.GET_CAMPAIGN_DETAIL:
      return {
        ...state,
        hostViewingCampaign: data
      };
    case hostActionTypes.SET_CAMPAIGN_IMAGE:
      return {
        ...state,
        hostViewingCampaign: {
          ...state.hostViewingCampaign,
          campaignThumbnail: data
        }
      };
    case CLEAR_MYCAMPAIGNS:
      return {
        ...state,
        mycampaigns: null
      };
    case hostActionTypes.GET_POSTS:
      return {
        ...state,
        myCampaignPosts: data
      };
    case hostActionTypes.GET_DONATIONS:
      return {
        ...state,
        myCampaignDonations: data
      };
    case hostActionTypes.GET_EXPENSES:
      return {
        ...state,
        myCampaignExpenses: data
      };
    case hostActionTypes.SET_TOTAL_EXPENSE:
      return {
        ...state,
        totalExpense: data
      };
    default:
      return state;
  }
};
