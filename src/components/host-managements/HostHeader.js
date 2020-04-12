import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { routes } from '../../odsApi';
import './host-header.css';

const HostHeader = (props) => {
    const { slug } = props;
    const routeDashboard = routes.getRouteMyCampaignDetail(slug);
    const routeInfo = routes.getRouteMyCampaignInfo(slug);
    const routePosts = routes.getRouteMyCampaignPosts(slug);
    const routeDonations = routes.getRouteMyCampaignDonations(slug);
    const routeExpenses = routes.getRouteMyCampaignExpenses(slug);

    return (
        <div className='host-header'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to={routeDashboard}>Dashboard</Link></Nav.Link>
                        <Nav.Link ><Link to={routeInfo}>Sửa chiến dịch</Link></Nav.Link>
                        <Nav.Link ><Link to={routePosts}>Bài viết</Link></Nav.Link>
                        <Nav.Link ><Link to={routeExpenses}>Chi phí</Link></Nav.Link>
                        <Nav.Link ><Link to={routeDonations}>Quyên góp</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HostHeader;