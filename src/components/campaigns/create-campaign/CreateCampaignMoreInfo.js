import React, { useState, useEffect } from 'react';
import CreateCampaignImageBox from './CreateCampaignImageBox';
import '../../css/icon.css';
import { Editor } from '@tinymce/tinymce-react';
import { getTinymce } from '@tinymce/tinymce-react/lib/cjs/main/ts/TinyMCE';

import { mceApiKey } from '../../../privateApiKeys';

const CreateCampaignMoreInfo = (props) => {

    const { campaign, createCampaignStep2 } = props;
    const [image, setImage] = useState(campaign.image);
    const [description, setDescription] = useState(campaign.description);
    const [showTipsForStory, setShowTipsForStory] = useState(false);

    const showTipsStory = () => setShowTipsForStory(!showTipsForStory);

    const onClick = () => {
        console.log('step 2 onclick');
        if (image || description) {
            console.log('Step 2: image not empty or description not empty');
            createCampaignStep2(image, description);
        }
    }

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:');
        console.log(editor.getContent());
        setDescription(editor.getContent());
    }
    const editor = <Editor
        initialValue={description}
        init={{
            height: 300,
            menubar: false,
            plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount'
            ],
            toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent '
                // | help'
        }}
        onChange={handleEditorChange}
    />;
    return (
        <div className='create-campaign-more-info'>
            <CreateCampaignImageBox image={image} setImage={setImage} />
            <div>
                <div>
                    <h5>Câu chuyện của bạn <i class="fas fa-info-circle icon-small theme_color"
                        style={{ padding: '0 7px' }}
                        onClick={showTipsStory} ></i> </h5>
                    <p>Chia sẻ với mọi người lý do bạn quyết định gây quỹ</p>
                    {showTipsForStory ? tipsForStory : null}
                </div>
                {/* <textarea id='campaignStory' rows='5'></textarea> */}
                {editor}
            </div>
            <div className="row justify-content-end">
                <div className='box-button'>
                    <button className="btn btn-primary"
                        onClick={onClick}
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