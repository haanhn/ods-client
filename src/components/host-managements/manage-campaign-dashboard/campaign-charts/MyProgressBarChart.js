import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import MyCampaignsContext from '../../../../context/mycampaigns/mycampaignsContext';
import { getDateFormatDD_MM, checkDatesOnSameDay } from '../../../../utils/commonUtils';

const MyProgressBarChart = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);

    const campaign = myCampaignsContext.hostViewingCampaign;
    const startDateStr = campaign && campaign.campaignStartDate ? campaign.campaignStartDate : null;
    const stats = myCampaignsContext.viewingCampaignStats;
    const donations = stats && stats.donations ? stats.donations : [];

    let dataDonations = null;

    if (donations && donations.length > 0) {
        const labels = [];
        const data = [];
        getDataOfDonationLineChart(startDateStr, donations, labels, data);
        dataDonations = {
            labels: labels,
            datasets: [
                {
                    label: 'Số tiền quyên góp',
                    // fill: false,
                    // lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    // borderJoinStyle: 'miter',
                    // pointBorderColor: 'rgba(75,192,192,1)', pointBackgroundColor: '#fff',
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 5,
                    // pointHoverBackgroundColor: 'rgba(75,192,192,1)', pointHoverBorderColor: 'rgba(220,220,220,1)',
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    // pointHitRadius: 10,
                    data: data
                }
            ]
        };
    }
    return dataDonations ? (
        <div>
            <Bar
                options={{
                    title: {
                        display: true, fontSize: 20, position: 'bottom',
                        text: 'Quyên góp theo ngày'
                    }
                }}
                data={dataDonations}
                width={750} height={300}
            />
        </div>
    ) : null;
}

export default MyProgressBarChart;

const getDataOfDonationLineChart = (startDateStr, donations, labels, datas) => {
    // const datas = [];
    if (!donations || donations.length === 0) {
        return;
    }
    const mapData = new Map();
    // if (donations && donations.length > 0) {
    let i = 0;
    for (i = 0; i < donations.length; i++) {
        const donation = donations[i];
        const createdAt = donation.createdAt;
        let dateCreated = new Date(createdAt);
        const d = dateCreated.getDate();
        const m = dateCreated.getMonth();
        const y = dateCreated.getFullYear();
        dateCreated = new Date(y, m, d);
        const dateOfMap = getDateInMap(mapData, dateCreated);
        let amount = mapData.get(dateOfMap);
        const settingDate = dateCreated;
        if (!amount) {
            amount = donation.donationAmount;
            mapData.set(settingDate, amount);
        } else {
            amount = amount + donation.donationAmount;
            mapData.set(dateOfMap, amount);
        }
    }


    let startDate = new Date(startDateStr);
    const dS = startDate.getDate();
    const mS = startDate.getMonth();
    const yS = startDate.getFullYear();
    startDate = new Date(yS, mS, dS);

    let today = new Date();
    const dTd = today.getDate();
    const mTd = today.getMonth();
    const yTd = today.getFullYear();
    today = new Date(yTd, mTd, dTd);

    let iDate = startDate;
    do {
        const dateInMap = getDateInMap(mapData, iDate);
        if (!dateInMap) {
            mapData.set(iDate, 0);
        }
        iDate = new Date(iDate.getTime() + 1000*60*60*24);
    } while (iDate.getTime() <= today.getTime());

    console.log((mapData));
    mapData.forEach((amount, date) => {
        const dateLb = getDateFormatDD_MM(date);
        labels.push(dateLb);
        datas.push(amount);
    });
    // }
}

const getDateInMap = (mapDate, dateToFind) => {
    try {
        if (!mapDate || mapDate.size === 0) {
            return null;
        }
        let foundDate = null;
        mapDate.forEach((amount, date) => {
            const sameDate = checkDatesOnSameDay(dateToFind, date);
            if (sameDate) {
                foundDate = date;
            }
        });
        return foundDate;
    } catch (error) {
        console.error(error);
        return null;
    }
}