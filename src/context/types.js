export const GET_CATEGORIES ='GET_CATEGORIES'; 
export const GET_CAMPAIGNS ='GET_CAMPAIGNS'; 
export const SEARCH_CAMPAIGNS ='SEARCH_CAMPAIGNS'; 

//this actionTypes contains all action that guest can access 
export const actionTypes = {
    //common: categories, regions,...
    GET_REGIONS: 'GET_REGIONS',

    //Campaigns
    GET_CAMPAIGNS: 'GET_CAMPAIGNS',
    SET_VIEWING_CAMPAIGN: 'SET_VIEWING_CAMPAIGN',
    SET_SUGGESTED_CAMPAIGNS1: 'SET_SUGGESTED_CAMPAIGNS1',
    SET_SUGGESTED_CAMPAIGNS2: 'SET_SUGGESTED_CAMPAIGNS2',

    //Viewing campaign: posts, comments,...
    SET_POSTS: 'SET_POSTS',
    SET_COMMENTS: 'SET_COMMENTS',
    SET_DONATIONS: 'SET_DONATIONS',
    //campaign ratings
    SET_CAMPAIGN_RATINGS: 'SET_CAMPAIGN_RATINGS',
    SET_MY_CAMPAIGN_RATING: 'SET_MY_CAMPAIGN_RATING',
    // SET_CAMPAIGN_RATING_POINT: 'SET_CAMPAIGN_RATING_POINT',
    SET_EXPENSES: 'SET_EXPENSES',
    //Stats
    SET_COUNT_FOLLOWERS: 'SET_COUNT_FOLLOWERS',
    SET_CAMPAIGN_RATING_STATS: 'SET_CAMPAIGN_RATING_STATS',
    SET_LOADING: 'SET_LOADING',
    SET_INIT_CREATE_LOADING: 'SET_INIT_CREATE_LOADING'
};
//Users
export const REGISTER_USER = 'REGISTER_USER';

//Alert
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

//Auth
export const GET_OTP = 'GET_OTP';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

//Authorized User
export const authActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_BANK_ACCOUNT: 'SET_BANK_ACCOUNT'
}

//My Campaign
export const GET_MYCAMPAIGNS = 'GET_MYCAMPAIGNS';
export const CLEAR_MYCAMPAIGNS = 'CLEAR_MYCAMPAIGNS';
export const hostActionTypes = {
    GET_CAMPAIGN_DETAIL: 'GET_CAMPAIGN_DETAIL',
    SET_CAMPAIGN_IMAGE: 'SET_CAMPAIGN_IMAGE',
    SET_CAMPAIGN_STATUS: 'SET_CAMPAIGN_STATUS',
    SET_CAMPAIGN_STATS: 'SET_CAMPAIGN_STATS',
    GET_POSTS: 'GET_POSTS',
    GET_DONATIONS: 'GET_DONATIONS',
    SET_FILTERED_DONATIONS: 'SET_FILTERED_DONATIONS',
    //Expenses
    GET_EXPENSES: 'GET_EXPENSES',
    SET_TOTAL_EXPENSE: 'SET_TOTAL_EXPENSE',
    SET_LOADING: 'SET_LOADING',
    SET_LIST_LOADING: 'SET_LIST_LOADING',
    SET_UPDATE_DATA_LOADING: 'SET_UPDATE_DATA_LOADING',
};

//My Donations
export const donorActionTypes = {
    GET_MY_DONATIONS: 'GET_MY_DONATIONS',
    SET_MY_FILTERED_DONATIONS: 'SET_MY_FILTERED_DONATIONS',
    SET_LOADING: 'SET_LOADING',
};

//User Profile
export const profileActionTypes = {
    SET_USER_PROFILE: 'SET_USER_PROFILE',
    SET_PROFILE_STATS: 'SET_PROFILE_STATS',
    SET_PROFILE_CAMPAIGNS: 'SET_PROFILE_CAMPAIGNS',
    SET_PROFILE_DONATIONS: 'SET_PROFILE_DONATIONS',
    SET_PROFILE_RATINGS_STATS: 'SET_PROFILE_RATINGS_STATS',
    SET_PROFILE_RATINGS: 'SET_PROFILE_RATINGS',
    SET_MY_PROFILE_RATING: 'SET_MY_PROFILE_RATING',
};