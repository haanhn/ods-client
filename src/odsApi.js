// export const odsBase = 'http://5e440cd13dfe6c001421f3ee.mockapi.io';
export const odsBase = 'http://localhost:3001';
export const routes = {
  HOME: '/',
  CAMPAIGNS: '/campaigns',
  CAMPAIGNS_CREATE: '/create-campaign',
  CAMPAIGN_DETAIL: '/campaigns/:slug',
  CAMPAIGN_DONATE: '/campaign/id/donate',
  NOT_FOUND: '/not-found',
  PAGE_SIGN_IN: '/login',
  PAGE_REGISTER: '/register'
  // CAMPAIGN_DETAIL: '/campaigns/id' --> reload trang nay ko lay duoc file css
};

//ODS APIs
export const odsAPIAuthorizedUser = {
  createCampaignStep1: '/api/campaign/create',
  createCampaignStep2: '/api/campaign/create-step2',
  createCampaignStep3: '/api/campaign/create-step3',
  getAuthorizedUser: '/api/user',
  updateUserAddress: '/api/user/update-address',
  getUserBankAccount: '/api/bank-account',
  setBankAccount: '/api/bank-account/create'
}

export const odsAPIRegions = '/api/regions';

export const localStoreKeys = {
  token: 'token'
}