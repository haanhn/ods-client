import React, { useContext } from 'react';
import MyProgressPieChart from './MyProgressPieChart';

const MyPieCharts = () => {
    

    return (
        <div className='row clearfix my-pie-charts'>
            <div className='col-sm-6 col-12' >
                <div className='my-pie-item'>
                    <MyProgressPieChart />
                </div>
            </div>
        </div>
    )
}

export default MyPieCharts;