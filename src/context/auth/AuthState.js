import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  GET_OTP,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_USER
} from '../types';

const AuthState = props => {
  const initialState = {
    user: {
      email: 'xu92ngan@gmail.com'
    }
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
        'http://localhost:5000/api/getOTP',
        {
          user
        },
        config
      );
    } catch (error) {
      console.error(error.message);
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
      const res = await axios.post(
        'http://localhost:5000/api/register',
        formData,
        config
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  // Login User

  // Logout

  // Clear Errors

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        getOtp,
        register
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
