import React, { useContext } from 'react';
import CampaignsContext from '../../context/campaigns/campaignsContext';

function Categories() {
    const campaignsContext = useContext(CampaignsContext);

    const { categories } = campaignsContext;

    const getCampaignsByCategory = (event) => {
        event.preventDefault();
        const categorySlug = event.target.value;
        campaignsContext.getCampaignsByCategory(categorySlug);
    }

    const categoriesJsx = categories.map(category => (
        // <button key={category.id} className="list-group-item list-group-item-action" 
        <button key={category.categorySlug} className="list-group-item list-group-item-action"
            onClick={getCampaignsByCategory} value={category.categorySlug}
            style={{ padding: '10px' }}>
            {category.categoryTitle}
        </button>
    ));

    categoriesJsx.unshift(
        <button key='get-all-public-campaigns' className="list-group-item list-group-item-action"
            onClick={campaignsContext.getAllAvailableCampaigns} style={{ padding: '10px' }}>
            Tất cả
        </button>
    )

    return (
        // <div className='auto-container'>
        // <div className='row clearfix'>
        // {/* <div className="list-group col-lg-2"> */}
        <div className="list-group">
            <span className="list-group-item list-group-item-action"><b>Thể loại</b></span>
            {categoriesJsx}
        </div>
        // </div>
        // </div>
    );
}

export default Categories;
