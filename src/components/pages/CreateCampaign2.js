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

const CreateCampaign2 = () => {

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading();
            const categories = await axios.get(`${odsBase}/categories`);
            setCategories(categories.data);
            setCampaignCategory(categories.data[0].id);

            console.log(categories.data);
        }
        fetchCategories();

        //eslint-disable-next-line
    }, []);

    const initialState = {
        currentStep: 1,
        loading: false,
        categories: null,
        //campaign
        campaign: {
            title: '',
            goal: '',
            endDate: null,
            category: null,
            shortDescription: '',
            image: null,
            story: '',
        },
        user: {
            address: 'TP.HCM',
            bankAccount: {
                bankName: 'Techcombank',
                bankAgency: '',
                accountName: 'Ha Anh',
                accountNumber: '932849083208'
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setCurrentStep = (current) => {
        console.log('current step: ' + current);
        dispatch({
            type: types.SET_CURRENT_STEP,
            payload: current
        });
    }

    const setLoading = () => dispatch({ type: types.SET_LOADING });

    const setCategories = (categories) => dispatch({
        type: types.SET_CATEGORIES,
        payload: categories
    });

    const setCampaignCategory = (categoryId) => dispatch({
        type: types.SET_CATEGORY,
        payload: categoryId
    });

    const setBasicInfo = (info) => {
        console.log(info);
        dispatch({
            type: types.SET_BASIC_INFO,
            payload: info
        });
    }

    const chooseImage = (file) => {
        dispatch({
            type: types.SET_IMAGE,
            payload: file
        });
    }

    const setStory = (story) => {
        dispatch({
            type: types.SET_STORY,
            payload: story
        });
    }

    const setAddress = (address) => {
        dispatch({
            type: types.SET_ADDRESS,
            payload: address
        });
    }

    const setBankAccount = (bankAccount) => {
        dispatch({
            type: types.SET_BANK_ACCOUNT,
            payload: bankAccount
        });
    }

    const createCampaign = async () => {
        try {
            await axios.post('http://localhost:3001/campaigns', {
                "userId": "13d96397-7545-4061-b4b7-216c5a3b09be",
                campaign: {
                    title: state.campaign.title,
                    goal: state.campaign.goal,
                    endDate: state.campaign.endDate,
                    shortDescription: state.campaign.shortDescription,
                    story: state.campaign.story,
                    category: "5442ef79-9774-4c13-aec8-195ea183daec"
                }
            });
            // alert('Tạo chiến dịch thành công');
            setCurrentStep(6);
        } catch (error) {
            console.log(error);
        }
    }

    let stepJsx = null;
    switch (state.currentStep) {
        case 1:
            stepJsx = <CreateCampaignBasicInfo
                categories={state.categories}
                campaign={state.campaign}
                setBasicInfo={setBasicInfo}
                setCurrentStep={setCurrentStep}
            />;
            break;
        case 2:
            stepJsx = <CreateCampaignImageCover
                image={state.campaign.image} setImage={chooseImage} setCurrentStep={setCurrentStep} />;
            break;
        case 3:
            stepJsx = <CreateCampaignStory story={state.campaign.story}
                setCampaignStory={setStory}
                setCurrentStep={setCurrentStep} />;
            break;
        case 4:
            stepJsx = <CreateCampaignMoneyMethods user={state.user}
                setUserAddress={setAddress}
                setUserBankAccount={setBankAccount}
                setCurrentStep={setCurrentStep} />;
            break;
        case 5:
            stepJsx = <CreateCampaignConfirm createCampaign={createCampaign} />;
            break;
        case 6:
            stepJsx = <CreateCampaignCompleted message='Tạo chiến dịch thành công' />;
            break;
        default:
            stepJsx = <CreateCampaignBasicInfo title={state.title}
                goal={state.goal}
                endDate={state.endDate}
                category={state.category}
                shortDescription={state.shortDescription}
                setBasicInfo={setBasicInfo}
                setCurrentStep={setCurrentStep} />;
    }

    if (state.loading) {
        return <div>LOADING..</div>;
    }

    return (
        <div className='auto-container'>
            <h2>Tạo Chiến dịch mới</h2>

            <CreateCampaignProgressBar step={state.currentStep} totalSteps={6} />

            {stepJsx}

        </div>
    );
}

export const types = {
    SET_CURRENT_STEP: 'SET_CURRENT_STEP',
    SET_LOADING: 'SET_LOADING',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_CATEGORY: 'SET_CATEGORY',
    SET_BASIC_INFO: 'SET_BASIC_INFO',
    SET_IMAGE: 'SET_IMAGE',
    SET_STORY: 'SET_STORY',
    SET_ADDRESS: 'SET_ADDRESS',
    SET_BANK_ACCOUNT: 'SET_BANK_ACCOUNT',
};

export default CreateCampaign2;

const userId = '13d96397-7545-4061-b4b7-216c5a3b09be';
const categoryId = '7cc90ed0-25f2-4336-9247-77c71000dcf7';