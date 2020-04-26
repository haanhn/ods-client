import React, { useState, useContext, Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import NotFound from '../../pages/NotFound';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import { getDonationStatus, getMethod } from '../../../utils/donationUtils';
import { getDateFormatDD_MM_YYYY } from '../../../utils/commonUtils';
import '../../css/host-manage-donations.css';
import Alert from '../../common/Alert';

const HostViewDonationDetail = (props) => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const { hostViewingCampaign, updateDataLoading } = myCampaignsContext;
    const { code } = props.match.params;
    const donation = getDonation(code, myCampaignsContext.myCampaignDonations);

    let initStatus = getDonationStatus(donation.donationStatus);
    let initDonationStatus = donation.donationStatus;

    const [donationStatus, setDonationStatus] = useState(initDonationStatus);
    const [status, setStatus] = useState(initStatus);
    const [alertResult, setAlertResult] = useState(null);

    const updateStatus = async (event) => {
        try {
            console.log(event.target.textContent);
            let action = 'approve';
            if (event.target.textContent === 'Từ chối') {
                action = 'reject';
            } else if (event.target.textContent === 'Trả lại') {
                action = 'return';
            }
            setAlertResult(null);

            const res = await myCampaignsContext.updateDonationStatus(donation.id, action);
            const returnStatus = res.data.result.donationStatus;
            if (returnStatus !== false) {
                const textStatus = getDonationStatus(returnStatus);
                setDonationStatus(res.data.result.donationStatus);
                setStatus(textStatus);
            } else {
                setAlertResult({ type: 'danger', msg: 'Cập nhật quyên góp thất bại, xin thử lại' });
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!donation) {
        return <NotFound />;
    }

    const date = getDateFormatDD_MM_YYYY(donation.createdAt);
    const method = getMethod(donation.donationMethod);
    let donorName = '';
    if (donation && donation.donationMethod) {
        if (donation.donationMethod !== 'outside') {
            donorName = donation.User.fullname;
        } else {
            donorName = donation.outsideDonor;
        }
    }

    return (
        <div className='host-donation-detail' >
            <div className='host-donation-detail-content' >
                <h5 style={{ marginBottom: '12px' }} >Chi tiết quyên góp</h5>
                <table className="table">

                    <col style={{ width: '180px', }} />
                    <col style={{}} />

                    <tbody>
                        <tr>
                            <td>Mã quyên góp</td>
                            <td> {donation.trackingCode} </td>
                        </tr>
                        <tr>
                            <td>Người quyên góp</td>
                            <td> {donorName} </td>
                        </tr>

                        {donation && donation.donationMethod !== 'outside' ? (
                            <tr>
                                <td>Email</td>
                                <td> {donation.User ? donation.User.email : ''} </td>
                            </tr>
                        ) : null}

                        <tr>
                            <td>Số tiền</td>
                            <td>
                                <CurrencyFormat value={donation && donation.donationAmount ? donation.donationAmount : 0}
                                    displayType={'text'} thousandSeparator={true} />
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Thời gian</td>
                            <td> {date} </td>
                        </tr>
                        <tr>
                            <td>Phương thức</td>
                            <td>
                                {method}
                            </td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td>
                                <span
                                    className={
                                        'badge ' +
                                        (donationStatus === 'done'
                                            ? 'badge-success'
                                            : donationStatus === 'pending'
                                                ? 'badge-warning'
                                                : donationStatus === 'reject'
                                                    ? 'badge-danger' : 'badge-secondary')
                                    }
                                >
                                    {status}
                                </span>
                            </td>
                        </tr>
                        {(donation && donation.donationMessage) ? (
                            <tr>
                                <td>Lời nhắn gởi</td>
                                <td> {donation.donationMessage} </td>
                            </tr>
                        ) : null}

                        {donation.donationMethod !== 'paypal' && donationStatus !== 'done' && donationStatus !== 'returned' ? (
                            <tr>
                                <td colSpan='2' style={{ textAlign: 'center' }}>
                                    <Alert alert={alertResult} />
                                    <div style={{ paddingTop: '10px' }} >
                                        {updateDataLoading ? (
                                            <button className='btn btn-success' style={{ marginRight: '15px' }}
                                                onClick={updateStatus} disabled
                                            >Xác nhận</button>
                                        ) : (
                                                <button className='btn btn-success' style={{ marginRight: '15px' }}
                                                    onClick={updateStatus}
                                                >Xác nhận</button>
                                            )}
                                        {updateDataLoading ? (
                                            <button className='btn btn-danger' onClick={updateStatus} disabled>Từ chối</button>
                                        ) : (
                                                <button className='btn btn-danger' onClick={updateStatus}>Từ chối</button>
                                            )}
                                    </div>
                                </td>
                            </tr>) : null}
                        {hostViewingCampaign && hostViewingCampaign.campaignStatus === 'close' && !hostViewingCampaign.success && donationStatus !== 'returned' && donationStatus !== 'reject'? (
                            <tr>
                                <td colSpan='2' style={{ textAlign: 'center' }}>
                                    <Alert alert={alertResult} />
                                    <div style={{ paddingTop: '10px' }} >
                                        <button className='btn btn-warning' onClick={updateStatus}>Trả lại</button>
                                    </div>
                                </td>
                            </tr>
                        ) : (null)}

                    </tbody>
                </table>
            </div>
        </div >
    )
}

const getDonation = (trackingCode, donations) => {
    if (!donations || donations.length === 0) {
        return {};
    }
    let donation = {};
    for (donation of donations) {
        if (trackingCode === donation.trackingCode) {
            return donation;
        }
    }
}

export default HostViewDonationDetail;