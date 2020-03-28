import React from 'react';
import FormRatingStars from '../../../campaigns/campaign-detail/campaign-ratings/FormRatingStars';

const FormCreateRatingHost = () => {
    return (
        <div className='form-create-rating'>
            <div className='div-rating-stars'>
                <h6 style={{ fontWeight: 'bold' }}>Đánh giá của bạn</h6>
                <FormRatingStars 
                    // init={init} setInit={setInit} initPoint={initPoint}
                    // point={ratingPoint} setPoint={setRatingPoint}
                    // maxIndexStarChecked={maxIndexStarChecked} setMaxIndexStarChecked={setMaxIndexStarChecked} 
                    />
            </div>
            <div className="form-group">
                <textarea className="form-control" rows="3" placeholder='Nhận xét về chiến dịch'
                    // ref={inputContent} defaultValue={initContent}
                />
                {/* <Alert alert={alertContent} /> */}
            </div>
            <div style={{ textAlign: 'center' }}>
                <button 
                className="btn btn-sm btn-outline-success"
                 style={{ maxidth: '100%', fontWeight: 'bold' }}
                        // onClick={rateCampaign} 
                        >Đánh giá</button>
                {/* {ratingPoint > 0 ? (
                    <button className="btn btn-sm btn-outline-success" style={{ maxidth: '100%', fontWeight: 'bold' }}
                        onClick={rateCampaign} >Đánh giá</button>
                ) : (
                    <button className="btn btn-sm btn-outline-success" style={{ maxidth: '100%', fontWeight: 'bold' }}
                        onClick={rateCampaign} disabled >Đánh giá</button>
                ) } */}
            </div>
        </div>
    )
}

export default FormCreateRatingHost;