import React, { useContext, useEffect } from 'react';
import MycampaignsContext from '../../context/mycampaigns/mycampaignsContext';
import MyCampaignsItem from '../host-managements/MycampaignsItem';
import '../css/mycampaigns.css';
import { routes, localStoreKeys } from '../../odsApi';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const MyCampaigns = (props) => {
  const mycampaignsContext = useContext(MycampaignsContext);

  const { mycampaigns, loading, getMyCampaigns } = mycampaignsContext;

  const token = localStorage.getItem(localStoreKeys.token);
  if (!token) {
    const route = routes.PAGE_SIGN_IN;
    props.history.push(route);
  }

  const emptyMsg = { type: 'secondary', msg: 'Bạn chưa tạo chiến dịch nào' };

  useEffect(() => {
    if (token) {
      getMyCampaigns();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='container my-campaign-items'>
      <h2>Chiến dịch của tôi</h2>
      <div className='row'>
        {mycampaigns && mycampaigns.length > 0
          ? mycampaigns.map(mycampaign => (
              <MyCampaignsItem key={mycampaign.id} {...props} mycampaign={mycampaign} />
            ))
          : <Alert alert={emptyMsg} /> }
      </div>
    </div>
  );
};

export default MyCampaigns;
