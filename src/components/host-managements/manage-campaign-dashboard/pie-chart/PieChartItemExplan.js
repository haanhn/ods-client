import React from 'react'

const PieChartItemExplan = (props) => {
    const color = props && props.color ? props.color : '#034df8';
    const name = props && props.name ? props.name : 'Tên thành phần biểu đồ';


    return (
        <div className='pie-chart-item-explan'>
            <div className='pie-color' style={{ backgroundColor: color }}></div>
            <span>{name}</span>
        </div>
    )
}

export default PieChartItemExplan;