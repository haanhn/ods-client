import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './campaign2.css';

function CampaignDonorItem(props) {
    const { donationAmount, anonymous, User } = props.donation;

    let avatarJsx = <img src='/images/default-data-images/default-user-avatar.png' className='col' />;
    if (!anonymous) {
        if (User.avatar) {
            avatarJsx = <img src={User.avatar} className='col' />;
        }
    }

    return (
        <div className='row clearfix donor-item col-md-4 col-sm-6'>
            {/* <div className='grid-col grid-col-1-of-4'> */}
            {avatarJsx}
            {/* <img src={User.avatar ? User.avatar : '/images/default-data-images/default-user-avatar.png'}  */}
            {/* className='avatar' /> */}
            {/* </div> */}
            <div className='col'>
                <h5>{anonymous ? 'Ẩn danh' : User.fullname}</h5>
                <span style={{ fontSize: '95%' }} >
                    <CurrencyFormat value={donationAmount} displayType={'text'} thousandSeparator={true} />
                    &nbsp; vnđ
                </span>
            </div>

        </div>
    );
}

export default CampaignDonorItem;