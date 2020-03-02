import React from 'react';

const CreateCampaignProgressBar = (props) => {
    const { currentStep, stepsDone, setCurrentStep } = props;
    const getclazz = (i) => {
        if (i === currentStep) {
            return 'active';
        } else if (i < stepsDone) {
            return 'finished';
        }
    };

    const chooseStep0 = () => {
        const stepIndex = 0;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < stepsDone) {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep1 = () => {
        const stepIndex = 1;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < stepsDone) {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep2 = () => {
        const stepIndex = 2;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < stepsDone) {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep3 = () => {
        const stepIndex = 3;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < stepsDone) {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep4 = () => {
        const stepIndex = 4;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < stepsDone) {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep5 = () => {
        const stepIndex = 5;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < stepsDone) {
            setCurrentStep(stepIndex)
        };
    }

    return (
        <div >

            <ul className='create-campaign-progress' >
                <li className={getclazz(0)}
                    onClick={chooseStep0}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i class="fas fa-star"></i>
                    </div>
                    <span>Bắt đầu</span>
                </li>
                <li className={getclazz(1)}
                    onClick={chooseStep1}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                    <span>Câu chuyện</span>
                </li>
                <li className={getclazz(2)} 
                    onClick={chooseStep2}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i class="fas fa-info"></i>
                    </div>
                    <span>Chi tiết</span>
                </li>
                <li className={getclazz(3)}
                    onClick={chooseStep3}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i class="fas fa-comment-dollar"></i>
                    </div>
                    <span>Tài khoản</span>
                </li>
                <li className={getclazz(4)}
                    onClick={chooseStep4}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i class="fas fa-eye"></i>
                    </div>
                    <span>Xem trước</span>
                </li>
                {/* <li className={getclazz(5)}
                    onClick={chooseStep5}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i class="fas fa-rocket"></i>
                    </div>
                    <span>Xác nhận</span>
                </li> */}
            </ul>
        </div>
    );
}

export default CreateCampaignProgressBar;