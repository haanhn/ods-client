import React, { useState, useContext, useEffect } from 'react';
import FormRatingStars from './FormRatingStars';
import '../../../css/campaign-detail-tabs.css';
import Alert from '../../../common/Alert';
import CampaignsContext from '../../../../context/campaigns/campaignsContext';

const FormCreateRating = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const myRating = campaignsContext.myCampaignRating;
    const { ratingStats } =props;

    //For rating content
    const initContent = myRating && myRating.content ? myRating.content : '';
    const inputContent = React.createRef();
    //For rating point
    let initPoint = 0;
    if (myRating && myRating.point) {
        initPoint = myRating.point;
    }
    const [init, setInit] = useState(true);
    const [ratingPoint, setRatingPoint] = useState(initPoint);
    const [maxIndexStarChecked, setMaxIndexStarChecked] = useState(initPoint - 1);
    //State Alert
    const [alertContent, setAlertContent] = useState(null);

    const rateCampaign = async () => {
        const content = inputContent.current.value.trim();
        setAlertContent(null);
        const messages = validateData(content);
        if (messages) {
            if (messages.content) {
                setAlertContent({ type: 'danger', msg: messages.content });
            }
        } else {
            const result = await campaignsContext.postCampaignRating(ratingPoint, content);
            if (result > 0) {
                // const stats = await campaignsContext.getCampaignRatingsStats(slug);
                // props.setRatingStats(stats);
                setAlertContent({ type: 'success', msg: 'Đăng đánh giá thành công' });
            }
        }
    }

    let css = null;
    if (ratingStats && ratingStats.totalReviews) {
        if (ratingStats.totalReviews > 0) {
            css = cssClass;
        }
    }

    return (
        <div className='form-create-rating' style={css}>
            <div className='div-rating-stars'>
                <h6 style={{ fontWeight: 'bold' }}>Đánh giá của bạn</h6>
                <FormRatingStars init={init} setInit={setInit} initPoint={initPoint}
                    point={ratingPoint} setPoint={setRatingPoint}
                    maxIndexStarChecked={maxIndexStarChecked} setMaxIndexStarChecked={setMaxIndexStarChecked} />
            </div>
            <div className="form-group">
                <textarea className="form-control" rows="3" placeholder='Nhận xét về chiến dịch'
                    ref={inputContent} defaultValue={initContent}
                />
                <Alert alert={alertContent} />
            </div>
            <div style={{ textAlign: 'center' }}>
                {ratingPoint > 0 ? (
                    <button className="btn btn-sm btn-outline-success" style={{ maxidth: '100%', fontWeight: 'bold' }}
                        onClick={rateCampaign} >Đánh giá</button>
                ) : (
                    <button className="btn btn-sm btn-outline-success" style={{ maxidth: '100%', fontWeight: 'bold' }}
                        onClick={rateCampaign} disabled >Đánh giá</button>
                ) }
            </div>
        </div>

    );
}

const validateData = (content) => {
    let msg = {};
    if (content.length > 200) {
        msg.content = 'Nhận xét không quá 200 kí tự';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

/* Css for case: seperate rating stats container with the rating box of donor */
const cssClass = {
    marginTop: '9px',
    paddingTop: '12px',
    borderTop: '1px solid slategrey'
}

export default FormCreateRating;