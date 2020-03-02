import { MYCAMPAIGN_LOADED } from '../types';

export default (state, action) => {
  switch (action.type) {
    case MYCAMPAIGN_LOADED:
      return {
        ...state,
        mycampaigns: action.payload
      };
    default:
      return state;
  }
};
