import React, { useReducer } from 'react';
import MycampaignsContext from './mycampaignsContext';
import mycampaingsReducer from './mycampaignsReducer';
import axios from 'axios';
import { GET_MYCAMPAIGNS, CLEAR_MYCAMPAIGNS } from '../types';
import { odsBase } from '../../odsApi';

const MycampaignsState = props => {
  const initialState = {
    mycampaigns: []
  };

  const [state, dispatch] = useReducer(mycampaingsReducer, initialState);

  // Load My Campaign
  const getMyCampaign = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${localStorage.token}`
      }
    };
    try {
      const res = await axios.get(
        `${odsBase}/api/campaign/get-by-relation/host`,
        config
      );
      dispatch({
        type: GET_MYCAMPAIGNS,
        payload: res.data
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Clear MyCampaign
  const clearMycampaigns = () => {
    dispatch({
      type: CLEAR_MYCAMPAIGNS
    });
  };

  return (
    <MycampaignsContext.Provider
      value={{
        mycampaigns: state.mycampaigns,
        getMyCampaign,
        clearMycampaigns
      }}
    >
      {props.children}
    </MycampaignsContext.Provider>
  );
};

export default MycampaignsState;
