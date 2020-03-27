export const getDateFormatDD_MM_YYYY = (dateStr) => {
    if (!dateStr) {
        return null;
    }
    try {
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
    } catch (error) {
        return null;
    }
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
    // const date = getDateFormatDD_MM_YYYY(dateStr);
    // const time = getTimeFormatHH_MM_SS(dateStr);

    // const dateTime = date + ' ' + time;

    // return dateTime;
}

export const calculateDaysBetweenDates = (fromDateStr, toDateStr) => {
    if (!fromDateStr || !toDateStr) {
        return -1;
    }
    try {
        const date1 = new Date(fromDateStr);
        const date2 = new Date(toDateStr);
        const time1 = date1.getTime();
        const time2 = date2.getTime();
        const timeRange = time2 - time1;
        let days = timeRange / (1000 * 60 * 60 * 24);
        if (days < 1) {
            let hours = days * 24;
            if (hours < 1) {
                let minutes = hours * 60;
                minutes = Math.floor(minutes);
                return minutes + ' phút';
            } else {
                hours = Math.floor(hours);
                return hours + ' giờ';
            }
        }
        days = Math.floor(days);
        return days + ' ngày';
    } catch (error) {
        return -1;
    }
}