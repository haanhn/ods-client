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

    return (
        <div className='donate-success' >
            {/* Đơn quyên góp của bạn đã được chuyển đến chủ của chiến dịch. <br/>  */}
            <Alert alert={alertSuccess} />
            Quyên góp của bạn sẽ được xác nhận qua email từ 1-7 ngày.<br/>
            Xin bạn kiếm tra mail để xem các thông tin cần thiết cho việc chuyển tiền.<br/>
            <b>Chân thành cảm ơn vì sự chia sẻ của bạn.</b>
        </div>
    );
}
const alertSuccess = {
    type: 'success',
    msg: 'Quyên góp thành công'
};

export default DonateComplete;