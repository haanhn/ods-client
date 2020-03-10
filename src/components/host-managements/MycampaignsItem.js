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
  }

  return (

    <div className='col-md-4 col-sm-6 col-12 my-campaign-item'>
      <Link to={route}>
        <div className='card shadow'>
          <div className='card-img-top my-card-img'>

            <img src={campaignThumbnail ? campaignThumbnail : '/images/default-data-images/default-campaign-cover.jpg'} alt='Card image cap' />
          </div>
          <div className='card-body text-center'>
            <h5 className='card-title'>{campaignTitle}</h5>
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
      </Link>
    </div>
  );
};

export default MycampaignsItem;
