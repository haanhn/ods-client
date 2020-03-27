import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import CreateCampaignProgressBar from '../campaigns/create-campaign/CreateCampaignProgressBar';
import CreateCampaignBasicInfo from '../campaigns/create-campaign/CreateCampaignBasicInfo';
import CreateCampaignImageCover from '../campaigns/create-campaign/CreateCampaignImageCover';
import CreateCampaignStory from '../campaigns/create-campaign/CreateCampaignStory';
import CreateCampaignMoneyMethods from '../campaigns/create-campaign/CreateCampaignMoneyMethods';
import CreateCampaignConfirm from '../campaigns/create-campaign/CreateCampaignConfirm';
import CreateCampaignCompleted from '../campaigns/create-campaign/CreateCampaignCompleted';
import { odsBase, odsAPIOpenRoutes, odsAPIAuthorizedUser, routes, localStoreKeys } from '../../odsApi';
import '../campaigns/campaign2.css';
import reducer from '../campaigns/create-campaign/createCampaignReducer';
import CreateCampaignStep1 from '../campaigns/create-campaign/CreateCampaignStep1';
import '../css/create-campaign.css';
import CreateCampaignContentBox from '../campaigns/create-campaign/CreateCampaignContentBox';
import CreateCampaignStep2 from '../campaigns/create-campaign/CreateCampaignStep2';
import CreateCampaignStep3 from '../campaigns/create-campaign/CreateCampaignStep3';
import CampaignPreviewBasicInfo from '../campaigns/create-campaign/CampaignPreviewBasicInfo';
import CreateCampaignSuccess from '../campaigns/create-campaign/CreateCampaignSuccess';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import { types } from '../../components/campaigns/create-campaign/createCampaignTypes';
import CreateCampaignStep4 from '../campaigns/create-campaign/CreateCampaignStep4';


const CreateCampaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { loading } = campaignsContext;
    const { getCategories, getRegions, setLoading } = campaignsContext;

    const token = localStorage.getItem(localStoreKeys.token);
    if (!token) {
        const route = routes.PAGE_SIGN_IN;
        props.history.push(route);
    }

    useEffect(() => {
        getCategories();
        getRegions();
        getAuthorizedUser();
        getUserBankAccount();

        //eslint-disable-next-line
    }, []);

    const initialState = {
        currentStep: 0,
        stepsDone: 1,
        //this is the maximum amount of steps user can click on step navigation 
        //(not actual number of steps done)
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
            description: '',
            campaignRegion: null,
            address: '',
            autoClose: true
        },
        user: {},
        bankAccount: {}
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setCurrentStep = (current) => {
        dispatch({
            type: types.SET_CURRENT_STEP,
            payload: current
        });
    }

    const setStepsDone = (stepsDoneAmount) => {
        dispatch({
            type: types.SET_STEPS_DONE,
            payload: stepsDoneAmount
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
            dispatch({
                type: types.SET_BASIC_INFO,
                payload: res.data.campaign
            })
            setLoading(false);
            setStepsDone(2);
            setCurrentStep(1);
        } catch (error) {
            console.error(`Create campaign step 1: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

    const createCampaignStep2 = async (image, imageBinary, desription) => {
        try {
            setLoading(true);
            const token = localStorage.getItem(localStoreKeys.token);
            const slug = state.campaign.campaignSlug;
            const routeUploadCampaignImg = odsAPIAuthorizedUser.uploadCampaignImageCover(slug);

            let imgUrl = null;
            if (imageBinary) {
                let formData = new FormData();
                formData.append('image', imageBinary);
                const resImg = await axios.post(`${odsBase}${routeUploadCampaignImg}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-access-token': token,
                    }
                });
                console.log(`upload campaign img cover:`);
                console.log(resImg);
                imgUrl = resImg.data.data.campaignThumbnail;
            }

            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep2}`, {
                token: token,
                campaign: {
                    campaignSlug: state.campaign.campaignSlug, //get trong state lun
                    campaignThumbnail: imgUrl,
                    campaignDescription: desription
                }
            });
            console.log('save campaign description');
            console.log(res.data);
            dispatch({
                type: types.SET_STORY,
                payload: res.data.campaign
            })
            setLoading(false);
            setStepsDone(3);
            setCurrentStep(2);
        } catch (error) {
            console.error(`Create campaign step 2: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

    const createCampaignStep3 = async (address, region, goal, endDate, autoClose) => {
        try {
            setLoading(true);
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep3}`, {
                token: localStorage.getItem(localStoreKeys.token),
                campaign: {
                    campaignSlug: state.campaign.campaignSlug, //get trong state lun
                    campaignAddress: address,
                    campaignRegion: region,
                    campaignGoal: goal,
                    campaignEndDate: endDate,
                    autoClose
                }
            });
            dispatch({
                type: types.SET_DETAILS,
                payload: res.data.campaign
            })
            setLoading(false);
            setStepsDone(4);
            setCurrentStep(3);
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
            setStepsDone(5);
            setCurrentStep(4);
        } catch (error) {
            console.error(`Create campaign step 4: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

    const createCampaignStep5 = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep5}`, {
                token: localStorage.getItem(localStoreKeys.token),
                campaign: {
                    campaignSlug: state.campaign.campaignSlug //get trong state luon
                }
            });
            console.log(res.data);
            setLoading(false);
            setStepsDone(6);
            setCurrentStep(5);
        } catch (error) {
            console.error(`Create campaign step 5: ${error}`);
            alert('Đã có lỗi xảy ra, xin hãy thử lại');
            setLoading(false);
        }
    }

    let stepJsx = null;


    switch (state.currentStep) {
        case 0:
            stepJsx = <CreateCampaignStep1 campaign={state.campaign}
                createCampaignStep1={createCampaignStep1} />;
            break;
        case 1:
            stepJsx = <CreateCampaignStep2 campaign={state.campaign} createCampaignStep2={createCampaignStep2} />;
            break;
        case 2:
            stepJsx = <CreateCampaignStep3 campaign={state.campaign} createCampaignStep3={createCampaignStep3} />;
            break;
        case 3:
            stepJsx = <CreateCampaignStep4 user={state.user} bankAccount={state.bankAccount}
                createCampaignStep4={createCampaignStep4} />;
            break;
        case 4:
            stepJsx = <CampaignPreviewBasicInfo campaign={state.campaign} host={state.user}
                createCampaignStep5={createCampaignStep5} />;
            break;
        case 5:
            stepJsx = <CreateCampaignSuccess />;
            break;
        default:
            stepJsx = <CreateCampaignStep1 campaign={state.campaign}
                createCampaignStep1={createCampaignStep1} />;
    }

    if (loading) {
        return <div>loading................</div>
    }

    return (
        <div className='container create-campaign'>
            <CreateCampaignProgressBar currentStep={state.currentStep} stepsDone={state.stepsDone}
                setCurrentStep={setCurrentStep}
            />
            {/* <CampaignPreviewBasicInfo campaign={state.campaign} host={state.user} createCampaignStep5={createCampaignStep5} /> */}

            {(state.currentStep === 4 || state.currentStep === 5) ?
                (stepJsx)
                :
                (
                    <CreateCampaignContentBox campaignTitle={state.campaign.campaignTitle}>
                        {stepJsx}
                    </CreateCampaignContentBox>
                )
            }
        </div>
    );
}

export default CreateCampaign;

const htmlString = '<h1>Hello</h1><p>Hello đây là body p</p>';