import React, { useContext, useEffect } from 'react';
import MycampaignsContext from '../../context/mycampaigns/mycampaignsContext';
import MyCampaignsItem from './MycampaignsItems';
import './mycampaigns.css';

const MyCampaigns = () => {
  const mycampaignsContext = useContext(MycampaignsContext);

  const { mycampaigns, getMyCampaign } = mycampaignsContext;

  useEffect(() => {
    getMyCampaign();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <h2>Chiến dịch của tôi</h2>
      <div className='row'>
        {mycampaigns && mycampaigns.length > 0
          ? mycampaigns.map(mycampaign => (
              <MyCampaignsItem mycampaign={mycampaign} />
            ))
          : console.log('abc')}
      </div>
    </div>
  );
};

export default MyCampaigns;
