import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

const MyDonationModal = (props) => {
    const donation = props.donation;
    const trackingCode = donation ? donation.trackingCode : '';
    const dateJsx = donation ? donation.dateJsx : '';
    const method = donation ? donation.method : '';
    const donationAmount = donation ? donation.donationAmount : '';
    const donationStatusJsx = donation ? donation.donationStatusJsx : '';
    const donationMessage = donation ? donation.donationMessage : '';
    const description = donation ? donation.description : '';
    const campaignTitle = (donation && donation.Campaign) ? donation.Campaign.campaignTitle : '';
    const slug = (donation && donation.Campaign) ? donation.Campaign.campaignSlug : '';
    const routeCampaign = routes.getRouteCampaignDetail(slug);

    const hideModal = () => {
        props.setShowingModal(false);
    }

    let descriptionHtml = null;
    if (description) {
        descriptionHtml = { __html: description };
    }

    return (
        <Modal
            show={props.showingModal}
            onHide={hideModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Quyên góp
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <col style={{ width: '160px', }} />
                    <col style={{}} />
                    <tbody>
                        <tr>
                            <td>Mã quyên góp</td>
                            <td> {trackingCode} </td>
                        </tr>
                        <tr>
                            <td>Thời gian</td>
                            <td> {dateJsx} </td>
                        </tr><tr>
                            <td>Chiến dịch</td>
                            <td>
                                <Link to={routeCampaign} style={{color: 'inherit'}} >{campaignTitle}</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>Số tiền</td>
                            <td>
                                <CurrencyFormat value={donationAmount} displayType={'text'} thousandSeparator={true} />
                                đ
                            </td>
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
                                {donationStatusJsx}
                            </td>
                        </tr>
                        {(donationMessage) ? (
                            <tr>
                                <td>Lời nhắn gởi</td>
                                <td> {donationMessage} </td>
                            </tr>
                        ) : null}
                        {(descriptionHtml) ? (
                            <tr>
                                <td colSpan='2'>
                                    <div dangerouslySetInnerHTML={descriptionHtml} />
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-light" onClick={hideModal} >Đóng</button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyDonationModal;