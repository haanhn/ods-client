import { actionTypes, GET_CATEGORIES, GET_CAMPAIGNS } from '../types';

const campaignReducer = (state, action) => {
    const data = action.payload;
    switch (action.type) {
        //Common Utils: categories, regions,...
        case GET_CATEGORIES:
            return ({
                ...state,
                categories: action.payload
            });
        case actionTypes.GET_REGIONS:
            return ({
                ...state,
                regions: action.payload
            });
        //Campaigns
        case GET_CAMPAIGNS:
            return ({
                ...state,
                campaigns: action.payload
            });
        case actionTypes.GET_CAMPAIGNS:
            return ({
                ...state,
                campaigns: action.payload
            });
        case actionTypes.SET_VIEWING_CAMPAIGN:
            return ({
                ...state,
                viewingCampaign: action.payload,
            });
        //Comments
        case actionTypes.CREATE_COMMENT:
            return ({
                ...state,
                campaignComments: data
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