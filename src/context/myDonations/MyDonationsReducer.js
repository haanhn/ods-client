import { donorActionTypes } from '../types';

export default (state, action) => {
  const data = action.payload;
  switch (action.type) {
    case donorActionTypes.GET_MY_DONATIONS:
      return {
        ...state,
        myDonations: data
      };
    default:
      return state;
  }
};