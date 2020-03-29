import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import Alert from '../../common/Alert';
import { validateImageFile, uploadSingleImage } from '../../../utils/imageUtils';

const AccountSettingAvatar = () => {
    const authContext = useContext(AuthContext);
    const currentUser = authContext.currentUser;

    const currentImageUrl = currentUser && currentUser.avatar ? currentUser.avatar : null;
    const [init, setInit] = useState(true);
    const [newImageUrl, setNewImageUrl] = useState(currentImageUrl);
    const [imageBinary, setImageBinary] = useState(null);
    //State Alerts
    const [alertImage, setAlertImage] = useState(null);

    const chooseImage = (event) => {
        try {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                setAlertImage(null);
                const messages = validateImageFile(file);
                if (messages) {
                    if (messages.image) {
                        setAlertImage({ type: 'danger', msg: messages.image });
                    }
                } else {
                    setImageBinary(file);
                    console.log(reader.result);
                    setNewImageUrl(reader.result);
                }
            }
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(`Error choose image: ` + error);
        }
    }

    const saveImage = async () => {
        if (currentImageUrl === newImageUrl) {
            console.log('currentAvatarUrl = new url');
            return;
        }
        let result = false;
        let resultUpload = true;
        let url = newImageUrl;
        if (imageBinary) {
            const successUrl = await uploadSingleImage(imageBinary);
            if (successUrl !== false) {
                resultUpload = true;
                url = successUrl;   
            } else {
                resultUpload = false;
            }
        }
        if (resultUpload) {
            result = await authContext.updateAvatar(url);
        }

        if (result) {
            setAlertImage({ type: 'success', msg: 'Cập nhật thành công' });
        } else {
            setAlertImage({ type: 'danger', msg: 'Cập nhật thất bại, xin thử lại' });
        }
    }

    const removeImage = () => {
        setNewImageUrl(null);
        setImageBinary(null);
    }

    const btnsUpdateImg = (
        <div className='child btns-update-img' >
            <div className='btn-update-img' onClick={removeImage}>Xóa ảnh</div>
            <label htmlFor='createCampaignImage' className='btn-update-img'>
                <div>Chọn ảnh</div>
            </label>
        </div>
    );

    if (init && currentUser) {
        if (Object.keys(currentUser).length > 0) {
            setNewImageUrl(currentImageUrl);
            setInit(false);
        }
    }

    return (
        <div className='campaign-image-container'>
            <h5 className='child' style={{ textAlign: 'center', marginBottom: '12px' }}>
                Ảnh đại diện của tôi
            </h5>
            <input id='createUserAvatar' type='file' accept='image/png, image/jpeg'
                style={{ display: 'none' }}
                onChange={chooseImage}
            />
            <label htmlFor='createUserAvatar' className='child account-setting-avatar'>
                {newImageUrl ?
                    <img src={newImageUrl} alt='' />
                    : <div className='btn-choose-image' > Chọn ảnh </div>
                }
            </label>
            <Alert alert={alertImage} />
            {newImageUrl ? btnsUpdateImg : null}
            <div className='box-btn-save-campaign-image'>
                <button className='btn btn-sm btn-success' onClick={saveImage}>Cập nhật</button>
            </div>
        </div>

    );
}

export default AccountSettingAvatar;