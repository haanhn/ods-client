import React from 'react';
import Alert from '../../common/Alert';

const CreateCampaignSuccess = () => {
    const message = 'Tạo chiến dịch hoàn tất';
    const alert = { type: 'success', msg: message };

    return (
        <div style={{ minHeight: '70vh' }}>
            <div style={{ textAlign: 'center', maxWidth: '420px', margin: '0 auto' }}>
                <Alert alert={alert} />
            Thời gian xác nhận từ 1-3 ngày làm việc.<br />
            Xin bạn kiểm tra email để cập nhật thông tin.<br />
                <button className='btn btn-success'>Đến trang chiến dịch của tôi</button>
            </div>
        </div>
    );
}

export default CreateCampaignSuccess;
