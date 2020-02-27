import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import CreateCampaignProgressBar from '../campaigns/create-campaign/CreateCampaignProgressBar';
import CreateCampaignBasicInfo from '../campaigns/create-campaign/CreateCampaignBasicInfo';
import CreateCampaignImageCover from '../campaigns/create-campaign/CreateCampaignImageCover';
import CreateCampaignStory from '../campaigns/create-campaign/CreateCampaignStory';
import CreateCampaignMoneyMethods from '../campaigns/create-campaign/CreateCampaignMoneyMethods';
import CreateCampaignConfirm from '../campaigns/create-campaign/CreateCampaignConfirm';
import CreateCampaignCompleted from '../campaigns/create-campaign/CreateCampaignCompleted';
import { odsBase, odsAPICreateCampaign, localStoreKeys } from '../../odsApi';
import '../campaigns/campaign2.css';
import reducer from '../campaigns/create-campaign/createCampaignReducer';
import CreateCampaignName from '../campaigns/create-campaign/CreateCampaignName';
import '../css/create-campaign.css';
import CreateCampaignContentBox from '../campaigns/create-campaign/CreateCampaignContentBox';
import CreateCampaignMoreInfo from '../campaigns/create-campaign/CreateCampaignMoreInfo';
import CreateCampaignDetails from '../campaigns/create-campaign/CreateCampaignDetails';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import { types } from '../../components/campaigns/create-campaign/createCampaignTypes';


const CreateCampaign = () => {
    const campaignsContext = useContext(CampaignsContext);
    const { loading } = campaignsContext;
    const { getCategories, setLoading } = campaignsContext;

    useEffect(() => {
        // const fetchCategories = async () => {
        // }
        getCategories();
        // fetchCategories();

        //eslint-disable-next-line
    }, []);

    const initialState = {
        currentStep: 1,
        loading: false,
        categories: [],
        //campaign
        campaign: {
            campaignTitle: '',
            campaignSlug: '',
            goal: '',
            endDate: null,
            category: null,
            campaignShortDescription: '',
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

    const setBasicInfo = (info) => {
        console.log(info);
        dispatch({
            type: types.SET_BASIC_INFO,
            payload: info
        });
    }

    const createCampaignStep1 = async (title, category, shortDesription) => {
        try {
            setLoading(true);
            const res = await axios.post(`${odsBase}/api/campaign/create`, {
                token: localStorage.getItem(localStoreKeys.token),
                campaign: {
                    campaignTitle: title,
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
            console.log(`Create campaign step 1: ${error}`);
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

    // if (state.loading) {
    //     return <div>LOADING..</div>;
    // }

    if (loading) {
        return <div>loading................</div>
    }

    return (
        <div className='container'>
            <h2>Tạo Chiến dịch mới</h2>

            <CreateCampaignProgressBar step={1} totalSteps={6} />
            <CreateCampaignContentBox>
                <CreateCampaignName campaign={state.campaign} createCampaignStep1={createCampaignStep1} />
                {/* <CreateCampaignMoreInfo /> */}
                {/* <CreateCampaignDetails /> */}
            </CreateCampaignContentBox>
        </div>
    );
}

export default CreateCampaign;