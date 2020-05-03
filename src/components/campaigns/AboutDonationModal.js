import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CurrencyFormat from 'react-currency-format';
import { getDateTimeFormatDD_MM_YYYY_HH_MM_SS } from '../../utils/commonUtils';
import { getMethod } from '../../utils/donationUtils';

const AboutDonationModal = (props) => {
    const { showingModal, setShowingModal } = props;

    const donation = props.donation;
    const fullname = donation ? donation.fullname : '';
    const date = donation ? donation.createdAt : null;
    const method = donation ? donation.donationMethod : '';
    const donationAmount = donation ? donation.donationAmount : '';
    const donationMessage = donation ? donation.donationMessage : '';
    const description = donation ? donation.description : '';

    let dateJsx = null;
    if (date) {
        dateJsx = getDateTimeFormatDD_MM_YYYY_HH_MM_SS(date);
    }
    let methodJsx = null;
    if (method) {
        methodJsx = getMethod(method);
    }
    let descriptionHtml = null;
    if (description) {
        descriptionHtml = { __html: description };
    }

    const hideModal = () => {
        setShowingModal(false);
    }

    return (
        <Modal
            show={showingModal}
            onHide={hideModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <table className="table">
                    <col style={{ width: '160px', }} />
                    <col style={{}} />
                    <tbody>
                        <tr>
                            <td>Người quyên góp</td>
                            <td> {fullname} </td>
                        </tr>
                        <tr>
                            <td>Thời gian</td>
                            <td> {dateJsx} </td>
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
                                {methodJsx}
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
                <button className="btn btn-sm btn-light" onClick={hideModal} >Đóng</button>
            </Modal.Footer>
        </Modal >
    );
}

export default AboutDonationModal;