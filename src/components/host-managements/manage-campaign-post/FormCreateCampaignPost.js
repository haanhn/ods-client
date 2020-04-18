import React, { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { odsBase, odsAPIOpenRoutes } from '../../../odsApi';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';

const FormCreateCampaignPost = (props) => {
    const { id } = props.match.params;

    const myCampaignsContext = useContext(MyCampaignsContext);
    const { updateDataLoading , createCampaignPost, updateCampaignPosts } = myCampaignsContext;

    let post = null;
    if (id) {
        post = getPostData(id, myCampaignsContext.myCampaignPosts);
    }

    //Init Values
    const initPostId = post ? post.id : null;
    const initPostTitle = post ? post.postTitle : '';
    const initPostContent = post ? post.postContent : '';
    const initPostStatus = post ? post.postStatus : 'enable';

    const inputTitle = React.createRef();
    const inputStatus = React.createRef();
    const [postId, setPostId] = useState(initPostId);
    const [content, setContent] = useState(initPostContent);
    // const [postStatus, setPostStatus] = useState(initPostStatus);

    //State Alerts
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertContent, setAlertContent] = useState(null);
    const [alertResult, setAlertResult] = useState(null);

    const savePost = async (evt) => {
        evt.preventDefault();
        const title = inputTitle.current.value;
        let status = 'enable';
        if (!inputStatus.current.checked) {
            status = 'disable';
        }
        setAlertTitle(null);
        setAlertContent(null);
        setAlertResult(null);
        const messages = validateData(title, content);
        if (messages) {
            if (messages.title) {
                setAlertTitle({ type: 'danger', msg: messages.title });
            }
            if (messages.content) {
                setAlertContent({ type: 'danger', msg: messages.content });
            }
        } else {
            if (!postId) { //create post
                const res = await createCampaignPost(title, content, status);
                if (res !== false) {
                    setPostId(res.data.result.id);
                    setAlertResult({ type: 'success', msg: 'Tạo bài viết thành công.' });
                } else {
                    setAlertResult({ type: 'danger', msg: 'Lưu thất bại, xin thử lại.' });
                }
            } else { //update post
                const res = await updateCampaignPosts(postId, title, content, status);
                if (res !== false) {
                    setAlertResult({ type: 'success', msg: 'Cập nhật bài viết thành công.' });
                } else {
                    setAlertResult({ type: 'danger', msg: 'Lưu thất bại, xin thử lại.' });
                }
            }
        }
    }

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:');
        console.log(editor.getContent());
        setContent(editor.getContent());
    }

    const editor = <Editor
        initialValue={content}
        init={{
            height: 400,
            menubar: false,
            plugins: [
                'advlist autolink lists link image media mediaembed',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount'
            ],
            toolbar:
                'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | image media',
            // | help',
            // plugins: "image media mediaembed",
            // menubar: "insert",
            // toolbar: "image media",
            mediaembed_max_width: 550,
            mediaembed_max_height: 400,
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

    return (
        <div className=' container form-create-campaign-post'>
            <form>
                <div className="row">
                    <label className="col-sm-12 col-form-label">
                        Tiêu đề bài viết
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tiêu đề"
                            defaultValue={initPostTitle}
                            ref={inputTitle}
                        />
                        <Alert alert={alertTitle} />
                    </div>
                </div>
                <div className="form-check">
                    <label className="form-check-label"><input type="checkbox" className="form-check-input" ref={inputStatus}
                        defaultChecked={initPostStatus === 'enable' ? true : false}
                    />
                    Công khai bài viết</label>
                </div>

                {editor}

                {alertContent ? (
                    <div className="row">
                        <div className="col-sm-12">
                            <Alert alert={alertContent} />
                        </div>
                    </div>
                ) : null}
                {alertResult ?
                    (
                        <div>
                            <Alert alert={alertResult} />
                        </div>
                    )
                    : null
                }

                <div style={{ textAlign: 'center' }} >
                    {updateDataLoading  ? (
                        <button class="btn btn-success" type="button" disabled>
                            <span class="spinner-border spinner-border-sm"></span>
                                &nbsp; Đang lưu...
                        </button>
                    ) : (
                        <button className="btn btn-success" style={{ width: '150px' }} onClick={savePost} >
                            Lưu bài viết
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

const validateData = (title, content) => {
    let msg = {};
    if (title.length === 0) {
        msg.title = 'Xin nhập tiêu đề';
    } else if (title.length > 50) {
        msg.title = 'Tiêu đề không quá 50 kí tự';
    }
    if (content.length === 0) {
        msg.content = 'Xin nhập nội dung';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

const getPostData = (postId, posts) => {
    if (!posts || posts.length === 0) {
        return {};
    }
    let post = {};
    for (post of posts) {
        if (postId === post.id) {
            return post;
        }
    }
}
export default FormCreateCampaignPost;