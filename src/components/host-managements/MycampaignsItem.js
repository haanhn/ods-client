import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

const MycampaignsItem = props => {
  const { campaignTitle, campaignThumbnail, campaignSlug } = props.mycampaign;
  const status = props.mycampaign.campaignStatus;

  const route = routes.getRouteMyCampaignDetail(campaignSlug);

  let type = 'đang mở';
  if (status === 'closed') {
    type = 'đã đóng';
  } else if (status === 'waiting') {
    type = 'chờ xác nhận';
  } else if (status === 'setting') {
    type = 'đang tạo';
  } else if (status === 'block') {
    type = 'bị khóa';
  }

  const image = campaignThumbnail ? campaignThumbnail : '/images/default-data-images/default-campaign-cover.jpg';

  return (

    <div className='col-md-4 col-sm-6 col-12 my-campaign-item'>

      <div className='card shadow'>
        <div className='card-img-top'
          style={{
            backgroundImage: `url('${image}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '170px'
          }} ></div>
        <div style={{ textAlign: 'center', paddingTop: '7px' }}>
          <Link to={route}>
            <h5 style={{marginBottom: '7px', fontSize: '110%'}}>{campaignTitle}</h5>
          </Link>
          <p className='text-primary text-center' style={{ fontSize: 20 }}>
            <span
              className={
                'badge ' +
                (status === 'public'
                  ? 'badge-success'
                  : status === 'close'
                    ? 'badge-secondary'
                    : status === 'waiting'
                      ? 'badge-warning'
                      : 'badge-danger')
              }
            >
              {type}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MycampaignsItem;
