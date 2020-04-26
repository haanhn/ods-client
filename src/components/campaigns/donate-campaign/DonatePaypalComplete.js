import React from 'react';
import '../../css/create-campaign.css';
import Alert from '../../common/Alert';
import { routes } from '../../../odsApi';

const DonateComplete = (props) => {
    const slug = props.match.params.slug;
    const routeCampaign = routes.getRouteCampaignDetail(slug);
    const routeCampaignDonate = routes.getRouteDonateCampaign(slug);
    return (
        <div className='donate-success' >
            <Alert alert={alertSuccess} />
            <b>Chân thành cảm ơn vì sự chia sẻ của bạn.</b><br/>
            <a href={routeCampaign} className='btn btn-outline-success' style={{marginRight: '10px'}}>Quay lại chiến dịch</a>
            <a href={routeCampaignDonate} className='btn btn-success'>Quyên góp lần nữa</a>
        </div>
    );
}
const alertSuccess = {
    type: 'success',
    msg: 'Quyên góp thành công'
};

export default DonateComplete;