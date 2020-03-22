export const getDonationStatus = (status) => {
    let type = 'xác nhận';
    if (status === 'pending') {
        type = 'chờ duyệt';
    } else if (status === 'reject') {
        type = 'từ chối';
    }
    return type;
}

export const getMethod = (method) => {
    let type = 'Tiền mặt';
    if (method === 'banking') {
        type = 'Ngân hàng';
    } else if (method === 'paypal') {
        type = 'Paypal';
    }
    return type;
}