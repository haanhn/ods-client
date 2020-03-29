import React, { useEffect, useContext } from 'react';
import CampaignsContext from '../../context/campaigns/campaignsContext';

function Categories() {
    const campaignsContext = useContext(CampaignsContext);

    const { categories } = campaignsContext;

    const categoriesJsx = categories.map(category => (
        <button key={category.id} className="list-group-item list-group-item-action" 
            style={{ padding: '10px' }}>
            {category.categoryTitle}
        </button>
    ));

    return (
        // <div className='auto-container'>
        // <div className='row clearfix'>
            // {/* <div className="list-group col-lg-2"> */}
            <div className="list-group">
                <span className="list-group-item list-group-item-action"><b>Thể loại</b></span>
                {categoriesJsx}
                {/* <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a> */}
            </div>
        // </div>
        // </div>
        );
}

export default Categories;
