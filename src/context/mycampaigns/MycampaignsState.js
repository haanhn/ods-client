import React, { useReducer } from 'react';
import MycampaignsContext from './mycampaignsContext';
import mycampaingsReducer from './mycampaignsReducer';
import axios from 'axios';
import { MYCAMPAIGN_LOADED } from '../types';
import { odsBase } from '../../odsApi';

const MycampaignsState = props => {
  const initialState = {
    mycampaigns: [
      {
        id: 1,
        name: 'Sara Watson',
        img:
          'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        type: 'setting'
      },
      {
        id: 2,
        name: 'Adam Watson',
        img:
          'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        type: 'blocked'
      },
      {
        id: 3,
        name: 'Arthur',
        img:
          'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        type: 'setting'
      },
      {
        id: 4,
        name: 'Jack',
        img:
          'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        type: 'waiting'
      },
      {
        id: 5,
        name: 'Mina Watson',
        img:
          'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        type: 'closed'
      }
    ]
  };

  const [state, dispatch] = useReducer(mycampaingsReducer, initialState);

  // Load My Campaign
  const loadMyCampaign = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.get(
        `${odsBase}/api/campaign/get-by-relation/host`,
        config
      );
      dispatch({
        type: MYCAMPAIGN_LOADED,
        payload: res.data
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MycampaignsContext.Provider
      value={{
        mycampaigns: state.mycampaigns,
        loadMyCampaign
      }}
    >
      {props.children}
    </MycampaignsContext.Provider>
  );
};

export default MycampaignsState;
