import React, { useState } from 'react';
import CreateCampaignImageBox from './CreateCampaignImageBox';
import '../../css/icon.css';
import { odsBase, odsAPIOpenRoutes } from '../../../odsApi';
import { Editor } from '@tinymce/tinymce-react';
import Alert from '../../common/Alert';
// import { mceApiKey } from '../../../privateApiKeys';

const CreateCampaignStep2 = (props) => {

    const { campaign, loading, createCampaignStep2 } = props;
    const [image, setImage] = useState(campaign.image);
    const [imageBinary, setImageBinary] = useState(null);
    const [description, setDescription] = useState(campaign.description);
    const [showTipsForStory, setShowTipsForStory] = useState(false);

    const [alertResult, setAlertResult] = useState(null);

    const showTipsStory = () => setShowTipsForStory(!showTipsForStory);

    const onClick = async () => {
        setAlertResult(null);
        const result = await createCampaignStep2(image, imageBinary, description);
        if (result === false) {
            setAlertResult({ type: 'danger', msg: 'Lưu thất bại, xin hãy thử lại' });
        }
    }

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:');
        console.log(editor.getContent());
        setDescription(editor.getContent());
    }

    const editor = <Editor
        initialValue={description ? description : ''}
        init={{
            height: 300,
            menubar: false,
            plugins: [
                'advlist autolink lists link image media mediaembed',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount'
            ],
            toolbar:
                'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | image media',
            // | help',
            // plugins: "image media mediaembed",
            // menubar: "insert",
            // toolbar: "image media",
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
    // const editor = <Editor
    //     initialValue={description}
    //     init={{
    //         height: 300,
    //         menubar: false,
    //         plugins: [
    //             'advlist autolink lists link image media mediaembed',
    //             'charmap print preview anchor help',
    //             'searchreplace visualblocks code',
    //             'insertdatetime media table paste wordcount'
    //         ],
    //         toolbar:
    //             'undo redo | formatselect | bold italic | \
    //             alignleft aligncenter alignright | \
    //             bullist numlist outdent indent | image media',
    //         // | help',
    //         mediaembed_max_width: 450,
    //         image_list: listImages,
    //         file_picker_types: 'image'
    //     }}
    //     onChange={handleEditorChange}
    // />;
    return (
        <div className='create-campaign-more-info'>
            <CreateCampaignImageBox image={image} setImage={setImage} setImageBinary={setImageBinary} />
            <div>
                <div>
                    <h5>Câu chuyện của bạn <i class="fas fa-info-circle icon-small theme_color"
                        style={{ padding: '0 7px' }}
                        onClick={showTipsStory} ></i> </h5>
                    <p>Chia sẻ với mọi người lý do bạn quyết định gây quỹ</p>
                    {showTipsForStory ? tipsForStory : null}
                </div>
                {editor}
                <Alert alert={alertResult} />
            </div>
            <div className="row justify-content-end">
                <div className='box-button'>
                    {loading ? (
                        <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm"></span>
                                &nbsp; Đang lưu...
                        </button>) : (
                            <button className="btn btn-primary" onClick={onClick}>Lưu và tiếp tục</button>
                        )}
                </div>
            </div>
        </div>
    );
}

const tipsForStory = (
    <div style={{ fontSize: '90%', marginBottom: '15px' }} >
        Một câu chuyện có chiều sâu sẽ dễ đi vào lòng người, bạn nên:
        <div>
            <b>1. Giới thiệu bản thân:</b> Giới thiệu đôi nét về bản thân, tạo niềm tin giữa người xem với bạn.
        </div>
        <div>
            <b>2. Mục đích, lý do:</b> Giải thích tại sao bạn cần gây quỹ, mục tiêu của bạn là gì, và những đối tượng có liên quan.
        </div>
        <div>
            <b>3. Số tiền được dùng cho việc gì:</b> Bạn cần mô tả chi tiết số tiền sẽ được dùng làm gì, như thế nào với người xem.
        </div>
        <div>
            <b>4. Kêu gọi sự giúp đỡ:</b> Đừng ngại ngần chia sẻ về chiến dịch của bạn cho những người quen.
        </div>
        <div>
            <b>5. Chi tiết:</b> Mô tả chi tiết về câu chuyện của bạn để người xem hiểu rõ bạn hơn.
        </div>
    </div>
);

export default CreateCampaignStep2;