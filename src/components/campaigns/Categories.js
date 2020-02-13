import React, { useEffect, useContext } from 'react';
import CampaignsContext from '../../context/campaigns/campaignsContext';

function Categories() {
    const campaignsContext = useContext(CampaignsContext);

    const { categories } = campaignsContext;

    useEffect(() => {
        campaignsContext.getCategories();
        // eslint-disable-next-line
    }, []);

    const categoriesJsx = categories.map(category => (
        <button className="list-group-item list-group-item-action" style={{ padding: '10px' }}>
            {category.category_title}
        </button>
    ));

    return (
        // <div className='auto-container'>
        // <div className='row clearfix'>
            // {/* <div className="list-group col-lg-2"> */}
            <div className="list-group col">
                <span className="list-group-item list-group-item-action"><b>All Categories</b></span>
                {categoriesJsx}
                {/* <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a> */}
            </div>
        // </div>
        // </div>
        );
}

export default Categories;
