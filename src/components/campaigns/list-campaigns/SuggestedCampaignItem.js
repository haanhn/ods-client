import React from 'react';
import { routes } from '../../../odsApi';
import CampaignItemProgress from './CampaignItemProgress';

function CampaignItem(props) {

    const {
        campaignThumbnail, campaignTitle, campaignSlug,
        campaignRegion, raise, campaignGoal,
        campaignEndDate, campaignStatus } = props.campaign;
    const Category = props.campaign.Category;
    const image = campaignThumbnail ? campaignThumbnail : '/images/default-data-images/default-campaign-cover.jpg';

    const routeCampaign = routes.getRouteCampaignDetail(campaignSlug);

    return (
        <div className='campaign-item'>
            <div style={{
                backgroundImage: `url('${image}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '170px'
            }}></div>

            <div>
                <h5>
                    <a href={routeCampaign} style={{ color: 'inherit' }}> {campaignTitle} </a>
                </h5>
                <div className='description-box'>
                    <div>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: '5px', fontSize: '80%' }}></i> {campaignRegion}
                    </div>
                    <div>
                        <i className="fas fa-tag" style={{ marginRight: '5px', fontSize: '80%' }}></i>
                        {Category ? Category.categoryTitle : ''}
                    </div>
                </div>
                <div>
                    <CampaignItemProgress raised={raise} goal={campaignGoal}
                        campaignEndDate={campaignEndDate} campaignStatus={campaignStatus} />
                </div>
            </div>
        </div>
    );
}

export default CampaignItem;
