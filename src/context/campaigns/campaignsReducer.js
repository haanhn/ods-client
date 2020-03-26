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
        //Posts
        case actionTypes.SET_POSTS:
            return ({
                ...state,
                campaignPosts: data
            });
        //Comments
        case actionTypes.SET_COMMENTS:
            return ({
                ...state,
                campaignComments: data
            });
        //Donations
        case actionTypes.SET_DONATIONS:
            return ({
                ...state,
                campaignDonations: data
            });
        //Campaign Ratings
        case actionTypes.SET_CAMPAIGN_RATINGS:
            return ({
                ...state,
                campaignRatings: data
            });
        case actionTypes.SET_MY_CAMPAIGN_RATING:
            return ({
                ...state,
                myCampaignRating: data
            });
        // case actionTypes.SET_CAMPAIGN_RATING_POINT:
        //     return ({
        //         ...state,
        //         viewingCampaign: {
        //             ...state.viewingCampaign,
        //             campaignRatingPoint: data
        //         }
        //     });

        //Campaign Expenses
        case actionTypes.SET_EXPENSES:
            return ({
                ...state,
                campaignExpenses: data
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