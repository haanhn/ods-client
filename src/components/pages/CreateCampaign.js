import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import CreateCampaignProgressBar from '../campaigns/create-campaign/CreateCampaignProgressBar';
import CreateCampaignBasicInfo from '../campaigns/create-campaign/CreateCampaignBasicInfo';
import CreateCampaignImageCover from '../campaigns/create-campaign/CreateCampaignImageCover';
import CreateCampaignStory from '../campaigns/create-campaign/CreateCampaignStory';
import CreateCampaignMoneyMethods from '../campaigns/create-campaign/CreateCampaignMoneyMethods';
import CreateCampaignConfirm from '../campaigns/create-campaign/CreateCampaignConfirm';
import CreateCampaignCompleted from '../campaigns/create-campaign/CreateCampaignCompleted';
import { odsBase } from '../../odsApi';
import '../campaigns/campaign2.css';
import reducer from '../campaigns/create-campaign/createCampaignReducer';
import CreateCampaignName from '../campaigns/create-campaign/CreateCampaignName';
import '../css/create-campaign.css';
import CreateCampaignContentBox from '../campaigns/create-campaign/CreateCampaignContentBox';
import CreateCampaignMoreInfo from '../campaigns/create-campaign/CreateCampaignMoreInfo';
import CreateCampaignDetails from '../campaigns/create-campaign/CreateCampaignDetails';

const CreateCampaign = () => {

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         setLoading();
    //         const categories = await axios.get(`${odsBase}/categories`);
    //         setCategories(categories.data);
    //         setCampaignCategory(categories.data[0].id);

    //         console.log(categories.data);
    //     }
    //     fetchCategories();

    //     //eslint-disable-next-line
    // }, []);

    // const initialState = {
    //     currentStep: 1,
    //     loading: false,
    //     categories: null,
    //     //campaign
    //     campaign: {
    //         title: '',
    //         goal: '',
    //         endDate: null,
    //         category: null,
    //         shortDescription: '',
    //         image: null,
    //         story: '',
    //     },
    //     user: {
    //         address: 'TP.HCM',
    //         bankAccount: {
    //             bankName: 'Techcombank',
    //             bankAgency: '',
    //             accountName: 'Ha Anh',
    //             accountNumber: '932849083208'
    //         }
    //     }
    // };

    // const [state, dispatch] = useReducer(reducer, initialState);

    // let stepJsx = null;
    // switch (state.currentStep) {
    //     case 1:
    //         stepJsx = <CreateCampaignBasicInfo
    //             categories={state.categories}
    //             campaign={state.campaign}
    //             setBasicInfo={setBasicInfo}
    //             setCurrentStep={setCurrentStep}
    //         />;
    //         break;
    // case 2:
    //     stepJsx = <CreateCampaignImageCover
    //         image={state.campaign.image} setImage={chooseImage} setCurrentStep={setCurrentStep} />;
    //     break;
    // case 3:
    //     stepJsx = <CreateCampaignStory story={state.campaign.story}
    //         setCampaignStory={setStory}
    //         setCurrentStep={setCurrentStep} />;
    //     break;
    // case 4:
    //     stepJsx = <CreateCampaignMoneyMethods user={state.user}
    //         setUserAddress={setAddress}
    //         setUserBankAccount={setBankAccount}
    //         setCurrentStep={setCurrentStep} />;
    //     break;
    // case 5:
    //     stepJsx = <CreateCampaignConfirm createCampaign={createCampaign} />;
    //     break;
    // case 6:
    //     stepJsx = <CreateCampaignCompleted message='Tạo chiến dịch thành công' />;
    //     break;
    // default:
    //     stepJsx = <CreateCampaignBasicInfo title={state.title}
    //         goal={state.goal}
    //         endDate={state.endDate}
    //             category={state.category}
    //             shortDescription={state.shortDescription}
    //             setBasicInfo={setBasicInfo}
    //             setCurrentStep={setCurrentStep} />;
    // }

    // if (state.loading) {
    //     return <div>LOADING..</div>;
    // }

    return (
        <div className='container'>
            <h2>Tạo Chiến dịch mới</h2>

            <CreateCampaignProgressBar step={1} totalSteps={6} />
            <CreateCampaignContentBox>

                {/* <CreateCampaignName /> */}
                <CreateCampaignMoreInfo />
                {/* <CreateCampaignDetails /> */}
            </CreateCampaignContentBox>
        </div>
    );
}

export default CreateCampaign;

const userId = '13d96397-7545-4061-b4b7-216c5a3b09be';
const categoryId = '7cc90ed0-25f2-4336-9247-77c71000dcf7';