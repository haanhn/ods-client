import React, { useContext, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import mycampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import { routes } from '../../../odsApi';
import { getDonationStatus, getMethod } from './donationUtils';
import { getDateTimeFormatDD_MM_YYYY_HH_MM_SS } from '../../../utils/commonUtils';
import { Link } from 'react-router-dom';

const MyCampaignDonations = (props) => {
    const { slug } = props.match.params;
    const myCampaignsContext = useContext(mycampaignsContext);

    let donationsJsx = null;
    let donations = myCampaignsContext.myCampaignDonations;

    if (donations && donations.length > 0) {
        donationsJsx = donations.map((donation) => {
            const date = getDateTimeFormatDD_MM_YYYY_HH_MM_SS(donation.createdAt);
            const status = getDonationStatus(donation.donationStatus);
            const method = getMethod(donation.donationMethod);
            const route = routes.getRouteMyCampaignDonationDetail(slug, donation.trackingCode);
            return (
                <tr key={donation.id}>
                    <td>
                        {donation.trackingCode}
                    </td>
                    <td >{donation.User.fullname}</td>
                    <td >{donation.User.email}</td>
                    <td >
                        <CurrencyFormat value={donation.donationAmount} displayType={'text'} thousandSeparator={true} />
                        đ
                    </td>
                    <td >{date}</td>
                    <td >{method}</td>
                    <td >
                        <span
                            className={
                                'badge ' +
                                (donation.donationStatus === 'done'
                                    ? 'badge-success'
                                    : donation.donationStatus === 'pending'
                                        ? 'badge-warning'
                                        : 'badge-danger')
                            }
                        >
                            {status}
                        </span>

                    </td>
                    <td >
                        <button className='btn btn-sm btn-secondary'  >
                            <Link to={{
                                pathname: route,
                                state: {
                                    donation: {
                                        ...donation
                                    }
                                }
                            }}
                                style={{ color: 'white' }} >
                                <i class="fas fa-eye"></i>
                            </Link>
                        </button>
                    </td>
                </tr>
            );
        })
    }

    useEffect(() => {
        myCampaignsContext.getCampaignDonations(slug);
    }, []);

    return (
        <div className='container host-list-donations'>
            Campaign donations
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Mã quyên góp</th>
                        <th>Người quyên góp</th>
                        <th>Email</th>
                        <th>Số tiền</th>
                        <th>Thời gian</th>
                        <th>Phương thức</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {donationsJsx}
                </tbody>
            </table>


        </div>
    );
}

export default MyCampaignDonations;