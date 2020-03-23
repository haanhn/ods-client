import React, { useState } from 'react';
import Alert from '../../common/Alert';

const CreateCampaignImageBox = (props) => {
    const { image, setImage, setImageBinary } = props;

    //State Alerts
    const [alertImage, setAlertImage] = useState(null);

    const chooseImage = (event) => {
        try {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                console.log('Image file ');
                console.log(file);
                setAlertImage(null);
                const messages = validateImageFile(file);
                if (messages) {
                    if (messages.image) {
                        setAlertImage({ type: 'danger', msg: messages.image });
                    }
                } else {
                    setImageBinary(file);
                    console.log(reader.result);
                    setImage(reader.result);
                }
            }
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(`Error choose image: ` + error);
        }
    }

    const removeImage = () => {
        setImage(null);
        setImageBinary(null);
    }

    const btnsUpdateImg = (
        <div className='child btns-update-img' >
            <button className='btn btn-secondary' onClick={removeImage}>Xóa ảnh</button>
            <label for='createCampaignImage' className='btn btn-primary'>
                <div>Chọn ảnh</div>
            </label>
        </div>
    );

    return (
        <div className='campaign-image-container'>
            <input id='createCampaignImage' type='file' accept='image/png, image/jpeg'
                style={{ display: 'none' }}
                onChange={chooseImage}
            />
            <label for='createCampaignImage' className='child campaign-image-cover'>
                {image ?
                    <img src={image} alt='' />
                    : <div className='btn-choose-image' > Chọn ảnh </div>
                }
            </label>
            <Alert alert={alertImage} />
            {image ? btnsUpdateImg : null}
            {imageGuide}
        </div>
    );
}

const imageGuide = <p className='child image-guide'>
    Chọn ảnh bìa đại diện cho chiến dịch của bạn, nội dung ảnh nên khái quát lý do bạn gây quỹ.
    Những bức ảnh có người hoặc con vật làm tăng sự kết nối, đồng cảm giữa người xem với bạn, từ đó giúp bạn gây quỹ được nhiều và nhanh hơn.
</p>;

const validateImageFile = (file) => {
    if (!file) {
        return null;
    }
    let msg = {};
    const acceptedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 3.1 * 1048576; //3 MB
    
    //Validate image
    if (acceptedTypes.indexOf(file.type) < 0) {
        msg.image = 'Chỉ nhận file ảnh .png hoặc .jpeg';
    } else if (file.size > maxSize) {
        msg.image = 'Ảnh không quá 3 MB';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}

export default CreateCampaignImageBox;