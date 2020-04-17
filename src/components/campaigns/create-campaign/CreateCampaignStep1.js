import React, { useContext, useState } from 'react';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import Alert from '../../common/Alert';
import '../../css/icon.css';
import CommonModal from './create-campaign-modal-suggest/CommonModal';
import { tipsForName, tipsForShortDescr } from './create-campaign-modal-suggest/tipsModal';

const CreateCampaignStep1 = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { categories } = campaignsContext;
    const { campaign, loading, createCampaignStep1 } = props;

    let inputTitle = React.createRef();
    let inputCategory = React.createRef();
    let inputShortDescription = React.createRef();

    //State Alerts
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertShortDescription, setAlertShortDescription] = useState(null);
    const [alertResult, setAlertResult] = useState(null);

    //State for suggestions
    const [showingModalTitle, setShowingModalTitle] = useState(false);
    const [showingModalShortDescr, setShowingModalShortDescr] = useState(false);

    let categoriesJsx = null;
    if (categories) {
        categoriesJsx =
            categories.map((category) => {
                return (campaign.category === category.id ?
                    <option value={category.id} key={category.id} selected>
                        {category.categoryTitle}
                    </option> :
                    <option value={category.id} key={category.id}>{category.categoryTitle}</option>
                );
            });
    }

    const createStep1 = async (event) => {
        event.preventDefault();
        const title = inputTitle.current.value.trim();
        const category = inputCategory.current.value;
        const shortDescription = inputShortDescription.current.value.trim();

        setAlertTitle(null);
        setAlertShortDescription(null);
        setAlertResult(null);

        const messages = validateData(title, shortDescription);
        if (messages) {
            if (messages.title) {
                setAlertTitle({ type: 'danger', msg: messages.title });
            }
            if (messages.shortDescription) {
                setAlertShortDescription({ type: 'danger', msg: messages.shortDescription });
            }
        } else {
            const result = await createCampaignStep1(title, category, shortDescription);
            if (result === false) {
                setAlertResult({ type: 'danger', msg: 'Lưu thất bại, xin hãy thử lại' });
            }
        }
    }

    return (
        <div className='create-campaign-name'>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Tên chiến dịch
                        <i className="fas fa-info-circle icon-small theme_color"
                            onClick={() => setShowingModalTitle(true)}
                            style={{ padding: '0 7px' }} ></i>
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tên chiến dịch"
                            defaultValue={campaign.campaignTitle}
                            ref={inputTitle}
                        />
                        <Alert alert={alertTitle} />
                    </div>
                </div>

                {categoriesJsx ?
                    (<div className="row">
                        <label className="col-sm-12 col-form-label">Thể loại</label>
                        <div className="col-sm-12">
                            <select className="custom-select" ref={inputCategory} >
                                {categoriesJsx}
                            </select>
                        </div>
                    </div>)
                    : null
                }

                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Mô tả ngắn
                        <i className="fas fa-info-circle icon-small theme_color"
                            onClick={() => setShowingModalShortDescr(true)}
                            style={{ padding: '0 7px' }} ></i>
                    </label>
                    <div className="col-sm-12">
                        <textarea type="text" className="form-control" placeholder="Mô tả ngắn"
                            rows='3'
                            ref={inputShortDescription}
                            defaultValue={campaign.campaignShortDescription}
                        />
                        <Alert alert={alertShortDescription} />
                        <Alert alert={alertResult} />
                    </div>
                </div>

                <div className="row justify-content-end">
                    <div className='box-button'>
                        {loading ? (
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm"></span>
                                &nbsp; Đang lưu...
                            </button>) : (
                                <button className="btn btn-primary" onClick={createStep1}>Lưu và tiếp tục</button>
                            )}
                    </div>
                </div>
            </form>

            <CommonModal showingModal={showingModalTitle} setShowingModal={setShowingModalTitle}
                title='Cách đặt tên chiến dịch' message={tipsForName} />
            <CommonModal showingModal={showingModalShortDescr} setShowingModal={setShowingModalShortDescr}
                title='Mô tả ngắn' message={tipsForShortDescr} />

        </div>
    );
}

const validateData = (title, shortDescription) => {
    let msg = {};
    if (title.length === 0) {
        msg.title = 'Xin nhập tên chiến dịch';
    } else if (title.length > 50) {
        msg.title = 'Tên chiến dịch không quá 50 kí tự';
    }
    if (shortDescription.length > 500) {
        msg.shortDescription = 'Mô tả ngắn không quá 500 kí tự';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default CreateCampaignStep1;