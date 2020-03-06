import React, { Fragment } from 'react';

const CampaignBasicInfo = (props) => {
    const { campaignShortDescription, Category } = props.campaign;

    if (Object.keys(props.campaign).length === 0) {
        return null;
    }
    return (
        <Fragment>
            <div className="image-box" style={{ marginBottom: '10px' }}>
                <figure className="image">
                    <img className="lazy-image"
                        src="https://d8dkyqrw18ein.cloudfront.net/d/9ad9de2f96489b1aa92e83b1dd4f4166.jpg"
                    />
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
