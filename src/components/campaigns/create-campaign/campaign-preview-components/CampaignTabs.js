import React from 'react';

const CampaignTabs = () => {
    return (
        <nav className="navbar navbar-expand-sm">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <span className="nav-link" >Chi tiết</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" >Bài viết</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" >Bình luận</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" >Quyên góp</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" >Đánh giá</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" >Chi phí</span>
                </li>
            </ul>
        </nav>
    );
}

export default CampaignTabs;