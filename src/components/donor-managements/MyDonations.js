import React, { useEffect, useContext, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import MyDonationsContext from '../../context/myDonations/MyDonationsContext';
import { getDateFormatDD_MM_YYYY } from '../../utils/commonUtils';
import { getDonationStatus, getMethod } from '../../utils/donationUtils';
import DataTable from 'react-data-table-component';
import Alert from '../common/Alert';
import './my-donations.css';
import '../css/common.css';
import MyDonationModal from './MyDonationModal';

const MyDonations = () => {
    const myDonationsContext = useContext(MyDonationsContext);
    const donations = myDonationsContext.myDonations;


    const viewDonation = (event, donation) => {
        console.log(donation);
        setCurrentDonation(donation);
        setShowingModal(true);
    }
    
    const [showingModal, setShowingModal] = useState(false);
    const [currentDonation, setCurrentDonation] = useState(null);

    const columns = [
        {
            name: 'Mã quyên góp',
            selector: 'trackingCode'
        },
        {
            name: 'Thời gian',
            selector: 'dateJsx',
            sortable: true,
            hide: 'sm',
        },
        {
            name: 'Chiến dịch',
            selector: 'Campaign.campaignTitle',
            sortable: true,
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
                // <Link to={{
                //     // pathname: routes.getRouteMyCampaignDonationDetail(slug, row.trackingCode),
                //     // pathname: '#',
                // }} className='btn btn-sm btn-info' style={{ color: '#fff' }}>
                // <i className="fas fa-eye"></i>
                // </Link>
                <button className='btn btn-super-sm btn-info' style={{ color: '#fff' }}>
                    <i className="fas fa-eye" style={{ fontSize: '110%' }}
                        onClick={(event) => {
                            viewDonation(event, row)
                        }}>
                    </i>
                </button>
            ),
            maxWidth: '30px'
        }
    ];

    let data = [];

    useEffect(() => {
        myDonationsContext.getMyDonations();
    }, []);


    if (donations && donations.length > 0) {
        data = getDonationsData(donations);
    }

    return (
        <div className='my-donations-container'>
            <h4 className='header'>Quyên góp của tôi</h4>
            {
                data && data.length > 0 ? (
                    <DataTable
                        // title="Quyên góp của tôi"
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
            <MyDonationModal showingModal={showingModal} setShowingModal={setShowingModal}
                donation={currentDonation} />
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
    msg: 'Chưa có quyên góp nào'
}

export default MyDonations;