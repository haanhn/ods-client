import React, { useState } from 'react';
import CreateCampaignImageBox from './CreateCampaignImageBox';
import '../../css/icon.css';

const CreateCampaignMoreInfo = () => {
    const [showTipsForStory, setShowTipsForStory] = useState(false); 

    const showTipsStory = () => setShowTipsForStory(!showTipsForStory);

    return (
        <div className='create-campaign-more-info'>
            <CreateCampaignImageBox />
            <div>
                <div>
                    <h5>Câu chuyện của bạn <i class="fas fa-info-circle icon-small theme_color"
                        // data-toggle="modal" data-target="#modalTipsShortDescr"
                        style={{ padding: '0 7px' }} 
                        onClick={showTipsStory} ></i> </h5>
                    <p>Chia sẻ với mọi người lý do bạn quyết định gây quỹ</p>
                    { showTipsForStory ? tipsForStory : null }
                </div>
                <textarea id='campaignStory' rows='5'></textarea>
            </div>
            <div className="row justify-content-end">
                <div className='box-button'>
                    <button className="btn btn-primary"
                    // onClick={onClick}
                    >Lưu và tiếp tục</button>
                </div>
            </div>
        </div>
    );
}

const tipsForStory = (
    <p>An effective story informs and inspires. Here's what you should include:

    Introduce yourself
    Your friends know you, but a bigger audience may not.
    Introduce your cause
    Describe your cause, its importance, the people involved, and what you're trying to achieve.
    Say what the money is for
    Explain how the money you raise will be used. Give details. They build trust.
    Ask for help
    Ask people to contribute money and share your campaign. If you don't ask, people won't act.
    Be personal, detailed and optimistic
    People respond to authenticity, information, and hope. Your job is to provide them.</p>
);

export default CreateCampaignMoreInfo;