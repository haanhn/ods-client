import React, { Fragment } from 'react';

const CampaignBasicInfo = (props) => {
    const { campaignThumbnail, campaignShortDescription, Category } = props.campaign;

    if (Object.keys(props.campaign).length === 0) {
        return null;
    }
    return (
        <Fragment>
            <div className="image-box" style={{ marginBottom: '10px' }}>
                <figure className="image">
                    <img className="lazy-image"
                        src={campaignThumbnail ? campaignThumbnail : `/images/default-data-images/default-campaign-cover.jpg`} />
                </figure>
            </div>
            <p style={{ marginBottom: '5px' }}>
                <i class="fas fa-tag" style={{ marginRight: '10px' }}></i>
                {Category ? Category.categoryTitle : ''}
                {/* {Category.categoryTitle} */}
            </p>
            <p style={{ fontSize: '110%', textAlign: 'justify' }}>
                {campaignShortDescription}
            </p>

        </Fragment>
    );
}

export default CampaignBasicInfo;
