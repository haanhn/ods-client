import { types } from './createCampaignTypes';

export default (state, action) => {
    const data = action.payload;
    switch (action.type) {
        case types.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: data
            };
        case types.SET_STEPS_DONE:
            return {
                ...state,
                stepsDone: data
            };
        case types.SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case types.SET_CATEGORIES:
            return {
                ...state,
                categories: data,
                loading: false
            };
        case types.SET_CATEGORY:
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    category: data
                }
            };
        case types.SET_BASIC_INFO:
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    id: data.id,
                    campaignTitle: data.campaignTitle,
                    campaignSlug: data.campaignSlug,
                    category: data.categoryId,
                    campaignShortDescription: data.campaignShortDescription
                }
            };
        case types.SET_IMAGE:
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    image: data
                }
            };
        case types.SET_STORY:
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    image: data.campaignThumbnail,
                    description: data.campaignDescription
                }
            };
        case types.SET_ADDRESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    address: data
                }
            };
        case types.GET_AUTHORIZED_USER:
            return {
                ...state,
                user: data
            };
        case types.SET_AUTHORIZED_USER:
            return {
                ...state,
                user: data
            };
        case types.SET_BANK_ACCOUNT:
            return {
                ...state,
                bankAccount: data
            };
        case types.SET_DETAILS:
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    campaignRegion: data.campaignRegion,
                    address: data.campaignAddress,
                    goal: data.campaignGoal,
                    endDate: new Date(data.campaignEndDate),
                    autoClose: data.autoClose
                }
            };
        default:
            return state;
    }
}