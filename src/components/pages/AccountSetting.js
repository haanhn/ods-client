import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import AccountSettingContainer from '../auth/account-setting/AccountSettingContainer';
// import { localStoreKeys } from '../../odsApi';
import '../host-managements/manage-campaign-info/my-campaign-tab-info.css';
import '../css/account-setting.css';

const AccountSetting = () => {
    const authContext = useContext(AuthContext);
    const campaignsContext = useContext(CampaignsContext);
    
    const fetchUser = async () => {
        await authContext.getCurrentUser();
        authContext.getUserBankAccount();
        campaignsContext.getRegions();
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className='account-setting' >
            <h4 style={{marginBottom: '15px'}}>Cài đặt tài khoản</h4>
            <AccountSettingContainer />
        </div>
    );
}

export default AccountSetting;