import React, { useContext, useState } from 'react';
import FormRatingStars from '../../../campaigns/campaign-detail/campaign-ratings/FormRatingStars';
import UserProfileContext from '../../../../context/user-profile/UserProfileContext';
import Alert from '../../../common/Alert';

const FormCreateRatingHost = (props) => {
    const { userId } = props;

    const userProfileContext = useContext(UserProfileContext);
    const myRating = userProfileContext.myProfileRating;

    //For rating content
    const initContent = myRating && myRating.content ? myRating.content : '';
    const inputContent = React.createRef();
    //For rating point
    const initPoint = myRating && myRating.point ? myRating.point : 0;
    const [init, setInit] = useState(true);
    const [ratingPoint, setRatingPoint] = useState(initPoint);
    const [maxIndexStarChecked, setMaxIndexStarChecked] = useState(initPoint - 1);
    //State Alert
    const [alertContent, setAlertContent] = useState(null);

    const rateHost = async () => {
        const content = inputContent.current.value.trim();
        setAlertContent(null);
        const messages = validateData(content);
        if (messages) {
            if (messages.content) {
                setAlertContent({ type: 'danger', msg: messages.content });
            }
        } else {
            const result = await userProfileContext.createProfileRating(ratingPoint, content);
            if (result === true) {
                userProfileContext.getProfileRatingStats(userId);
                userProfileContext.getProfileRatings(userId);
                setAlertContent({ type: 'success', msg: 'Đánh giá thành công' });
            }
        }
    }

    return (
        <div className='form-create-rating'>
            <div className='div-rating-stars'>
                <h6 style={{ fontWeight: 'bold' }}>Đánh giá của bạn</h6>
                <FormRatingStars
                    init={init} setInit={setInit} initPoint={initPoint}
                    point={ratingPoint} setPoint={setRatingPoint}
                    maxIndexStarChecked={maxIndexStarChecked} setMaxIndexStarChecked={setMaxIndexStarChecked}
                />
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
                        onClick={rateHost} >Đánh giá</button>
                ) : (
                    <button className="btn btn-sm btn-outline-success" style={{ maxidth: '100%', fontWeight: 'bold' }}
                        disabled >Đánh giá</button>
                )}
            </div>
        </div>
    )
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

export default FormCreateRatingHost;