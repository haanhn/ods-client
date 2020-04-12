import { getIntegerDaysBetweenDates } from './commonUtils';

export const getAverageDonationAmount = (raised, countDonations) => {
    if (!raised || !countDonations) {
        return 0;
    }
    if (raised === 0 || countDonations === 0) {
        return 0;
    }
    let average = Math.round(raised / countDonations);
    return average;
}

export const getCampaignRunningDays = (campaign) => {
    if (!campaign) {
        return 0;
    }
    try {
        let days = 0;
        if (Object.keys(campaign).length > 0) {
            const status = campaign.campaignStatus;
            const startDate = campaign.campaignStartDate;
            const today = new Date();
            if (status === 'public' && startDate) {
                days = getIntegerDaysBetweenDates(startDate, today);
                days = days > 0 ? days : 1;
            }
        }
        return days;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const getCampaignTotalDays = (campaign) => {
    if (!campaign) {
        return 0;
    }
    try {
        let days = 0;
        if (Object.keys(campaign).length > 0) {
            const status = campaign.campaignStatus;
            const startDate = campaign.campaignStartDate;
            const endDate = campaign.campaignEndDate;
            if (status === 'public' && startDate && endDate) {
                days = getIntegerDaysBetweenDates(startDate, endDate);
                days = days > 0 ? days : 1;
            }
        }
        return days;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const getCampaignProgress = (progress, campaign) => {
    if (!campaign) {
        return '';
    }
    try {
        let progressStr = '';
        if (Object.keys(campaign).length > 0) {
            const status = campaign.campaignStatus;
            const startDate = campaign.campaignStartDate;
            const endDate = campaign.campaignEndDate;
            if (status === 'public' && startDate && endDate && progress > 0) {
                progressStr = Math.round(progress * 100);
                progressStr = progressStr + '%';
            }
        }
        return progressStr;
    } catch (error) {
        console.error(error);
        return '';
    }
}