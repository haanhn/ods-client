import React, { useReducer } from 'react';
import axios from 'axios';
import MyDonationsContext from './MyDonationsContext';
import MyDonationsReducer from './MyDonationsReducer';
import { donorActionTypes } from '../types';
import { odsBase, odsAPIDonor, localStoreKeys } from '../../odsApi';

const MyDonationsState = props => {
  const initialState = {
    myDonations: []
  };

  const [state, dispatch] = useReducer(MyDonationsReducer, initialState);

  // Load My Donations
  const getMyDonations = async () => {
    const token = localStorage.getItem(localStoreKeys.token);
    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    const api = odsAPIDonor.getMyDonations;
    try {
      const res = await axios.get(`${odsBase}${api}`, config);
      const donations = res.data.result;
      dispatch({
        type: donorActionTypes.GET_MY_DONATIONS,
        payload: donations
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MyDonationsContext.Provider
      value={{
        myDonations: state.myDonations,
        //Methods
        getMyDonations        
      }}
    >
      {props.children}
    </MyDonationsContext.Provider>
  );
};

export default MyDonationsState;