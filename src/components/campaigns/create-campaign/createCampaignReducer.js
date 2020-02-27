import { types } from '../../pages/CreateCampaign2';

export default (state, action) => {
    const data = action.payload;
    switch (action.type) {
        case types.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: data
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
                    title: data.title,
                    goal: data.goal,
                    endDate: data.endDate,
                    category: data.category,
                    shortDescription: data.shortDescription
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
                    story: data
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
        case types.SET_BANK_ACCOUNT:
            return {
                ...state,
                user: {
                    ...state.user,
                    bankAccount: data
                }
            };
        default:
            return state;
    }
}