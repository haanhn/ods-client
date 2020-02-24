import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_OTP,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_OTP:
      return {
        ...state.user
      };
    default:
      return state;
  }
};
