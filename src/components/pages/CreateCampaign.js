import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import CreateCampaignProgressBar from '../campaigns/create-campaign/CreateCampaignProgressBar';
import CreateCampaignBasicInfo from '../campaigns/create-campaign/CreateCampaignBasicInfo';
import CreateCampaignImageCover from '../campaigns/create-campaign/CreateCampaignImageCover';
import CreateCampaignStory from '../campaigns/create-campaign/CreateCampaignStory';
import CreateCampaignMoneyMethods from '../campaigns/create-campaign/CreateCampaignMoneyMethods';
import CreateCampaignConfirm from '../campaigns/create-campaign/CreateCampaignConfirm';
import CreateCampaignCompleted from '../campaigns/create-campaign/CreateCampaignCompleted';
import { odsBase, odsAPIAuthorizedUser, localStoreKeys } from '../../odsApi';
import '../campaigns/campaign2.css';
import reducer from '../campaigns/create-campaign/createCampaignReducer';
import CreateCampaignName from '../campaigns/create-campaign/CreateCampaignName';
import '../css/create-campaign.css';
import CreateCampaignContentBox from '../campaigns/create-campaign/CreateCampaignContentBox';
import CreateCampaignMoreInfo from '../campaigns/create-campaign/CreateCampaignMoreInfo';
import CreateCampaignDetails from '../campaigns/create-campaign/CreateCampaignDetails';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import { types } from '../../components/campaigns/create-campaign/createCampaignTypes';
import CreateCampaignMethods from '../campaigns/create-campaign/CreateCampaignMethods';


const CreateCampaign = () => {
    const campaignsContext = useContext(CampaignsContext);
    const { loading } = campaignsContext;
    const { getCategories, getRegions, setLoading } = campaignsContext;

    useEffect(() => {
        getCategories();
        getRegions();
        getAuthorizedUser();
        getUserBankAccount();

        //eslint-disable-next-line
    }, []);

    const initialState = {
        currentStep: 0,
        loading: false,
        // categories: [],
        //campaign
        campaign: {
            id: null,
            campaignTitle: '',
            campaignSlug: '',
            goal: 1000000,
            endDate: null,
            category: null,
            campaignShortDescription: '',
            image: null,
            description: 'sdj',
            campaignRegion: null,
            address: ''
        },
        user: {},
        bankAccount: {}
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setBasicInfo = (info) => {
        console.log(info);
        dispatch({
            type: types.SET_BASIC_INFO,
            payload: info
        });
    }

    const getAuthorizedUser = async () => {
        try {
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.getAuthorizedUser}`, {
                token: localStorage.getItem(localStoreKeys.token)
            });
            dispatch({
                type: types.GET_AUTHORIZED_USER,
                payload: res.data.user
            });
        } catch (error) {
            console.error(`Get Authorized User Error: ${error}`);
        }
    }

    const getUserBankAccount = async () => {
        try {
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.getUserBankAccount}`, {
                token: localStorage.getItem(localStoreKeys.token)
            });
            dispatch({
                type: types.SET_BANK_ACCOUNT,
                payload: res.data.bankAccount
            });
        } catch (error) {
            console.error(`Get User BankAccount Error: ${error}`);
        }
    }

    const createCampaignStep1 = async (title, category, shortDesription) => {
        try {
            setLoading(true);
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep1}`, {
                token: localStorage.getItem(localStoreKeys.token),
                campaign: {
                    campaignTitle: title,
                    campaignSlug: state.campaign.campaignSlug, //get trong state lun
                    category: category,
                    campaignShortDescription: shortDesription
                }
            });
            console.log(res.data);
            dispatch({
                type: types.SET_BASIC_INFO,
                payload: res.data.campaign
            })
            setLoading(false);
        } catch (error) {
            console.error(`Create campaign step 1: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

    const createCampaignStep2 = async (image, desription) => {
        try {
            setLoading(true);
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep2}`, {
                token: localStorage.getItem(localStoreKeys.token),
                campaign: {
                    campaignSlug: state.campaign.campaignSlug, //get trong state lun
                    campaignThumbnail: 'image',
                    campaignDescription: desription
                }
            });
            console.log(res.data);
            dispatch({
                type: types.SET_STORY,
                payload: res.data.campaign
            })
            setLoading(false);
        } catch (error) {
            console.error(`Create campaign step 2: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

    const createCampaignStep3 = async (address, region, goal, endDate) => {
        try {
            setLoading(true);
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep3}`, {
                token: localStorage.getItem(localStoreKeys.token),
                campaign: {
                    campaignSlug: state.campaign.campaignSlug, //get trong state lun
                    campaignAddress: address,
                    campaignRegion: region,
                    campaignGoal: goal,
                    campaignEndDate: endDate
                }
            });
            console.log(res.data);
            dispatch({
                type: types.SET_DETAILS,
                payload: res.data.campaign
            })
            setLoading(false);
        } catch (error) {
            console.error(`Create campaign step 3: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

    const createCampaignStep4 = async (address, region, accountNumber, bankName, bankAgency) => {
        try {
            setLoading(true);
            const userRes = await axios.post(`${odsBase}${odsAPIAuthorizedUser.updateUserAddress}`, {
                token: localStorage.getItem(localStoreKeys.token),
                address: address,
                region: region
            });
            console.log(userRes.data);
            dispatch({
                type: types.SET_AUTHORIZED_USER,
                payload: userRes.data.user
            });
            const bankAccountRes = await axios.post(`${odsBase}${odsAPIAuthorizedUser.setBankAccount}`, {
                token: localStorage.getItem(localStoreKeys.token),
                bankAccount: {
                    bankName: bankName,
                    bankAgency: bankAgency,
                    accountNumber: accountNumber
                }
            });
            console.log(bankAccountRes.data);
            dispatch({
                type: types.SET_BANK_ACCOUNT,
                payload: bankAccountRes.data.bankAccount
            });
            setLoading(false);
        } catch (error) {
            console.error(`Create campaign step 4: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

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

    if (loading) {
        return <div>loading................</div>
    }

    return (
        <div className='container create-campaign'>
            {/* <h2>Tạo Chiến dịch mới</h2> */}

            <CreateCampaignProgressBar step={1} totalSteps={6} />
            <CreateCampaignContentBox campaignTitle={state.campaign.campaignTitle}>
                <CreateCampaignName campaign={state.campaign} createCampaignStep1={createCampaignStep1} />
                <CreateCampaignMoreInfo campaign={state.campaign} createCampaignStep2={createCampaignStep2} />
                <CreateCampaignDetails campaign={state.campaign} createCampaignStep3={createCampaignStep3} />
                <CreateCampaignMethods user={state.user} bankAccount={state.bankAccount}
                    createCampaignStep4={createCampaignStep4} />
            </CreateCampaignContentBox>
        </div>
    );
}

export default CreateCampaign;