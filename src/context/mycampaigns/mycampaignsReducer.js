import { GET_MYCAMPAIGNS, CLEAR_MYCAMPAIGNS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MYCAMPAIGNS:
      return {
        ...state,
        mycampaigns: action.payload
      };
    case CLEAR_MYCAMPAIGNS:
      return {
        ...state,
        mycampaigns: null
      };
    default:
      return state;
  }
};
