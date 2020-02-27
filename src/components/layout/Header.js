import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

function Header() {
    const styles = {
        borderBottom: "3px #3cc88f solid"
    };
    return (
        // <!-- Header Upper -->
        <div className="header-upper" style={ styles }>
            <div className="auto-container">
                <div className="inner-container clearfix">
                    {/* <!--Logo--> */}
                    {/* <div className="logo-box">
                        <div className="logo"><a href="index.html" title="LoveUs - Charity and Fundraising HTML Template"><img src="images/logo.png" alt="LoveUs - Charity and Fundraising HTML Template" title="LoveUs - Charity and Fundraising HTML Template"/></a></div>
                    </div> */}

                    {/* <!--Nav Box--> */}
                    <div className="nav-outer clearfix">
                        {/* <!--Mobile Navigation Toggler--> */}
                        <div className="mobile-nav-toggler"><span className="icon flaticon-menu-1"></span></div>

                        {/* <!-- Main Menu --> */}
                        <nav className="main-menu navbar-expand-md navbar-light">
                            <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                <ul className="navigation clearfix">
                                    <li className="current"><Link to={routes.HOME}>Home</Link></li>
                                    <li className=""><Link to={routes.CAMPAIGNS}>Các chiến dịch</Link></li>
                                    <li className=""><Link to={routes.CAMPAIGNS_CREATE}>Tạo chiến dịch</Link></li>
                                    <li className=""><a href="causes.html">About</a></li>
                                    <li className=""><a href="causes.html">Sign in</a></li>

                                    {/* <li className="dropdown"><a href="blog.html">Blog</a>
                                        <ul>
                                            <li><a href="blog.html">Our Blog</a></li>
											<li><a href="blog-single.html">Blog Single</a></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                        {/* Main Menu End */}
                    </div>
                </div>
            </div>
        </div>
        // End Header Upper                 
    );
}

export default Header;