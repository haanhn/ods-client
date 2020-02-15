import React from 'react';
import './campaign.css';

const ButtonDonate = () => {
    const styleButtonDonate = {
        
    };
    return (
        <div>
            <a href="donate.html"
                className="theme-btn btn-style-one btn-donate btn-donate"
                style={styleButtonDonate}>
                <span className="btn-title">Quyên góp</span>
            </a>
        </div>
    );
}

export default ButtonDonate;