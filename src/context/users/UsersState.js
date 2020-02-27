import React, { useReducer } from 'react';
import UsersContext from './usersContext';
import { REGISTER_USER } from '../types';

const UsersState = () => {
  const initialState = {
    registerUser: null, //email, name, pwd
    currentUser: null
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  const registerUser = () => {
    //1. requst regiser

    // dispatch if register thanh cong
    dispatch({
      type: REGISTER_USER
    });
  };

  return (
    <UsersContext.Provider
      value={{
        currentUser: state.currentUser
      }}
    ></UsersContext.Provider>
  );
};

export default UsersState;
