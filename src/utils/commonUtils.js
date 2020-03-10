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

export const getTimeFormatHH_MM_SS = (dateStr) => {
    if (!dateStr) {
        return null;
    }
    const date = new Date(dateStr);
    let h = date.getHours();
    let m = date.getMinutes();
    const s = date.getSeconds();
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    return `${h}:${m}:${s}`;
}

export const getDateTimeFormatDD_MM_YYYY_HH_MM_SS = (dateStr) => {
    if (!dateStr) {
        return null;
    }
    const date = getDateFormatDD_MM_YYYY(dateStr);
    const time = getTimeFormatHH_MM_SS(dateStr);

    const dateTime = date + ' ' + time;

    return dateTime;
}