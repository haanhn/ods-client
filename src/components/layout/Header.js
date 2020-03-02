import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';
import AuthContext from '../../context/auth/authContext';

function Header() {
  const styles = {
    borderBottom: '3px #3cc88f solid'
  };

  const userStyles = {
    float: 'right',
    paddingTop: '50px'
  };

  const authContext = useContext(AuthContext);

  const { isLoggedIn, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      {/* <li className='current'>
        <Link to={routes.HOME}>Home</Link>
      </li>
      <li className=''>
        <Link to={routes.CAMPAIGNS}>View list campaigns</Link>
      </li> 
      <li className=''>
        <a href='causes.html'>About</a>
      </li>*/}
      <div style={userStyles}>
        <li>
          <a onClick={onLogout} href='#!'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {/* <li className='current'>
        <Link to={routes.HOME}>Home</Link>
      </li>
      <li className=''>
        <Link to={routes.CAMPAIGNS}>View list campaigns</Link>
      </li> */}
      <li className=''>
        <Link to={routes.PAGE_SIGN_IN}>Đăng nhập</Link>
      </li>
      <li className=''>
        <Link to={routes.PAGE_REGISTER}>Đăng ký</Link>
      </li>
    </Fragment>
  );

  return (
    // <!-- Header Upper -->
    <div className='header-upper' style={styles}>
      <div className='auto-container'>
        <div className='inner-container clearfix'>
          {/* <!--Logo--> */}
          {/* <div className="logo-box">
                        <div className="logo"><a href="index.html" title="LoveUs - Charity and Fundraising HTML Template"><img src="images/logo.png" alt="LoveUs - Charity and Fundraising HTML Template" title="LoveUs - Charity and Fundraising HTML Template"/></a></div>
                    </div> */}

          {/* <<<<<<<  */}
          {/* <!--Nav Box--> */}
          <div className='nav-outer clearfix'>
            {/* <!--Mobile Navigation Toggler--> */}
            <div className='mobile-nav-toggler'>
              <span className='icon flaticon-menu-1'></span>
            </div>

            {/* <!-- Main Menu --> */}
            <nav className='main-menu navbar-expand-md navbar-light'>
              <div
                className='collapse navbar-collapse show clearfix'
                id='navbarSupportedContent'
              >
                <ul className='navigation clearfix'>
                  <li className='current'>
                    <Link to={routes.HOME}>Home</Link>
                  </li>
                  <li className=''>
                    <Link to={routes.CAMPAIGNS}>Các chiến dịch</Link>
                  </li>
                  <li className=''>
                    <Link to={routes.CAMPAIGNS_CREATE}>Tạo chiến dịch</Link>
                  </li>
                  <li className=''>
                    <Link to={routes.MY_CAMPAIGNS}>Chiến dịch của tôi</Link>
                  </li>
                  {isLoggedIn ? authLinks : guestLinks}
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
