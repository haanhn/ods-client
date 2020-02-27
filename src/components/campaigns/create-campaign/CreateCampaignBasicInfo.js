import React, { useContext, useState, useEffect } from 'react';

const CreateCampaignBasicInfo = (props) => {

    //States Data
    const { categories, campaign } = props;
    const { setCurrentStep, setBasicInfo } = props;
    const [title, setTitle] = useState(campaign.title);
    const [goal, setGoal] = useState(campaign.goal);
    const [endDate, setEndDate] = useState(campaign.endDate);
    const [category, setCategory] = useState(campaign.category);
    const [shortDescription, setShortDescription] = useState(campaign.shortDescription);
    //State Alerts
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertGoal, setAlertGoal] = useState(null);

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

    const updateTitle = (event) => {
        if (!category) {
            setCategory(categories[0].id);
        }
        setTitle(event.target.value)
    }

    const onClick = (event) => {
        event.preventDefault();

        const messages = validateData(title, goal);
        if (messages !== null) {
            if (messages.title !== null) {
                setAlertTitle(alert(messages.title));
            }
            if (messages.goal !== null) {
                setAlertGoal(alert(messages.goal));
            }
        } else {
            setAlertTitle(null);
            setAlertGoal(null);
            console.log(`category ${category}`)
            const newCampaign = { title, goal, endDate, category, shortDescription };
            setBasicInfo(newCampaign);
            setCurrentStep(2);
        }
    }

    return (
        <form>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Tên chiến dịch</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Tên chiến dịch"
                        value={title} onChange={updateTitle} />
                    {alertTitle}
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Mục tiêu</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" placeholder="Mục tiêu"
                        value={goal} onChange={(event) => setGoal(event.target.value)} />
                    {alertGoal}
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Ngày kết thúc</label>
                <div className="col-sm-10">
                    <input type="date" className="form-control"
                        value={endDate} onChange={(event) => setEndDate(event.target.value)} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Thể loại</label>
                <div className="col-sm-10">

                    <select className="custom-select"
                        onChange={(event) => setCategory(event.target.value)} >
                        {categoriesJsx}
                    </select>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Mô tả ngắn</label>
                <div className='col-sm-10'>
                    <textarea className="form-control" rows="3"
                        value={shortDescription}
                        onChange={(event) => setShortDescription(event.target.value)} />
                </div>
            </div>

            <div className="form-group row">
                <div>
                    <button className="btn btn-primary" onClick={onClick}>Lưu và tiếp tục</button>
                </div>
            </div>
        </form>
    );
}

const alert = (msg) => {
    return msg ? <div style={{ color: 'red' }}>{msg}</div> : null;
}

const validateData = (title, goal) => {
    let msg = {};
    if (title.length === 0) {
        msg.title = 'Xin nhập tên chiến dịch';
    }
    const goalNumber = parseFloat(goal);
    if (goal.length === 0) {
        msg.goal = 'Xin nhập mục tiêu';
        console.log(goalNumber);
    } else if (Number.isNaN(goalNumber) || goalNumber <= 0) {
        msg.goal = 'Mục tiêu phải là số lớn hơn 0';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default CreateCampaignBasicInfo;

//Ref
    // let inputTitle = React.createRef();
    // let inputGoal = React.createRef();
    // let inputEndDate = React.createRef();
    // let inputCategory = React.createRef();
    // let inputShortDescription = React.createRef();
    //------------------------------------------------------
    // const title = inputTitle.current.value;
    // const goal = inputGoal.current.value;
    // const endDate = inputEndDate.current.value;
    // const category = inputCategory.current.value;
    // const shortDescription = inputEndDate.current.value;
