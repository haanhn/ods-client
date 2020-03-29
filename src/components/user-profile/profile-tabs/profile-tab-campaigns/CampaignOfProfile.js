import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { routes } from '../../../../odsApi';
import { Link } from 'react-router-dom';

const CampaignOfProfile = (props) => {
    const { id, campaignTitle, campaignSlug, campaignThumbnail, Category,
        raise, campaignGoal } = props.campaign;
    const image = campaignThumbnail ? campaignThumbnail : '/images/default-data-images/default-campaign-cover.jpg';

    const routeCampaign = routes.getRouteCampaignDetail(campaignSlug);

    const styleImage = {
        background: `url(${'/images/default-data-images/default-campaign-cover.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return (
        <div className='campaign-of-profile'>
            <div style={{
                // backgroundImage: `url('https://wallpapershome.com/images/pages/pic_h/21486.jpg')`,
                // backgroundImage: `url('${`https://wallpapershome.com/images/pages/pic_h/21486.jpg`}')`,
                backgroundImage: `url('${image}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '120px'
            }}></div>
            
            <div>
                <h5>
                    <Link to={routeCampaign} style={{color: 'inherit'}}> {campaignTitle} </Link>
                    {/* <a href={routeCampaign} style={{color: 'inherit'}}> {campaignTitle} </a> */}
                </h5>
                <div className='description-box'>
                    <div>
                        <CurrencyFormat value={raise} displayType={'text'} thousandSeparator={true} />
                        <span style={{ margin: '0 2px' }}>/</span>
                        <CurrencyFormat value={campaignGoal} displayType={'text'} thousandSeparator={true} />
                        đ
                    </div>
                    <div style={{ color: '#555' }}>
                        <i class="fas fa-tag" style={{ marginRight: '5px', fontSize: '80%' }}></i>
                        {Category ? Category.categoryTitle : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignOfProfile;