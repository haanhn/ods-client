import React, { useContext } from 'react';
import CampaignsContext from '../../context/campaigns/campaignsContext';

function Categories() {
    const campaignsContext = useContext(CampaignsContext);

    const { categories } = campaignsContext;

    const getCampaignsByCategory = (event) => {
        try {
            event.preventDefault();
            const categorySlug = event.target.value;
            campaignsContext.getCampaignsByCategory(categorySlug);
        } catch (error) {
            console.error(error);
        }
    }

    let categoriesJsx = [];

    if (categories && categories.length > 0) {
        categoriesJsx = categories.map(category => (
            // <button key={category.id} className="list-group-item list-group-item-action" 
            <button key={category.categorySlug} className="list-group-item list-group-item-action"
                onClick={getCampaignsByCategory} value={category.categorySlug}
                style={{ padding: '10px' }}>
                {category.categoryTitle}
            </button>
        ));
    }

    categoriesJsx.unshift(
        <button key='get-all-public-campaigns' className="list-group-item list-group-item-action"
            onClick={campaignsContext.getAllAvailableCampaigns} style={{ padding: '10px' }}>
            Tất cả
        </button>
    );

    return (
        <div className="list-group">
            <span className="list-group-item list-group-item-action"><b>Thể loại</b></span>
            {categoriesJsx}
        </div>
    );
}

export default Categories;
