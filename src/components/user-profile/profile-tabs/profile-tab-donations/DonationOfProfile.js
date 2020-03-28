import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { routes } from '../../../../odsApi';
import { getDateFormatDD_MM_YYYY } from '../../../../utils/commonUtils';

const DonationOfProfile = (props) => {
    const { Campaign, donationAmount, createdAt } = props.donation;
    const slug = Campaign && Campaign.campaignSlug ? Campaign.campaignSlug : '';
    
    const campaignTitle = Campaign && Campaign.campaignTitle ? Campaign.campaignTitle : '';
    const img = Campaign && Campaign.campaignThumbnail ? Campaign.campaignThumbnail : '/images/default-data-images/default-campaign-cover.jpg';
    const dateFormat = getDateFormatDD_MM_YYYY(createdAt);

    const routeCampaign = routes.getRouteCampaignDetail(slug);
    
    return (
        <div className='campaign-of-profile'>
            <div style={{
                backgroundImage: `url('${img}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '120px'
            }}></div>
            <div>
                <h5>
                <a href={routeCampaign}> {campaignTitle} </a>
                </h5>
                <div className='description-box'>
                    <div>
                        <i class="fas fa-hand-holding-usd" style={{ marginRight: '5px', fontSize: '112%' }}></i>
                        <CurrencyFormat value={donationAmount} displayType={'text'} thousandSeparator={true} />
                        đ
                    </div>
                    <div style={{ color: '#555', fontStyle: 'italic' }}>
                        { dateFormat }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DonationOfProfile;

// const img = '/images/default-data-images/default-campaign-cover.jpg';
// const img = 'https://wallpapershome.com/images/pages/pic_h/21486.jpg';

// backgroundImage: `url('https://wallpapershome.com/images/pages/pic_h/21486.jpg')`,
// backgroundImage: `url('${`https://wallpapershome.com/images/pages/pic_h/21486.jpg`}')`,