import React, { useContext, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';
import { odsAPIOpenRoutes, odsBase } from '../../../odsApi';

const MyCampaignTabStory = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const campaign = myCampaignsContext.hostViewingCampaign;
    const initShortDescription = campaign ? campaign.campaignShortDescription : '';
    const initDescription = campaign ? campaign.campaignDescription : '';

    const [description, setDescription] = useState(initDescription);
    const inputShortDescription = React.createRef();

    //State Alert
    const [alertShortDescription, setAlertShortDescription] = useState(null);
    const [alertResult, setAlertResult] = useState(null);

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:');
        console.log(editor.getContent());
        setDescription(editor.getContent());
    }

    const editor = <Editor
        initialValue={initDescription}
        init={{
            height: 350,
            menubar: false,
            plugins: [
                'advlist autolink lists link image media mediaembed',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount'
            ],
            toolbar:
                'undo redo | formatselect | bold italic underline| \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | image media',
            mediaembed_max_width: 450,
            file_picker_types: 'image',
            images_upload_handler: async function (blobInfo, success, failure) {
                console.log('blobInfo');
                console.log(blobInfo.blob());
                console.log(blobInfo.filename());
                var xhr, formData;

                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', `${odsBase}${odsAPIOpenRoutes.uploadSingleImage}`);

                xhr.onload = function () {
                    var json;

                    if (xhr.status != 200) {
                        console.log(`xhr status ${xhr.status}`)
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }

                    json = JSON.parse(xhr.responseText);

                    //   if (!json || typeof json.location != 'string') {
                    if (!json || typeof json.data.url != 'string') {
                        console.log('HTTP Error: ' + xhr.responseText);
                        failure('Invalid JSON: ' + xhr.responseText);
                        return;
                    }

                    console.log('json success: ' + json);
                    success(json.data.url);
                };

                formData = new FormData();
                // formData.append('image', blobInfo.blob(), blobInfo.filename());
                formData.append('image', blobInfo.blob());
                xhr.send(formData);
            }
        }}
        onChange={handleEditorChange}
    />;

    const saveStory = async (event) => {
        event.preventDefault();

        const shortDescription = inputShortDescription.current.value.trim();
        setAlertShortDescription(null);
        setAlertResult(null);
        
        const messages = validateData(shortDescription);
        if (messages) {
            if (messages.shortDescription) {
                setAlertShortDescription({ type: 'danger', msg: messages.shortDescription });
            }
        } else {
            const result = await myCampaignsContext.updateCampaign(
                campaign.id,
                campaign.campaignTitle,
                campaign.categoryId,
                shortDescription,
                description,
                campaign.campaignThumbnail,
                campaign.campaignAddress,
                campaign.campaignRegion,
                campaign.campaignEndDate,
                campaign.campaignGoal,
                campaign.autoClose
            );
            if (result) {
                setAlertResult({ type: 'success', msg: 'Cập nhật thành công' });
            } else {
                setAlertResult({ type: 'danger', msg: 'Cập nhật thất bại, xin thử lại' });
            }
        }
    }

    return (
        <div>
            <form>
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
                            defaultValue={initShortDescription}
                        />
                        <Alert alert={alertShortDescription} />
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Câu chuyện của bạn
                        <i class="fas fa-info-circle icon-small theme_color"
                            data-toggle="modal" data-target="#modalTipsShortDescr"
                            style={{ padding: '0 7px' }} ></i>
                    </label>
                    <div className="col-sm-12">
                        {editor}
                    </div>
                </div>
                <div className="row justify-content-end">
                    <Alert alert={alertResult}/>
                    <div className='box-button'>
                        <button className="btn btn-primary"
                        onClick={saveStory}
                        >Lưu và tiếp tục</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const validateData = (shortDescription) => {
    let msg = {};
    if (shortDescription.length > 500) {
        msg.shortDescription = 'Mô tả ngắn không quá 500 kí tự';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default MyCampaignTabStory;