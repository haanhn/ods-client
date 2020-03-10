import React from 'react';
import { routes } from '../../../odsApi';
import '../../css/create-campaign.css';
import Alert from '../../common/Alert';

const DonateComplete = (props) => {
    const { completedDonation, history } = props;
    const { slug } = props.match.params;

    if (!completedDonation) {
        const route = routes.getRouteDonateCampaign(slug);
        history.replace(route);
    }

    // const alert = { type: 'success', message: 'Quyên góp của bạn đa' }

    return (
        <div className='donate-success' >
            Đơn quyên góp của bạn đã được chuyển đến chủ của chiến dịch. <br/> 
            Quyên góp của bạn sẽ được xác nhận qua email trong thời gian sớm nhất kể từ khi tiền được chuyển thành công đến người nhận.<br/>
            Bạn vui lòng kiếm tra mail để xem các thông tin cần thiết cho việc chuyển tiền.<br/>
            <b>Xin chân thành cảm ơn vì sự chia sẻ của bạn.</b>
        </div>
    );
}

export default DonateComplete;