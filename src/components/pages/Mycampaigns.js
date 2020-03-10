import React, { useContext, useEffect } from 'react';
import MycampaignsContext from '../../context/mycampaigns/mycampaignsContext';
import MyCampaignsItem from '../host-managements/MycampaignsItem';
import '../css/mycampaigns.css';
import { routes, localStoreKeys } from '../../odsApi';
import Alert from '../common/Alert';

const MyCampaigns = (props) => {
  const mycampaignsContext = useContext(MycampaignsContext);

  const { mycampaigns, getMyCampaign } = mycampaignsContext;

  const token = localStorage.getItem(localStoreKeys.token);
  if (!token) {
    const route = routes.PAGE_SIGN_IN;
    props.history.push(route);
  }

  const emptyMsg = { type: 'secondary', msg: 'Bạn chưa tạo chiến dịch nào' };

  useEffect(() => {
    getMyCampaign();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container my-campaign-items'>
      <h2>Chiến dịch của tôi</h2>
      <div className='row'>
        {mycampaigns && mycampaigns.length > 0
          ? mycampaigns.map(mycampaign => (
              <MyCampaignsItem  {...props} mycampaign={mycampaign} />
            ))
          : <Alert alert={emptyMsg} /> }
      </div>
    </div>
  );
};

export default MyCampaigns;
