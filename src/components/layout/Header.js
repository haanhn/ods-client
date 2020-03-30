import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { routes, localStoreKeys } from '../../odsApi';
import AuthContext from '../../context/auth/authContext';
import MycampaignsContext from '../../context/mycampaigns/mycampaignsContext';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './ods-header.css';

function Header(props) {
  const token = localStorage.getItem(localStoreKeys.token);

  const authContext = useContext(AuthContext);
  const mycampaignsContext = useContext(MycampaignsContext);

  const { isLoggedIn, logout } = authContext;
  const { clearMycampaigns } = mycampaignsContext;

  const myId = localStorage.getItem(localStoreKeys.userId);
  let routeMyProfile = '';
  if (myId) {
    routeMyProfile = routes.getUserProfile(myId);
  }

  const onLogout = () => {
    logout();
    clearMycampaigns();
  };

  // const authLinks = (
  //   <Fragment>
  //     <div style={userStyles}>
  //       <li>
  //         <Link to={routes.HOME} onClick={onLogout}>
  //           <i className='fas fa-sign-out-alt'></i>{' '}
  //           <span className='hide-sm'>Logout</span>
  //         </Link>
  //       </li>
  //     </div>
  //   </Fragment>
  // );

  const routeCreateCampaign = routes.CAMPAIGNS_CREATE;
  return (
    <Fragment>
      <div className='ods-header'>
        <Navbar collapseOnSelect expand="lg"
        // bg="dark" variant="dark"
        >
          <Navbar.Brand href="#home">ODS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link ><Link to='/'>Home</Link></Nav.Link>
              <Nav.Link ><Link to='/campaigns'>Các chiến dịch</Link></Nav.Link>
              <Nav.Link ><Link to={routeCreateCampaign}>Tạo chiến dịch</Link></Nav.Link>
            </Nav>
            <Nav>
              {token ? (
                <NavDropdown title="Tài khoản" id="collasible-nav-dropdown" alignRight>
                  <NavDropdown.Item><Link to={routeCreateCampaign}>Tạo chiến dịch</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to='/my-campaigns'>Chiến dịch của tôi</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to='/my-donations'>Quyên góp của tôi</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <Link to='/my-account'>Tài khoản</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <Link to={routeMyProfile}>Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLogout}><Link to='/'>Đăng xuất</Link></NavDropdown.Item>
                </NavDropdown>
              ) : (
                  <Nav.Link><Link to='/login'>Đăng nhập</Link></Nav.Link>
                )}
              {/* <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">Dank memes</Nav.Link> */}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    </Fragment>
  );
}

export default Header;
