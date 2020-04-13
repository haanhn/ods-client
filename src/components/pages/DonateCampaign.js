import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import '../css/donate-campaign.css';
import FormChooseMethodDonation from '../campaigns/donate-campaign/FormChooseMethodDonation';
import { Switch, Route } from 'react-router-dom';
import { odsBase, odsAPIOpenRoutes, routes, localStoreKeys } from '../../odsApi';
import FormDonateCashOrBanking from '../campaigns/donate-campaign/FormDonateCashOrBanking';
import DonateComplete from '../campaigns/donate-campaign/DonateComplete';
import FormDonateVnPay from '../campaigns/donate-campaign/FormDonateVnPay';


const DonateCampaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);

    const { id, campaignTitle, Category } = campaignsContext.viewingCampaign;
    const campaign = campaignsContext.viewingCampaign;
    const { loading } = campaignsContext;
    const { slug } = props.match.params;
    let host = {};

    //States
    const [method, setMethod] = useState(null);
    const [completedDonation, setCompletedDonation] = useState(null);

    if (campaign) {
        if (campaign.Users && campaign.Users.length > 0) {
            host = campaign.Users[0];
        }
    }

    const sendDonate = async (campaignId, method, money, name, email, anonymous, noti, message) => {
        try {
            const objectDonation = {
                email: email,
                fullname: name,
                donation: {
                    method: method,
                    amount: money,
                    anonymous: anonymous,
                    message: message
                },
                noti: noti,
                campaignId: campaignId
            };
            if (localStorage.getItem(localStoreKeys.token) && localStorage.getItem(localStoreKeys.userId)) {
                objectDonation.userId = localStorage.getItem(localStoreKeys.userId);
            }
            const res = await axios.post(`${odsBase}${odsAPIOpenRoutes.donateCampaignCashOrBanking}`,
                objectDonation
            );
            setCompletedDonation(res.data.donation);
            props.history.push(routes.getRouteDonateCampaignComplete(slug));
        } catch (error) {
            console.error('Error when donate cash or banking:');
            console.error(error);
        }
    }

    const donatePaypal = async (campaignId, money, fullname, anonymous, noti, message) => {
        try {
            const objectDonation = {
                campaignId: campaignId,
                fullname: fullname,
                amount: money,
                anonymous: anonymous,
                message: message,
                noti: noti,
            };
            if (localStorage.getItem(localStoreKeys.token) && localStorage.getItem(localStoreKeys.userId)) {
                objectDonation.userId = localStorage.getItem(localStoreKeys.userId);
            }
            const res = await axios.post(`${odsBase}${odsAPIOpenRoutes.donateCampaignPaypal}`,
                objectDonation
            );
            const url = res.data.url;
            console.log(res)
            window.location.assign(url);
        } catch (error) {
            console.error('Error when donate paypal:');
            console.error(error);
        }
    }

    const donateVnPay = async (campaignId, money, bankCode,
        fullname, email, anonymous, noti, message) => {
        try {
            const objectDonation = {
                campaignId: campaignId,
                amount: money,
                bankCode: bankCode,
                fullname: fullname,
                email: email,
                anonymous: anonymous,
                message: message,
                noti: noti,
            };
            if (localStorage.getItem(localStoreKeys.token) && localStorage.getItem(localStoreKeys.userId)) {
                objectDonation.token = localStorage.getItem(localStoreKeys.token);
            }
            const res = await axios.post(`${odsBase}${odsAPIOpenRoutes.donateCampaignVnPay}`,
                objectDonation
            );
            const url = res.data.url;
            console.log(res)
            window.location.assign(url);
        } catch (error) {
            console.error('Error when donate VnPay:');
            console.error(error);
        }
    }

    useEffect(() => {
        campaignsContext.getCampaignBySlug(slug);
    }, []);

    if (loading) {
        return <div>loading....</div>
    }

    return (
        <div className='container form-donate'>
            <div className='donate-title'>
                <h5>Đóng góp đến chiến dịch</h5>
                <h4>{campaignTitle ? campaignTitle : ''}</h4>
                {/* <h6>Sự chia sẻ của bạn rất quý giá đối với {(host && host.fullname) ? host.fullname : ''}</h6> */}
            </div>

            <Switch>
                <Route exact path={routes.CAMPAIGN_DONATE} render={(props) => (
                    <FormChooseMethodDonation {...props} method={method} setMethod={setMethod} />)
                } />
                <Route exact path={`${routes.CAMPAIGN_DONATE_DETAILS}`}
                    render={(props) => (<FormDonateCashOrBanking {...props}
                        method={method}
                        sendDonate={sendDonate}
                        donatePaypal={donatePaypal} />)} />

                <Route exact path={routes.CAMPAIGN_DONATE_VNPAY}
                    render={(props) => (<FormDonateVnPay {...props}
                        method={method}
                        donateVnPay={donateVnPay} />)} />

                <Route exact path={`${routes.CAMPAIGN_DONATE_COMPLETE}`}
                    render={(props) => (<DonateComplete {...props}
                        completedDonation={completedDonation} />)} />
            </Switch>
            {/* <DonateComplete completedDonation={{}} match={{params: ''}}/> */}
        </div>
    );
}

export default DonateCampaign;