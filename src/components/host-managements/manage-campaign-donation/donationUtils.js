export const getDonationStatus = (status) => {
    let type = 'đã xác nhận';
    if (status === 'pending') {
        type = 'chờ xác nhận';
    } else if (status === 'reject') {
        type = 'từ chối';
    }
    return type;
}

export const getMethod = (method) => {
    let type = 'Chuyển tiền mặt';
    if (method === 'banking') {
        type = 'Chuyển ngân hàng';
    } else if (method === 'paypal') {
        type = 'Paypal';
    }
    return type;
}