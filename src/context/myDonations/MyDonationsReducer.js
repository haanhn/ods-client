import { donorActionTypes } from '../types';

export default (state, action) => {
  const data = action.payload;
  switch (action.type) {
    case donorActionTypes.GET_MY_DONATIONS:
      return {
        ...state,
        myDonations: data
      };
    case donorActionTypes.SET_MY_FILTERED_DONATIONS:
      return {
        ...state,
        myFilteredDonations: data
      };
    case donorActionTypes.SET_LOADING:
      return ({
        ...state,
        loading: data
      });
    default:
      return state;
  }
};