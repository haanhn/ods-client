import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import CreateCampaignProgressBar from '../campaigns/create-campaign/CreateCampaignProgressBar';
import { odsBase, odsAPIAuthorizedUser, routes, localStoreKeys } from '../../odsApi';
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
import { getInitEndDate, getInitStepIndex, getAllStepsOfSettingCamppaign } from '../../utils/createCampaignUtils';
import Spinner from '../common/Spinner';


const CreateCampaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { loading, setLoading, initCreateLoading, setInitCreateLoading } = campaignsContext;
    const { getCategories, getRegions } = campaignsContext;

    const token = localStorage.getItem(localStoreKeys.token);
    if (!token) {
        const route = routes.PAGE_SIGN_IN;
        props.history.push(route);
    }

    useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, []);

    const fetchData = async () => {
        try {
            if (!token) {
                return '';
            }
            setInitCreateLoading(true);
            const checkCampaign = await getCheckSettingOrWaitingCampaign();
            getCategories();
            getRegions();
            const authUser = await getAuthorizedUser();
            const authBankAccount = await getUserBankAccount();

            if (checkCampaign) {
                const status = checkCampaign.campaignStatus;
                if (status === 'waiting') {
                    const allSteps = [1, 1, 1, 1, 1];
                    setAllSteps(allSteps);
                    setCurrentStep(5);
                } else if (status === 'setting') {
                    const allSteps = getAllStepsOfSettingCamppaign(checkCampaign, authUser, authBankAccount);
                    let initCurrentStep = getInitStepIndex(allSteps);
                    setAllSteps(allSteps);
                    setCurrentStep(initCurrentStep);
                }
                const initGoal = checkCampaign.campaignGoal ? checkCampaign.campaignGoal : 1000000;
                const initEndDate = getInitEndDate(checkCampaign.campaignEndDate);
                const initCampaign = {
                    id: checkCampaign.id,
                    campaignTitle: checkCampaign.campaignTitle,
                    campaignSlug: checkCampaign.campaignSlug,
                    goal: initGoal,
                    endDate: initEndDate,
                    category: checkCampaign.categoryId,
                    campaignShortDescription: checkCampaign.campaignShortDescription,
                    image: checkCampaign.campaignThumbnail,
                    description: checkCampaign.campaignDescription,
                    campaignRegion: checkCampaign.regionId,
                    address: checkCampaign.campaignAddress,
                    autoClose: checkCampaign.autoClose,
                    campaignStatus: checkCampaign.campaignStatus
                }
                dispatch({
                    type: types.SET_INIT_CAMPAIGN,
                    payload: initCampaign
                });
            }
            setInitCreateLoading(false);
        } catch (error) {
            setInitCreateLoading(false);
            console.error(error);
        }
    }

    const initialState = {
        currentStep: 0,
        //this is the maximum amount of steps user can click on step navigation 
        //(not actual number of steps done)
        steps: [0, 0, 0, 0, 0],
        loading: false,
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
            autoClose: true,
            campaignStatus: null
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

    const setAllSteps = (allSteps) => {
        dispatch({
            type: types.SET_ALL_STEPS,
            payload: allSteps
        });
    }

    //statusDone = 0 or 1
    const setSingleStep = (stepIndex, statusDone) => {
        const stepsArray = [];
        let i = 0;
        for (i = 0; i < 5; i++) {
            if (stepIndex === i) {
                stepsArray.push(statusDone);
            } else {
                stepsArray.push(state.steps[i]);
            }
        }
        dispatch({
            type: types.SET_ALL_STEPS,
            payload: stepsArray
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
            return res.data.user;
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
            return res.data.bankAccount;
        } catch (error) {
            console.error(`Get User BankAccount Error: ${error}`);
        }
    }

    const getCheckSettingOrWaitingCampaign = async () => {
        try {
            const token = localStorage.getItem(localStoreKeys.token);
            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.checkBeforeCreateCampagin}`, {
                token: token
            });
            const checkCampaign = res.data.campaign;
            return checkCampaign;
        } catch (error) {
            console.error(`Check before create campaign: ${error}`);
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
            setSingleStep(0, 1);
            //Move on to step 2, index = 1
            setCurrentStep(1);
            return true;
        } catch (error) {
            console.error(`Create campaign step 1: ${error}`);
            setLoading(false);
            return false;
        }
    }

    const createCampaignStep2 = async (newImageUrl, imageBinary, desription) => {
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
            } else {
                imgUrl = newImageUrl;
            }

            const res = await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep2}`, {
                token: token,
                campaign: {
                    campaignSlug: state.campaign.campaignSlug, //get trong state lun
                    campaignThumbnail: imgUrl,
                    campaignDescription: desription
                }
            });
            dispatch({
                type: types.SET_STORY,
                payload: res.data.campaign
            })
            setLoading(false);
            setSingleStep(1, 1);
            //Move on to step 3, index = 2
            setCurrentStep(2);
            return true;
        } catch (error) {
            console.error(`Create campaign step 2: ${error}`);
            setLoading(false);
            return false;
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
            setSingleStep(2, 1);
            //Move on to step 4, index = 3
            setCurrentStep(3);
            return true;
        } catch (error) {
            console.error(`Create campaign step 3: ${error}`);
            setLoading(false);
            return false;
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
            dispatch({
                type: types.SET_BANK_ACCOUNT,
                payload: bankAccountRes.data.bankAccount
            });
            setLoading(false);
            setSingleStep(3, 1);
            //Move on to step 5, step index = 4
            setCurrentStep(4);
            return true;
        } catch (error) {
            console.error(`Create campaign step 4: ${error}`);
            setLoading(false);
            return false;
        }
    }

    const createCampaignStep5 = async () => {
        try {
            setLoading(true);
            await axios.post(`${odsBase}${odsAPIAuthorizedUser.createCampaignStep5}`, {
                token: localStorage.getItem(localStoreKeys.token),
                campaign: {
                    campaignSlug: state.campaign.campaignSlug //get trong state luon
                }
            });
            setLoading(false);
            setSingleStep(4, 1);
            //Move on to step final done: step 6, index step = 5
            setCurrentStep(5);
            dispatch({ type: types.SET_CREATE_SUCCESS });
            return true;
        } catch (error) {
            console.error(`Create campaign step 5: ${error}`);
            setLoading(false);
            return false;
        }
    }

    let stepJsx = null;


    switch (state.currentStep) {
        case 0:
            stepJsx = <CreateCampaignStep1 campaign={state.campaign}
                createCampaignStep1={createCampaignStep1} loading={loading} />;
            break;
        case 1:
            stepJsx = <CreateCampaignStep2 campaign={state.campaign} loading={loading}
                createCampaignStep2={createCampaignStep2} />;
            break;
        case 2:
            stepJsx = <CreateCampaignStep3 campaign={state.campaign} loading={loading}
                createCampaignStep3={createCampaignStep3} />;
            break;
        case 3:
            stepJsx = <CreateCampaignStep4 user={state.user} bankAccount={state.bankAccount}
                loading={loading} createCampaignStep4={createCampaignStep4} />;
            break;
        case 4:
            stepJsx = <CampaignPreviewBasicInfo campaign={state.campaign} host={state.user}
                loading={loading} createCampaignStep5={createCampaignStep5} />;
            break;
        case 5:
            stepJsx = <CreateCampaignSuccess campaign={state.campaign} />;
            break;
        default:
            stepJsx = <CreateCampaignStep1 campaign={state.campaign}
                createCampaignStep1={createCampaignStep1} loading={loading} />;
    }

    if (initCreateLoading) {
        return <Spinner />;
    }

    return (
        <div className='container create-campaign'>
            <CreateCampaignProgressBar currentStep={state.currentStep} setCurrentStep={setCurrentStep}
                steps={state.steps} campaignStatus={state.campaign.campaignStatus}
            />

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