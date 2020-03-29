
export const validateBankAccount = (accountNumber, bankName, bankAgency) => {
    let msg = {};
    //Account number
    if (accountNumber.length === 0) {
        msg.accountNumber = 'Xin nhập số tài khoản ngân hàng';
    } else if (accountNumber.length > 22) {
        msg.accountNumber = 'Số tài khoản ngân hàng không đúng';
    } else {
        const regex = new RegExp('^[0-9]+$');
        const valid = regex.test(accountNumber);
        if (!valid) {
            msg.accountNumber = 'Số tài khoản ngân hàng chỉ chứa các chữ số';
        }
    }
    //Bank name
    if (bankName.length === 0) {
        msg.bankName = 'Xin nhập tên ngân hàng';
    } else if (bankName.length > 100) {
        msg.address = 'Tên ngân hàng không quá 100 kí tự';
    }
    //Bank Agency
    if (bankAgency.length > 100) {
        msg.bankAgency = 'Chi nhánh ngân hàng không quá 100 kí tự';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}