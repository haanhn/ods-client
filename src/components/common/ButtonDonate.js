import React from 'react';
import './campaign.css';
import { routes } from '../../odsApi';
import { Link } from 'react-router-dom';

const ButtonDonate = () => {
    const styleButtonDonate = {
        
    };
    return (
        <div>
            <Link to={routes.CAMPAIGN_DONATE}
                className="theme-btn btn-style-one btn-donate btn-donate"
                style={styleButtonDonate}>
                <span className="btn-title">Quyên góp</span>
            </Link>
        </div>
    );
}

export default ButtonDonate;