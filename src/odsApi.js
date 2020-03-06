export const odsBase = 'http://localhost:5000';

//Routes in front end
export const routes = {
  HOME: '/',
  CAMPAIGNS: '/campaigns',
  CAMPAIGNS_CREATE: '/create-campaign',
  // CAMPAIGN_DETAIL: '/campaigns/:slug',
  CAMPAIGN_DETAIL: '/campaigns/:slug',
  getRouteCampaignDetail: (slug) => `/campaigns/${slug}`,
  getRouteCampaignDetailDonations (slug) { return `/campaigns/${slug}/donations`; },
  CAMPAIGN_DONATE: '/campaign/id/donate',
  NOT_FOUND: '/not-found',
  PAGE_SIGN_IN: '/login',
  PAGE_REGISTER: '/register',
  MY_CAMPAIGNS: '/mycampaigns'
  // CAMPAIGN_DETAIL: '/campaigns/id' --> reload trang nay ko lay duoc file css
};

//ODS APIs
export const odsAPIOpenRoutes = {
  getAllCampaigns: '/api/campaign/get-all',
  // get campaign detail url template: /api/campaign/get-detail/:slug
  getCampaignDetailBySlug: `/api/campaign/get-detail/`,
  //Comments
  createCampaignComment: `/api/comments`,
  // url: /api/comments/:campaignSlug
  getCampaignComments: `/api/comments/`,
  //Donations
  getCampaignDonations: (slug) => `/api/donations/get-by-campaign/${slug}`,
  uploadSingleImage: '/api/uploads'
}

export const odsAPIAuthorizedUser = {
  createCampaignStep1: '/api/campaign/create',
  createCampaignStep2: '/api/campaign/create-step2',
  createCampaignStep3: '/api/campaign/create-step3',
  createCampaignStep5: '/api/campaign/create-step5',
  uploadCampaignImageCover: (slug) => `/api/uploads/campaign/${slug}`,
  //Authorized Users API
  getAuthorizedUser: '/api/user',
  updateUserAddress: '/api/user/update-address',
  getUserBankAccount: '/api/bank-account',
  setBankAccount: '/api/bank-account/create'
};

export const odsAPIRegions = '/api/regions';

export const localStoreKeys = {
  token: 'token',
  //Authorized User
  userId: 'userId',
  userEmail: 'userEmail',
  userFullname: 'userFullname',
  userAvatar: 'userAvatar',
};
