import React, { Fragment } from 'react';

const CampaignBasicInfo = () => {
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
                <i class="fas fa-tag"></i> Động vật
            </p>
            <p style={{fontSize: '110%', textAlign: 'justify'}}>Short Description goes here: Lorem ipsum dolor sit amet. Quis nostrud exercitation ullamco laboris tnisi ut aliquip commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
        </Fragment>
    );
}

export default CampaignBasicInfo;
