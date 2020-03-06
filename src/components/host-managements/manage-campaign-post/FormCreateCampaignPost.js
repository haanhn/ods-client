import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { odsBase } from '../../../odsApi';
import axios from 'axios';
// import {  } from '@tinymce/tinymce-react';

const FormCreateCampaignPost = (props) => {
    const { post } = props;

    const inputTitle = React.createRef();

    //State Alerts
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertContent, setAlertContent] = useState(null);


    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:');
        console.log(editor.getContent());
    }

    const savePost = (evt) => {
        evt.preventDefault();
        const title = inputTitle.current.value;
        // const content 
    }

    const listImages = [
        { title: 'My image 1', value: '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' },
        { title: 'My image 2', value: 'https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg' }
        // { title: 'My image 2', value: 'http://localhost:5000/api/image/1.png' }
    ];

    const editor = <Editor
        initialValue={''}
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
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | image media',
            // | help',
            // plugins: "image media mediaembed",
            // menubar: "insert",
            // toolbar: "image media",
            mediaembed_max_width: 450,
            image_list:
                listImages
            ,
            file_picker_types: 'image',
            // file_picker_callback: function(callback, value, meta) {
            //     // Provide file and text for the link dialog
            //     if (meta.filetype == 'file') {
            //       callback('mypage.html', {text: 'My text'});
            //     }

            //     // Provide image and alt text for the image dialog
            //     if (meta.filetype == 'image') {
            //       callback('myimage.jpg', {alt: 'My alt text'});
            //     }

            //     // Provide alternative source and posted for the media dialog
            //     if (meta.filetype == 'media') {
            //       callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
            //     }
            // },
            // images_upload_url: 'http://localhost:5000/api/uploads'
            images_upload_handler: async function (blobInfo, success, failure) {
                console.log('blobInfo');
                console.log(blobInfo.blob());
                console.log(typeof blobInfo.blob());
                console.log(blobInfo.filename());
                // let formData = new FormData();
                // formData.append('image', blobInfo.blob());
                // const res = await axios.post(`${odsBase}/api/uploads`, formData, {
                //     headers: {
                //       'Content-Type': 'multipart/form-data'
                //     }
                // })
                // success(res.data.url);
                var xhr, formData;

                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', `${odsBase}/api/uploads`);

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
                        Tiêu đề
                        {/* <i class="fas fa-info-circle icon-small theme_color"
                            data-toggle="modal" data-target="#modalTipsName"
                            style={{ padding: '0 7px' }} ></i> */}
                    </label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Tiêu đề"
                            defaultValue={post ? post.postTitle : ''}
                            ref={inputTitle}
                        />
                        {/* <Alert alert={alertTitle} /> */}
                    </div>
                </div>

                {editor}



                <div style={{ textAlign: 'right' }} >
                    <button className="btn btn-primary"
                        onClick={savePost}
                    >Lưu</button>
                </div>
            </form>
        </div>
    );
}

const validateDate = (title, content) => {
    let msg = {};
    if (title.length === 0) {
        msg.title = 'Xin nhập tiêu đề';
    }
    if (content.length === 0) {
        msg.content = 'Xin nhập nội dung';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}
export default FormCreateCampaignPost;