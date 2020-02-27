import React from 'react';

const CreateCampaignProgressBar = (props) => {
    const { step, totalSteps } = props;
    const width = step / totalSteps * 100;
    const widthStyle = step / totalSteps * 100 + '%';
    let stepTitle = '';

    switch (step) {
        case 1:
            stepTitle = 'Thông tin cơ bản';
            break;
        case 2:
            stepTitle = 'Chọn ảnh bìa';
            break;
        case 3:
            stepTitle = 'Câu chuyện của bạn';
            break;
        case 4:
            stepTitle = 'Phương thức nhận tiền';
            break;
        case 5:
            stepTitle = 'Sẵn sàng';
            break;
        case 6:
            stepTitle = 'Hoàn thành';
            break;
        default:
            stepTitle = null;
    }

    return (
        <div style={{ marginBottom: '25px' }}>
            {stepTitle ?
                <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>{stepTitle}</h4> :
                null
            }
            <div className="progress" style={{ maxWidth: '500px', height: '20px', margin: '0 auto' }}>
                <div className="progress-bar bg-success progress-bar-striped"
                    role="progressbar"
                    style={{ width: widthStyle }}
                ></div>
            </div>
        </div>
    );
}

export default CreateCampaignProgressBar;