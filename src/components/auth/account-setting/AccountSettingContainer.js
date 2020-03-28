import React from 'react';
import { routes } from '../../../odsApi';
import AccountSettingTabBankAccount from './AccountSettingTabBankAccount';
import AccountSettingTabInfo from './AccountSettingTabInfo';
import { Switch, Route } from 'react-router-dom';
import AccountSettingTabs from './AccountSettingTabs';
import AccountSettingAvatar from './AccountSettingAvatar';

const AccountSettingContainer = () => {

    return (
        <div className='account-setting-container'>
            <div className='my-campaign-info-box'>

                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-2 col-md-3 col-sm-3 col-12 campaign-info-tabs'>
                            <AccountSettingTabs />
                        </div>
                        <div className='col-lg-10 col-md-9 col-sm-9 col-12 cammpaign-into-content' 
                            style={{padding: '17px 12px'}} >
                            <Switch>
                                <Route exact path={routes.MY_ACCOUNT}>
                                    <AccountSettingTabInfo />
                                </Route>
                                <Route exact path={routes.MY_ACCOUNT_BANK_ACCOUNT}>
                                    <AccountSettingTabBankAccount />
                                </Route>
                                <Route exact path={routes.MY_ACCOUNT_AVATAR}>
                                    <AccountSettingAvatar />
                                </Route>
                                {/* <Route exact path={`${routes.MY_CAMPAIGN_INFO_STORY}`}> */}
                                {/* <CampaignTabMoreInfo description={campaign.campaignDescription} /> */}
                                {/* <MyCampaignTabStory /> */}
                                {/* </Route> */}
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettingContainer;