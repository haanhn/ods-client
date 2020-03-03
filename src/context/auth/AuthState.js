import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  GET_OTP,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_ERRORS
} from '../types';
import { odsBase, localStoreKeys } from '../../odsApi';

const AuthState = props => {
  const initialState = {
    isOtp: false,
    error: null,
    isAuthenticated: false,
    isLoggedIn: false
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User

  // Get Otp
  const getOtp = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(
        `${odsBase}/api/getOTP`,
        {
          user
        },
        config
      );
      dispatch({
        type: GET_OTP,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${odsBase}/api/register`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };

  //

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${odsBase}/api/signin`, formData, config);
      localStorage.setItem(localStoreKeys.token, res.data.accessToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message
      });
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(localStoreKeys.token);
    dispatch({ type: LOG_OUT });
  };
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        isOtp: state.isOtp,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        isLoggedIn: state.isLoggedIn,
        login,
        logout,
        getOtp,
        register,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
