import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

function CampaignItem(props) {

    const { imageUrl, campaignTitle, campaignSlug, campaignShortDescription, raised, goal, fundRaiserlocation } = props.campaign;
    const category = props.campaign.Category;

    return (
        // <div>
        // <!--Cause Block-->
        <div className="cause-block col-lg-4 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="600ms">
                <div className="image-box">
                    <figure className="image">
                        <a href="cause-single.html">
                            <img className="lazy-image" src={`/images/default-data-images/default-campaign-cover.jpg`} alt="" />
                        </a>
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
        </div>
        // </div>
    );
}

export default CampaignItem;
