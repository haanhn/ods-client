import React, { useReducer } from 'react';
import axios from 'axios';
import MyDonationsContext from './MyDonationsContext';
import MyDonationsReducer from './MyDonationsReducer';
import { donorActionTypes } from '../types';
import { odsBase, odsAPIDonor, localStoreKeys } from '../../odsApi';

const MyDonationsState = props => {
  const initialState = {
    myDonations: [],
    myFilteredDonations: [],
    loading: false
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
      setLoading(true);
      const res = await axios.get(`${odsBase}${api}`, config);
      const donations = res.data.result;
      const nonOutsideDonations = getNonOutsideDonations(donations);
      dispatch({
        type: donorActionTypes.GET_MY_DONATIONS,
        payload: nonOutsideDonations
      });
      setFilteredDonations(nonOutsideDonations);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const setLoading = (isLoading) => dispatch({ type: donorActionTypes.SET_LOADING, payload: isLoading });
  
  const setFilteredDonations = (filteredDonations) => dispatch({
    type: donorActionTypes.SET_MY_FILTERED_DONATIONS, payload: filteredDonations
  });

  return (
    <MyDonationsContext.Provider
      value={{
        myDonations: state.myDonations,
        myFilteredDonations: state.myFilteredDonations,
        loading: state.loading,
        //Methods
        getMyDonations,
        setFilteredDonations
      }}
    >
      {props.children}
    </MyDonationsContext.Provider>
  );
};

export default MyDonationsState;

const getNonOutsideDonations = (listDonations) => {
  if (!listDonations || listDonations.length === 0) {
    return [];
  }
  const list = [];
  let i = 0;
  for (i = 0; i < listDonations.length; i++) {
    const donation = listDonations[i];
    if (donation.donationMethod !== 'outside') {
      list.push(donation);
    }
  }
  return list;
}