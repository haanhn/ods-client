import React, { useContext, useEffect } from 'react';
import MycampaignsContext from '../../context/mycampaigns/mycampaignsContext';
import MyCampaignsItem from './MycampaignsItems';
import './mycampaigns.css';

const MyCampaigns = () => {
  const mycampaignsContext = useContext(MycampaignsContext);

  const { mycampaigns, loadMyCampaign } = mycampaignsContext;

  return (
    <div className='container'>
      <h2>Chiến dịch của tôi</h2>
      <div className='row'>
        {mycampaigns.map(mycampaign => (
          <MyCampaignsItem key={mycampaign.id} mycampaign={mycampaign} />
        ))}
      </div>
    </div>
  );
};

export default MyCampaigns;
