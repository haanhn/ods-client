export const getPostStatus = (status) => {
    let type = 'công khai';
    if (status === 'disable') {
        type = 'bản nháp';
    }
    return type;
}