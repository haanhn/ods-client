import React from 'react';

const RatingBreakdownItem = (props) => {
    const { stars, itemAmount, totalAmount } = props;
    let percentage = (itemAmount / totalAmount) * 100;
    percentage = percentage + '%';
    return (
        <div className='row rating-breakdown-item'>
            <div className='col-2'>
                { stars ? stars : 0 } <i className='fas fa-star' style={{ fontSize: '90%' }}></i>
            </div>
            <div className='col-8'>
                <div class="progress" style={{ height: '12px' }}>
                    <div class="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: percentage }}
                    ></div>
                </div>
            </div>
            <div className='col-2'>{itemAmount ? itemAmount : 0}</div>
        </div>
    );
}

export default RatingBreakdownItem;