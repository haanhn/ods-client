import React, { useContext, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import mycampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import { routes } from '../../../odsApi';
import { getDateFormatDD_MM_YYYY } from '../../../utils/commonUtils';
import { getDonationStatus, getMethod } from '../../../utils/donationUtils';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Alert from '../../common/Alert';
import '../../css/host-manage-donations.css';
import Spinner from '../../common/Spinner';
import FormSearchCampaignDonations from './FormSearchCampaignDonations';
import FormFilterCampaignDonations from './FormFilterCampaignDonations';

const MyCampaignDonations = (props) => {
    const { slug } = props.match.params;
    const myCampaignsContext = useContext(mycampaignsContext);
    const { loading, listLoading } = myCampaignsContext;

    let donations = myCampaignsContext.campaignFilteredDonations;
    const columns = [
        {
            name: 'Mã quyên góp',
            selector: 'trackingCode'
        },
        {
            name: 'Thời gian',
            selector: 'dateJsx',
            sortable: true,
            hide: 'md',
        },
        {
            name: 'Người quyên góp',
            // selector: 'User.fullname',
            selector: 'donorName',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'emailJsx',
            sortable: true,
            hide: 'md',
        },
        {
            name: 'Số tiền',
            selector: 'donationAmountJsx'
        },
        {
            name: 'Phương thức chuyển',
            selector: 'method',
            sortable: true,
            hide: 'sm'
        },
        {
            name: 'Trạng thái',
            selector: 'donationStatusJsx'
        },
        {
            name: ' ',
            cell: (row) => (
                <Link to={{
                    pathname: routes.getRouteMyCampaignDonationDetail(slug, row.trackingCode),
                    state: {
                        hello: 'hello'
                    }
                }} className='btn btn-sm btn-info' style={{ color: '#fff' }}>
                    <i className="fas fa-eye"></i>
                </Link>
            ),
            maxWidth: '80px'
        }
    ]

    let data = [];

    useEffect(() => {
        myCampaignsContext.getCampaignDonations(slug);
    }, []);

    if (donations && donations.length > 0 && !listLoading) {
        data = getDonationsData(donations);
    }

    const createRoute = routes.getRouteMyCampaignCreateDonation(slug);

    if (!loading && listLoading) {
        return <Spinner />;
    }

    return (
        <div className='auto-container host-list-donations' style={{ maxWidth: '1500px' }}>
            <h4 style={{ marginBottom: '17px' }}>Các quyên góp
                <button className='btn btn-sm btn-success' style={{ float: 'right' }}>
                    <i class="fas fa-plus-circle" style={{ marginRight: '3px' }}></i>
                    <Link to={createRoute} style={{ color: 'white' }} >Tạo quyên góp ở ngoài</Link>
                </button>
            </h4>
            <div className='host-searchfilter-donations'>
                <div>
                    <FormSearchCampaignDonations />
                </div>
                <div>
                    <FormFilterCampaignDonations />
                </div>
            </div>
            {
                data && data.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={true}
                        striped={true}
                        highlightOnHover={true}
                        // onRowClicked={onRowClicked}
                        customStyles={customStyles} />
                )
                    : (
                        <Alert alert={alertEmpty} />
                    )
            }
        </div>
    );
}

const getDonationsData = (donations) => {
    if (!donations || donations.length === 0) {
        return [];
    }
    let i = 0;
    for (i = 0; i < donations.length; i++) {
        const status = getDonationStatus(donations[i].donationStatus);
        //amountJsx
        donations[i].donationAmountJsx = <div>
            <CurrencyFormat value={donations[i].donationAmount} displayType={'text'} thousandSeparator={true} />
            đ
        </div>
        //statusJsx
        donations[i].donationStatusJsx = <span className={
            'badge ' +
            (donations[i].donationStatus === 'done'
                ? 'badge-success'
                : donations[i].donationStatus === 'pending'
                    ? 'badge-warning'
                    : 'badge-danger')
        }
        >
            {status}
        </span>
        //methodJsx, dateJsx
        donations[i].method = getMethod(donations[i].donationMethod);
        donations[i].dateJsx = getDateFormatDD_MM_YYYY(donations[i].createdAt);
        let emailJsx = donations[i].User.email;
        //donorName (system donor or outside donor)
        if (donations[i].donationMethod === 'outside') {
            donations[i].donorName = donations[i].outsideDonor;
            emailJsx = '(không có)';
        } else {
            donations[i].donorName = donations[i].User.fullname;
        }
        donations[i].emailJsx = emailJsx;
    }
    return donations;
}

const customStyles = {
    rows: {
        style: {
            fontSize: '15px', // override the row height
        }
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: 'bold',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '6px', // override the cell padding for data cells
            paddingRight: '6px',
        },
    },
};

const alertEmpty = {
    type: 'secondary',
    msg: 'Không tìm thấy quyên góp nào'
}

export default MyCampaignDonations;

// if (donations && donations.length > 0) {
// donationsJsx = donations.map((donation) => {
//     const date = getDateFormatDD_MM_YYYY(donation.createdAt);
//     const status = getDonationStatus(donation.donationStatus);
//     const method = getMethod(donation.donationMethod);
//     const route = routes.getRouteMyCampaignDonationDetail(slug, donation.trackingCode);
//     return (
//         <tr key={donation.id}>
//             <td>
//                 {donation.trackingCode}
//             </td>
//             <td >{donation.User.fullname}</td>
//             <td >{donation.User.email}</td>
//             <td >
//                 <CurrencyFormat value={donation.donationAmount} displayType={'text'} thousandSeparator={true} />
//                 đ
//             </td>
//             <td >{date}</td>
//             <td >{method}</td>
//             <td >
//                 <span
//                     className={
//                         'badge ' +
//                         (donation.donationStatus === 'done'
//                             ? 'badge-success'
//                             : donation.donationStatus === 'pending'
//                                 ? 'badge-warning'
//                                 : 'badge-danger')
//                     }
//                 >
//                     {status}
//                 </span>

//             </td>
//             <td >
//                 <button className='btn btn-sm btn-secondary'  >
//                     <Link to={{
//                         pathname: route,
//                         state: {
//                             donation: {
//                                 ...donation
//                             }
//                         }
//                     }}
//                         style={{ color: 'white' }} >
//                         <i className="fas fa-eye"></i>
//                     </Link>
//                 </button>
//             </td>
//         </tr>
//     );
// })
// }
