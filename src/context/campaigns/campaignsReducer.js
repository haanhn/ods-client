import { actionTypes, GET_CATEGORIES, GET_CAMPAIGNS } from '../types';

const campaignReducer = (state, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return ({
                ...state,
                categories: action.payload
            });
        case GET_CAMPAIGNS:
            return ({
                ...state,
                campaigns: action.payload
            });
        case actionTypes.SET_VIEWING_CAMPAIGN:
            return ({
                ...state,
                viewingCampaign: action.payload,
            });
        case actionTypes.SET_LOADING:
            return ({
                ...state,
                loading: action.payload
            });
        default:
            return state;
    }
}

export default campaignReducer;