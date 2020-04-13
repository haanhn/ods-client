import React, { useContext, useEffect } from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import Chart from 'chart.js';
import { Pie } from 'react-chartjs-2';
import MyCampaignsContext from '../../../../context/mycampaigns/mycampaignsContext';
import PieChartItemExplan from './PieChartItemExplan';


const MyProgressPieChart = (props) => {
    let progress = props.progress;
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

    const data = [
        {
            color: colors.raised,
            title: pieItemNames.raised,
            key: 0,
            value: raised
        },
        {
            color: colors.leftToRaise,
            title: pieItemNames.leftToRaise,
            key: 1,
            value: amountLeftToRaise
        },
    ];

    // const itemsExplan = [
    //     <PieChartItemExplan color={colors.raised} name={pieItemNames.raised} />,
    //     <PieChartItemExplan color={colors.leftToRaise} name={pieItemNames.leftToRaise} />
    // ];


    let pieJsx = null;
    if (raised > 0 && goal > 0) {
        pieJsx = <ReactMinimalPieChart
            animate={false}
            animationDuration={500}
            animationEasing="ease-out"
            cx={50} cy={50}
            data={data}
            label={(labelProps) => {
                const val = Math.round(labelProps.data[labelProps.dataIndex].percentage);
                return val + '%';
            }}
            labelPosition={50}
            lengthAngle={360}
            labelStyle={{
                fill: '#fff',
                fontFamily: 'sans-serif',
                fontSize: '6px'
            }}
            lineWidth={100}
            paddingAngle={0}
            radius={50}
            rounded={false}
            startAngle={0}
            viewBoxSize={[
                100,
                100
            ]}
        />
    }

    // let pie = null;
    // useEffect(() => {
    //     if (raised && goal && raised > 0 && goal > 0) {
    //         const canvas = document.getElementById('pieProgress');
    //         if (canvas) {
    //             var myPieChart = new Chart(canvas, {
    //                 type: 'pie',
    //                 data: {
    //                     datasets: [{
    //                         data: [10, 20, 30]
    //                     }],

    //                     // These labels appear in the legend and in the tooltips when hovering different arcs
    //                     labels: [
    //                         'Red',
    //                         'Yellow',
    //                         'Blue'
    //                     ],
    //                     backgroundColor: [
    //                         "#3e95cd", "#8e5ea2", "#3cba9f"
    //                         // 'rgba(75, 192, 192, 0.2)',
    //                         // 'rgba(153, 102, 255, 0.2)',
    //                         // 'rgba(255, 159, 64, 0.2)'
    //                     ],
    //                 },
    //                 // options: options
    //             });
    //         }
    //     }
    // }, []);

    return (
        <div>


            <Pie data={{
                labels: [
                    'Đã quyên được',
                    'Còn thiếu'
                ],
                datasets: [{
                    data: [raised, amountLeftToRaise],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    borderWidth: 0
                }]
            }}
                width={200} height={200}
            />
            <h5 style={{marginTop: '10px', fontSize: '97%', textAlign: 'center'}}>Tiến độ quyên góp của chiến dịch</h5>
        </div>
    )

    // return (
    //     pieJsx ? (
    //         <div>
    //             <div className='my-pie'>
    //                 {pieJsx}
    //             </div>
    //             <div className='my-pie-item-explans'>
    //                 {itemsExplan}
    //             </div>
    //         </div >
    //     ) : null
    // );
}

const colors = {
    raised: '#034df8',
    leftToRaise: '#E38627'
};
const pieItemNames = {
    raised: 'Số tiền quyên được',
    leftToRaise: 'Số tiền cần quyên'
};

export default MyProgressPieChart;