export const getDateFormatDD_MM_YYYY = (dateStr) => {
    if (!dateStr) {
        return null;
    }
    const date = new Date(dateStr);
    let d = date.getDate();
    let m = date.getMonth() + 1;
    const y = date.getFullYear();
    if (d < 10) {
        d = '0' + d;
    }
    if (m < 10) {
        m = '0' + m;
    }
    return `${d}/${m}/${y}`;
}