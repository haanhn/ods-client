import React from 'react';
import { getMaxStepsDone } from '../../../utils/createCampaignUtils';

const CreateCampaignProgressBar = (props) => {
    const { currentStep, setCurrentStep, steps, campaignStatus } = props;
    const maxStep = getMaxStepsDone(steps);
    const getclazz = (i) => {
        if (i === currentStep) {
            return 'active';
        } else if (steps && steps[i] === 1) {
            return 'finished';
        }
        // else if (i < stepsDone) {
        //     return 'finished';
        // }
    };

    const chooseStep0 = () => {
        const stepIndex = 0;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < maxStep && campaignStatus !== 'waiting') {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep1 = () => {
        const stepIndex = 1;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < maxStep && campaignStatus !== 'waiting') {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep2 = () => {
        const stepIndex = 2;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < maxStep && campaignStatus !== 'waiting') {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep3 = () => {
        const stepIndex = 3;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < maxStep && campaignStatus !== 'waiting') {
            setCurrentStep(stepIndex)
        };
    }
    const chooseStep4 = () => {
        const stepIndex = 4;
        console.log(`User choose stepIndex: ${stepIndex}`);
        if (stepIndex < maxStep && campaignStatus !== 'waiting') {
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
                        <i className="fas fa-star"></i>
                    </div>
                    <span>Bắt đầu</span>
                </li>
                <li className={getclazz(1)}
                    onClick={chooseStep1}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <span>Câu chuyện</span>
                </li>
                <li className={getclazz(2)} 
                    onClick={chooseStep2}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i className="fas fa-info"></i>
                    </div>
                    <span>Chi tiết</span>
                </li>
                <li className={getclazz(3)}
                    onClick={chooseStep3}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i className="fas fa-comment-dollar"></i>
                    </div>
                    <span>Tài khoản</span>
                </li>
                <li className={getclazz(4)}
                    onClick={chooseStep4}
                >
                    <div style={{ textAlign: 'center' }}>
                        <i className="fas fa-eye"></i>
                    </div>
                    <span>Xem trước</span>
                </li>
            </ul>
        </div>
    );
}

export default CreateCampaignProgressBar;