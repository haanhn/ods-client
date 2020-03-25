export const odsBase = 'http://localhost:5000';

//Routes in front end
export const routes = {
  HOME: '/',
  CAMPAIGNS: '/campaigns',
  CAMPAIGNS_CREATE: '/create-campaign',
  // CAMPAIGN_DETAIL: '/campaigns/:slug',
  CAMPAIGN_DETAIL: '/campaigns/:slug',
  getRouteCampaignDetail: (slug) => `/campaigns/${slug}`,
  getRouteCampaignPosts: (slug) => `/campaigns/${slug}/updates`,
  getRouteCampaignComments (slug) { return `/campaigns/${slug}/comments`; },
  getRouteCampaignDetailDonations (slug) { return `/campaigns/${slug}/donations`; },
  getRouteCampaignRatings (slug) { return `/campaigns/${slug}/ratings`; },
  //-----Routes: Donate to campaign-----
  CAMPAIGN_DONATE: '/campaign/:slug/donate',
  getRouteDonateCampaign (slug) { return `/campaign/${slug}/donate`; },
  CAMPAIGN_DONATE_DETAILS: '/campaign/:slug/donate/details',
  getRouteDonateCampaignDetails (slug) { return `/campaign/${slug}/donate/details`; },
  CAMPAIGN_DONATE_COMPLETE: '/campaign/:slug/donate/complete',
  getRouteDonateCampaignComplete (slug) { return `/campaign/${slug}/donate/complete`; },
  //----- Routes: for Campagin Host -----
  MY_CAMPAIGNS: '/my-campaigns',
  MY_CAMPAIGN_DETAIL: '/my-campaigns/:slug',
  getRouteMyCampaignDetail(slug) { return `/my-campaigns/${slug}`; },
  //Route: Host campaign posts
  MY_CAMPAIGN_INFO: '/my-campaigns/:slug/info',
  getRouteMyCampaignInfo(slug) { return `/my-campaigns/${slug}/info`; },
  // MY_CAMPAIGN_INFO_IMAGE: '/my-campaigns/:slug/info/image',
  // getRouteMyCampaignInfoImage(slug) { return `/my-campaigns/${slug}/info/image`; },
  MY_CAMPAIGN_INFO_DETAILS: '/my-campaigns/:slug/info/details',
  getRouteMyCampaignInfoDetails(slug) { return `/my-campaigns/${slug}/info/details`; },
  MY_CAMPAIGN_INFO_STORY: '/my-campaigns/:slug/info/story',
  getRouteMyCampaignInfoStory(slug) { return `/my-campaigns/${slug}/info/story`; },
  MY_CAMPAIGN_POSTS: '/my-campaigns/:slug/posts',
  getRouteMyCampaignPosts(slug) { return `/my-campaigns/${slug}/posts`; },
  MY_CAMPAIGN_POST_CREATE: '/my-campaigns/:slug/posts/create',
  getRouteMyCampaignPostCreate(slug) { return `/my-campaigns/${slug}/posts/create`; },
  MY_CAMPAIGN_POST_DETAIL: '/my-campaigns/:slug/posts/:id',
  getRouteMyCampaignPostDetail(slug, postId) { return `/my-campaigns/${slug}/posts/${postId}`; },
  //Route: Host campaign donations
  MY_CAMPAIGN_DONATIONS: '/my-campaigns/:slug/donations',
  getRouteMyCampaignDonations(slug) { return `/my-campaigns/${slug}/donations`; },
  MY_CAMPAIGN_DONATION_DETAIL: '/my-campaigns/:slug/donations/:code',
  getRouteMyCampaignDonationDetail(slug, code) { return `/my-campaigns/${slug}/donations/${code}`; },
  //Route: Host campaign expenses
  MY_CAMPAIGN_EXPENSES: '/my-campaigns/:slug/expenses',
  getRouteMyCampaignExpenses(slug) { return `/my-campaigns/${slug}/expenses`; },
  //--------------------------------------
  //----- Routes: for Campagin Donor -----
  //--------------------------------------
  MY_DONATIONS: '/my-donations',
  NOT_FOUND: '/not-found',
  PAGE_SIGN_IN: '/login',
  PAGE_REGISTER: '/register',
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
  getCampaignPosts: (slug) => `/api/posts/get-all-post/${slug}`,
  //Donations
  getCampaignDonations: (slug) => `/api/donations/get-by-campaign/${slug}`,
  donateCampaignCashOrBanking: '/api/donations/create',
  //Ratings
  getCampaignRatings: (slug) => `/api/campaignReviews/${slug}`,
  getCampaignRatingsStats: (slug) => `/api/campaignReviews/overall/${slug}`,
  postCampaignRating: '/api/campaignReviews',
  donateCampaignPaypal: '/api/donations/paypal',
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

export const odsAPIHost = {
  getCampaignPosts(slug) { return `/api/posts/host/get-all-post/${slug}`; },
  updateCampaignInfo: '/api/campaign/update',
  createCampaignPost: '/api/posts/host/create',
  updateCampaignPost: '/api/posts/host/update',
  getCampaignDonations(slug) { return `/api/donations/host/get-by-campaign/${slug}`; },
  updateCampaignDonationStatus(action) { return `/api/donations/host/update-donation-status/${action}`; },
  getCampaignExpenses(slug) { return `/api/expenses/${slug}`; },
  createCampaignExpense: '/api/expenses',
  updateCampaignExpense: '/api/expenses/update',
  deleteCampaignExpense: (expenseId) => `/api/expenses/${expenseId}`
};

export const odsAPIDonor = {
  getMyDonations: '/api/donations'
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
