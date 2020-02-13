import React from 'react';

function CampaignItem(props) {
    const { imageUrl, title, shortDescription, raised, goal, fundRaiserlocation, category} = props.campaign;
    return (
        // <div>
        // <!--Cause Block-->
        <div className="cause-block col-lg-4 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="600ms">
                <div className="image-box">
                    <figure className="image">
                        <a href="cause-single.html">
                            <img className="lazy-image" src={imageUrl} alt="" />
                        </a>
                    </figure>
                </div>
                <div className="donate-info">
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
                </div>
                <div className="lower-content">
                    <h3><a href="cause-single.html"> {title} </a></h3>
                    <span>Location: {fundRaiserlocation} </span><br/>
                    <span>Category: {category} </span>
                    <div className="text"> {shortDescription} </div>
                    {/* <div className="link-box"><a href="cause-single.html" className="theme-btn btn-style-two"><span className="btn-title">Read More</span></a></div> */}
                </div>
            </div>
        </div>
        // </div>
    );
}

export default CampaignItem;
