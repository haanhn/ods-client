import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

const CampaignTabs = () => {
    return (
        // <div className='campaign-tabs'>
        //     <ul className="nav">
        //         <li className="nav-item">
        //             <Link  to={routes.CAMPAIGN_DETAIL}>Thông tin thêm</Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link  to={`${routes.CAMPAIGN_DETAIL}/updates`}>Cập nhật</Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link  to={`${routes.CAMPAIGN_DETAIL}/comments`}>Bình luận</Link>
        //         </li>
        //         <li className="nav-item">
        //         {/* className="nav-link" */}
        //             <Link  to={`${routes.CAMPAIGN_DETAIL}/donations`}>Thông tin quyên góp</Link>
        //         </li>
        //         <li className="nav-item">
        //         {/* className="nav-link" */}
        //             <Link  to={`${routes.CAMPAIGN_DETAIL}/ratings`}>Đánh giá</Link>
        //         </li>
        //     </ul>
        // </div>
        <nav className="navbar navbar-expand-sm">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to={routes.CAMPAIGN_DETAIL}>Thông tin</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Cập nhật</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`${routes.CAMPAIGN_DETAIL}/comments`}>Bình luận</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Thông tin thêm</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Thông tin thêm</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`${routes.CAMPAIGN_DETAIL}/ratings`}>Đánh giá</Link>
                </li>
            </ul>
        </nav>
    );
}

export default CampaignTabs;
