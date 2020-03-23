import React, { useContext } from 'react';
import RatingStars from '../RatingStars';
import './rating-statistics.css';
import RatingBreakdownItem from './RatingBreakdownItem';

const RatingStatisticsContainer = (props) => {
    const point = props.point ? props.point : 0;
    const pointFormatted = (typeof point === 'number') ? point.toFixed(1) : point;
    const ratingStats = props.ratingStats ? props.ratingStats : {};
    const ratingBreakdownItemsJsx = getRatingBreakdownItemsJsx(ratingStats);

    let jsx = null;
    if (ratingStats && ratingStats.totalReviews) {
        if (ratingStats.totalReviews > 0) {
            jsx = (
                <div className='auto-container rating-statistics-container'>
                    <div className='row clearfix'>
                        <div className='col-md-4 col-sm-12 rating-point-overview'>
                            <div className='point' style={{ marginBottom: '12px' }}> {pointFormatted} </div>
                            <div style={{ marginBottom: '3px' }}>
                                <RatingStars points={point} />
                            </div>
                            <div style={{ fontSize: '91%' }}>
                                ({ratingStats.totalReviews ? ratingStats.totalReviews : 0} đánh giá)
                    </div>
                        </div>
                        <div className='col-md-8 col-sm-12 rating-breakdown'>
                            {ratingBreakdownItemsJsx}
                        </div>
                    </div>
                </div>
            );
        }
    }

    return jsx;
}

const getRatingBreakdownItemsJsx = (ratingStats) => {
    let i = 0;
    let itemsJsx = [];
    
    for (i = 0; i < 5; i++) {
        const stars = i + 1;
        let field = 'count' + stars;
        const itemAmount = ratingStats[field];
        itemsJsx.push(<RatingBreakdownItem stars={stars}
            itemAmount={itemAmount} totalAmount={ratingStats.totalReviews} />);
    }
    return itemsJsx;
}

export default RatingStatisticsContainer;

{/* <div className='row rating-breakdown-item'>
    <div className='col-2'>
        5 <i className='fas fa-star' style={{ fontSize: '90%' }}></i>
    </div>
    <div className='col-8'>

        <div class="progress" style={{ height: '12px' }}>
            <div class="progress-bar bg-success"
                role="progressbar"
                style={{ width: '50%' }}
            ></div>
        </div>
    </div>
    <div className='col-2'>120</div>
</div> */}
