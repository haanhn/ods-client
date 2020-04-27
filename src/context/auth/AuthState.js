import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  GET_OTP,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOG_OUT,
  CLEAR_ERRORS,
  authActionTypes
} from '../types';
import { odsBase, localStoreKeys, odsAPIAuthorizedUser, odsAPIProfile } from '../../odsApi';

const AuthState = props => {
  const initialState = {
    isOtp: false,
    error: null,
    isAuthenticated: false,
    isLoggedIn: false,
    currentUser: {},
    bankAccount: {}
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
  const login = async (formData) => {
    const config = {
      headers: { 
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${odsBase}/api/signin`, formData, config);
      //set authorized user basic info to local storage
      localStorage.setItem(localStoreKeys.token, res.data.accessToken);
      localStorage.setItem(localStoreKeys.userId, res.data.user.id);
      localStorage.setItem(localStoreKeys.userEmail, res.data.user.email);
      localStorage.setItem(localStoreKeys.userFullname, res.data.user.fullname);
      localStorage.setItem(localStoreKeys.userAvatar, res.data.user.avatar);
      //dispatch to state
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      return true;
    } catch (err) {
      console.error('Login failed: ');
      console.error(err);
      return false;
    }
  };

  // Logout
  const logout = () => {
    clearLocalStorage();
    dispatch({ type: LOG_OUT });
  };
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // const isLoggedIn = () => {
  //   const token = localStorage.getItem(localStoreKeys.token);
  //   const [loggedIn, setLoggedIn] = useState(false);
  //   if (token) {
  //     setLoggedIn(true);
  //   }
  // }

  //Get User
  // API: Get User
  const getCurrentUser = async () => {
    const userId = localStorage.getItem(localStoreKeys.userId);
    const api = odsAPIProfile.getUserProfile(userId);
    try {
      const res = await axios.get(`${odsBase}${api}`);
      const user = res.data.user;
      dispatch({
        type: authActionTypes.SET_CURRENT_USER,
        payload: user
      });
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const updateUser = async (fullname, address, region, phone) => {
    const token = localStorage.getItem(localStoreKeys.token);
    try {
      const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.updateUser}`, {
        token,
        user: { fullname, address, region, phone }
      });
      dispatch({
        type: authActionTypes.SET_CURRENT_USER,
        payload: res.data.result
      });
      return true;
    } catch (error) {
      console.error(`Update user account error: ${error}`);
      return false;
    }
  }

  const updateAvatar = async (avatarUrl) => {
    const token = localStorage.getItem(localStoreKeys.token);
    try {
      const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.updateUserAvatar}`, {
        token,
        avatar: avatarUrl
      });
      dispatch({
        type: authActionTypes.SET_CURRENT_USER,
        payload: res.data.result
      });
      return true;
    } catch (error) {
      console.error(`Update bank account error: ${error}`);
      return false;
    }
  }

  const getUserBankAccount = async () => {
    const token = localStorage.getItem(localStoreKeys.token);
    try {
      const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.getUserBankAccount}`, {
        token: token
      });
      dispatch({
        type: authActionTypes.SET_BANK_ACCOUNT,
        payload: res.data.bankAccount
      });
    } catch (error) {
      console.error(`Get User BankAccount Error: ${error}`);
    }
  }

  const updateBankAccount = async (accountNumber, bankName, bankAgency) => {
    const token = localStorage.getItem(localStoreKeys.token);
    try {
      const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.setBankAccount}`, {
        token,
        bankAccount: {
          bankName: bankName,
          bankAgency: bankAgency,
          accountNumber: accountNumber
        }
      });
      dispatch({
        type: authActionTypes.SET_BANK_ACCOUNT,
        payload: res.data.bankAccount
      });
      return true;
    } catch (error) {
      console.error(`Update bank account error: ${error}`);
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        bankAccount: state.bankAccount,
        isOtp: state.isOtp,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        isLoggedIn: state.isLoggedIn,
        //Methods
        login,
        logout,
        getOtp,
        register,
        clearErrors,
        getCurrentUser,
        getUserBankAccount,
        updateUser,
        updateAvatar,
        updateBankAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const clearLocalStorage = () => {
  //remove authorized user info from local storage
  localStorage.removeItem(localStoreKeys.token);
  localStorage.removeItem(localStoreKeys.userId);
  localStorage.removeItem(localStoreKeys.userEmail);
  localStorage.removeItem(localStoreKeys.userFullname);
  localStorage.removeItem(localStoreKeys.userAvatar);
}

export default AuthState;
