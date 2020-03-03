import React, { useEffect } from 'react';
import '../campaign2.css';

const CampaignTabMoreInfo = (props) => {
    const { description } = props;

    useEffect(() => {
        const divDescription = document.getElementById('campaignDetailDescription');
        if (description && description.trim().length > 0) {
            divDescription.innerHTML = description;
        } else {
            divDescription.innerHTML = '<p><i>(Không có phần mô tả thêm về chiến dịch)</i></p>' ;
        }
    }, []);

    return (
        <div className='campaign-tab-more-info'>
            {/* <h3>Thông tin</h3> */}
            <div id='campaignDetailDescription' >
            </div>
        </div>
    );
}

export default CampaignTabMoreInfo;

