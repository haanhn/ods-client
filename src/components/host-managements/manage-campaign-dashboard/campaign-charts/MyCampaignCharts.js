import React, { Fragment } from 'react';
import MyProgressPieChart from './MyProgressPieChart';
import MyProgressBarChart from './MyProgressBarChart';

const MyCampaignCharts = () => {


    return (
        <Fragment>
            <div className='row clearfix my-pie-charts my-chart'>
                <div className='col-6 my-chart-title'>
                    <h4>Quyên góp đến chiến dịch</h4>
                </div>
                <div className='col-6' >
                    <div className='my-pie-item'>
                        <MyProgressPieChart />
                    </div>
                </div>
            </div>
            <div className='row clearfix my-chart'>
                <div className='col-12' >
                    <MyProgressBarChart />
                </div>
            </div>
        </Fragment>
    )
}

export default MyCampaignCharts;