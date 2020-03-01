import React from 'react';

const CreateCampaignProgressBar = (props) => {
    // const { currentStep, stepsDone } = props;
    const currentStep = 2;
    const stepsDone = 3;
    const getclazz = (i) => {
        if (i === currentStep) {
            return 'active';
        } else if (i < stepsDone) {
            return 'finished';
        }
    };

    return (
        <div >
            {/* {stepTitle ?
                <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>{stepTitle}</h4> :
                null
            }
            <div className="progress" style={{ maxWidth: '500px', height: '20px', margin: '0 auto' }}>
                <div className="progress-bar bg-success progress-bar-striped"
                    role="progressbar"
                    style={{ width: widthStyle }}
                ></div>
            </div> */}
            
            {/* // step 2: image va story */}
            {/* // <i class="fas fa-pencil-alt"></i> */}
            {/* // step 1 */}
            {/* <i class="fas fa-star"></i> */}
            {/* <i class="fas fa-comment-dollar"></i> */}
            {/* <i class="fas fa-info"></i> */}
            {/* <i class="fas fa-rocket"></i> */}
            <ul className='create-campaign-progress' >
            <li className={getclazz(0)}>
            <div style={{ textAlign: 'center' }}>
                <i class="fas fa-star"></i>
            </div>
            <span>Bắt đầu</span>
        </li>
        <li className={getclazz(1)}>
            <div style={{ textAlign: 'center' }}>
                <i class="fas fa-pencil-alt"></i>
            </div>
            <span>Câu chuyện</span>
        </li>
        <li className={getclazz(2)}>
            <div style={{ textAlign: 'center' }}>
                <i class="fas fa-info"></i>
            </div>
            <span>Chi tiết</span>
        </li>
        <li className={getclazz(3)}>
            <div style={{ textAlign: 'center' }}>
                <i class="fas fa-comment-dollar"></i>
            </div>
            <span>Tài khoản</span>
        </li>
        <li className={getclazz(4)}>
            <div style={{ textAlign: 'center' }}>
                <i class="fas fa-eye"></i>
            </div>
            <span>Xem trước</span>
        </li>
        <li className={getclazz(5)}>
            <div style={{ textAlign: 'center' }}>
                <i class="fas fa-rocket"></i>
            </div>
            <span>Xác nhận</span>
        </li>
            </ul>
        </div>
    );
}

export default CreateCampaignProgressBar;