import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';
import CampaignItemProgress from './list-campaigns/CampaignItemProgress';

function CampaignItem(props) {

    const {
        campaignThumbnail, campaignTitle, campaignSlug, campaignShortDescription,
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
                    <Link to={routeCampaign} style={{ color: 'inherit' }}> {campaignTitle} </Link>
                </h5>
                <div className='description-box'>
                    <div>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: '5px', fontSize: '80%' }}></i> {campaignRegion}
                    </div>
                    <div>
                        <i className="fas fa-tag" style={{ marginRight: '5px', fontSize: '80%' }}></i>
                        {Category ? Category.categoryTitle : ''}
                    </div>
                    {/* <div className='description-content'>
                        { campaignShortDescription }
                    </div> */}
                </div>
                <div>
                    <CampaignItemProgress raised={raise} goal={campaignGoal}
                        campaignEndDate={campaignEndDate} campaignStatus={campaignStatus} />
                </div>
            </div>
            {/* <CurrencyFormat value={raise} displayType={'text'} thousandSeparator={true} />
                        <span style={{ margin: '0 2px' }}>/</span>
                        <CurrencyFormat value={campaignGoal} displayType={'text'} thousandSeparator={true} />
                        đ */}
        </div>
    );

    const a = <div className="cause-block col-lg-4 col-md-6 col-sm-12">
        <div className="inner-box wow fadeInUp">
            <div className="image-box">
                <figure className="image">
                    <img className="lazy-image"
                        src={campaignThumbnail ? campaignThumbnail : `/images/default-data-images/default-campaign-cover.jpg`}
                        alt="" />
                </figure>
            </div>
            {/* <div className="donate-info">
        <div className="progress-box">
            <div className="bar">
                <div className="bar-inner count-bar" data-percent="60%">
                <div className="count-text">70%</div>
                </div>
            </div>
            </div>
        <div className="donation-count clearfix"><span className="raised">
        <strong>Quyên được:</strong> {raised} vnd </span> <span className="goal">
                <strong>Mục tiêu:</strong> {goal} vnd </span></div>
            </div> */}
            <div className="lower-content">
                <h3><Link to={`${routes.CAMPAIGNS}/${campaignSlug}`}> {campaignTitle} </Link></h3>
                {/* <span>Location: {fundRaiserlocation} </span><br /> */}
                <span>Category: hello </span>
                <div className="text"> {campaignShortDescription} </div>

                <div style={{ padding: '10px' }}>

                    <div className="progress">
                        <div className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "25%" }}
                        ></div>
                        <div style={{ paddingTop: '10px' }}>Quyên được: <strong>10000 / 5000000 vnd</strong></div>
                    </div>
                </div>
                {/* <div className="link-box"><a href="cause-single.html" className="theme-btn btn-style-two"><span className="btn-title">Read More</span></a></div> */}
            </div>
        </div>
    </div>;
}

export default CampaignItem;
