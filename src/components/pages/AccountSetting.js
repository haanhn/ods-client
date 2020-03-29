import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AccountSettingContainer from '../auth/account-setting/AccountSettingContainer';
import '../host-managements/manage-campaign-info/my-campaign-tab-info.css';
import '../css/account-setting.css';

const AccountSetting = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.getUserBankAccount();
    }, []);

    return (
        <div className='account-setting' >
            <h4 style={{marginBottom: '15px'}}>Cài đặt tài khoản</h4>
            <AccountSettingContainer />
            {/* <Switch>
                <Route path={routes.MY_CAMPAIGN_INFO} >
                    <MyCampaignInfo slug={slug} />
                </Route>
                <Route exact path={routes.MY_CAMPAIGN_POSTS} component={MyCampaignPosts} />
                <Route exact path={routes.MY_CAMPAIGN_POST_CREATE} component={FormCreateCampaignPost} />
                <Route exact path={routes.MY_CAMPAIGN_POST_DETAIL} component={FormCreateCampaignPost} />
                <Route exact path={routes.MY_CAMPAIGN_EXPENSES} component={MyCampaignExpenses} />
                <Route exact path={routes.MY_CAMPAIGN_DONATIONS} component={MyCampaignDonations} />
                <Route exact path={routes.MY_CAMPAIGN_CREATE_DONATION} component={HostCreateOutsideDonation} />
                <Route exact path={routes.MY_CAMPAIGN_DONATION_DETAIL} component={HostViewDonationDetail} />
            </Switch> */}
        </div>
    );
}

export default AccountSetting;