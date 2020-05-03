import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './campaign2.css';
import '../css/icon.css';
import { getDateTimeFormatDD_MM_YYYY_HH_MM_SS } from '../../utils/commonUtils';

function CampaignDonorItem(props) {
    const { viewDonation } = props;
    const { donationAmount, donationMethod, outsideDonor, anonymous, createdAt, User } = props.donation;
    const date = getDateTimeFormatDD_MM_YYYY_HH_MM_SS(createdAt);

    let avatarJsx = <img src='/images/default-data-images/default-user-avatar.png' className='col' alt='' />;
    let fullname = 'Ẩn danh';
    
    if (!anonymous && donationMethod !== 'outside') {
        if (User && User.avatar) {
            avatarJsx = <img src={User.avatar} className='col' alt='' />;
        }
    }

    if (User) {
        if (!anonymous && donationMethod === 'outside') {
            fullname = outsideDonor ? outsideDonor : 'Ẩn danh';
        } else if (!anonymous && donationMethod !== 'outside') {
            fullname = User.fullname;
        }
    }

    if (props.donation) {
        props.donation.fullname = fullname;
    }

    return (
        <div className='row clearfix donor-item col-md-4 col-sm-6'>
            {/* <div className='grid-col grid-col-1-of-4'> */}
            {avatarJsx}
            <div className='col'>
                <h5>
                    {fullname}
                    <i class="fas fa-info-circle icon-small theme_color" style={{marginLeft: '7px'}}
                        onClick={() => viewDonation(props.donation)} ></i>
                </h5>
                <div style={{ fontSize: '80%', lineHeight: '19px' }}> {date} </div>
                <span style={{ fontSize: '95%' }} >
                    <CurrencyFormat value={donationAmount} displayType={'text'} thousandSeparator={true} />
                    &nbsp; vnđ
                </span>
            </div>

        </div>
    );
}

export default CampaignDonorItem;