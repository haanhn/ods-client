import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_OTP,
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  authActionTypes
} from '../types';

export default (state, action) => {
  const data = action.payload;
  switch (action.type) {
    case GET_OTP:
      return {
        isOtp: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case authActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: data
      };
    case authActionTypes.SET_BANK_ACCOUNT:
      return {
        ...state,
        bankAccount: data
      };
    default:
      return state;
  }
};
