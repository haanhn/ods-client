import React, { useContext } from 'react';
// import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { Pie } from 'react-chartjs-2';
import MyCampaignsContext from '../../../../context/mycampaigns/mycampaignsContext';


const MyProgressPieChart = (props) => {
    const myCampaignsContext = useContext(MyCampaignsContext);

    const stats = myCampaignsContext.viewingCampaignStats;
    const campaign = myCampaignsContext.hostViewingCampaign;
    const raised = stats && stats.raised ? stats.raised : 0;
    const goal = campaign && campaign.campaignGoal ? campaign.campaignGoal : 0;

    let amountLeftToRaise = 0;
    if (goal > 0) {
        amountLeftToRaise = goal - raised;
        if (amountLeftToRaise < 0) {
            amountLeftToRaise = 0
        }
    }

    return (
        <div>
            <Pie
                data={{
                    labels: ['Đã quyên được', 'Còn thiếu'],
                    datasets: [{
                        data: [raised, amountLeftToRaise],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        borderWidth: 0
                    }]
                }}
                width={200} height={200}
            />
        </div>
    )

}

export default MyProgressPieChart;