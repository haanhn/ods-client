import React from 'react';

const MycampaignsItem = props => {
  const { campaignTitle, email } = props.mycampaign;
  const type = props.mycampaign.campaignStatus;

  return (
    <div className='col-md-4'>
      <div className='card shadow'>
        <img className='card-img-top' src='' alt='Card image cap' />
        <div className='card-body text-center'>
          <h5 className='card-title'>{campaignTitle}</h5>
          <p className='text-primary text-center' style={{ fontSize: 20 }}>
            {' '}
            <span
              className={
                'badge ' +
                (type === 'public'
                  ? 'badge-success'
                  : type === 'closed'
                  ? 'badge-secondary'
                  : type === 'waiting'
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
