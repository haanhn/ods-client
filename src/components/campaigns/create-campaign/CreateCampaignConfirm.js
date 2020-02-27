import React from 'react';

const CreateCampaignConfirm = (props) => {
    const { createCampaign } = props;

    return (
        <div>
            Đã sẵn sàng<br/> 
            <p>
            <button>Kiểm tra lại thông tin</button>
            </p>
            <button onClick={createCampaign} className='btn btn-primary'>Tạo chiến dịch</button>
        </div>
    );
}

export default CreateCampaignConfirm;