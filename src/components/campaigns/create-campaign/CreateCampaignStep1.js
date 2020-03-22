import React, { useContext, useState } from 'react';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import Alert from '../../common/Alert';
import '../../css/icon.css';

const CreateCampaignStep1 = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { categories } = campaignsContext;
    const { campaign, createCampaignStep1 } = props;

    let inputTitle = React.createRef();
    let inputCategory = React.createRef();
    let inputShortDescription = React.createRef();

    //State Alerts
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertShortDescription, setAlertShortDescription] = useState(null);

    let categoriesJsx = null;
    if (categories) {
        categoriesJsx =
            categories.map((category) => {
                return (campaign.category == category.id ?
                    <option value={category.id} key={category.id} selected>
                        {category.categoryTitle}
                    </option> :
                    <option value={category.id} key={category.id}>{category.categoryTitle}</option>
                );
            });
    }

    const createStep1 = (event) => {
        event.preventDefault();
        const title = inputTitle.current.value.trim();
        const category = inputCategory.current.value;
        const shortDescription = inputShortDescription.current.value.trim();

        setAlertTitle(null);
        setAlertShortDescription(null);
        console.log('category')
        console.log(category)
        const messages = validateData(title, shortDescription);
        if (messages) {
            if (messages.title) {
                setAlertTitle({ type: 'danger', msg: messages.title });
            }
            if (messages.shortDescription) {
                setAlertShortDescription({ type: 'danger', msg: messages.shortDescription });
            }
        } else {

            console.log(category)
            createCampaignStep1(title, category, shortDescription);
        }

    }

    return (
        <div className='create-campaign-name'>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Tên chiến dịch
                        <i class="fas fa-info-circle icon-small theme_color"
                            data-toggle="modal" data-target="#modalTipsName"
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
                        <i class="fas fa-info-circle icon-small theme_color"
                            data-toggle="modal" data-target="#modalTipsShortDescr"
                            style={{ padding: '0 7px' }} ></i>
                    </label>
                    <div className="col-sm-12">
                        <textarea type="text" className="form-control" placeholder="Mô tả ngắn"
                            rows='3'
                            ref={inputShortDescription}
                            defaultValue={campaign.campaignShortDescription}
                        />
                        <Alert alert={alertShortDescription} />
                    </div>
                </div>

                <div className="row justify-content-end">
                    <div className='box-button'>
                        <button className="btn btn-primary"
                            onClick={createStep1}
                        >Lưu và tiếp tục</button>
                    </div>
                </div>
            </form>
            {tipsForName}
            {tipsForShortDescr}

        </div>
    );
}

const tipsForName = (
    // {/* <!-- The Modal --> */ }
    < div className="modal" id="modalTipsName" >
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h5 className="modal-title">Cách đặt tên</h5>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body">

                    <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    <p>A good title can make your campaign stand out. Identify your cause, ask for help, and use a personal tone. You can include:

                    The name of the person, group, or organization that needs help e.g. Nancy.
                    A call to action e.g. Please help ....
A personal connection, detail or tone e.g. Please help us pay for Nancy's chemo costs.</p>
                </div>
            </div>
        </div>
    </div >
);

const tipsForShortDescr = (
    // {/* <!-- The Modal --> */ }
    < div className="modal" id="modalTipsShortDescr" >
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h5 className="modal-title">ShortDescription</h5>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body">

                    <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    <p>A good title can make your campaign stand out. Identify your cause, ask for help, and use a personal tone. You can include:

                    The name of the person, group, or organization that needs help e.g. Nancy.
                    A call to action e.g. Please help ....
A personal connection, detail or tone e.g. Please help us pay for Nancy's chemo costs.</p>
                </div>
            </div>
        </div>
    </div >
);

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