export const getDonationStatus = (status) => {
    let type = 'xác nhận';
    if (status === 'pending') {
        type = 'chờ duyệt';
    } else if (status === 'reject') {
        type = 'từ chối';
    } else if (status === 'returned') {
        type = 'trả lại';
    }
    return type;
}

export const getMethod = (method) => {
    let type = 'Tiền mặt';
    if (method === 'outside') {
        type = 'Nhận bên ngoài';
    } else if (method === 'banking') {
        type = 'Ngân hàng';
    } else if (method === 'paypal') {
        type = 'Paypal';
    }
    return type;
}