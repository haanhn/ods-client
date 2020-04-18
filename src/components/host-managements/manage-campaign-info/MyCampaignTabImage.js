import React, { useContext, useState } from 'react';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';
import { validateImageFile } from '../../../utils/imageUtils';

const MyCampaignTabImage = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const viewingCampaign = myCampaignsContext.hostViewingCampaign;
    const loading = myCampaignsContext.updateDataLoading;

    const currentImageUrl = viewingCampaign ? viewingCampaign.campaignThumbnail : null;
    const status = viewingCampaign && viewingCampaign.campaignStatus ? viewingCampaign.campaignStatus : '';

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
            setAlertImage({ type: 'danger', msg: 'Có lỗi xảy ra khi đọc file, xin hãy thử lại' });
            console.error(`Error choose image: ` + error);
        }
    }

    const saveImage = async () => {
        if (currentImageUrl === newImageUrl) {
            console.log('currentImageUrl = new url');
            return;
        }
        let result = false;
        if (imageBinary) {
            result = await myCampaignsContext.updateCampaignImage(imageBinary);
        } else {
            //Delete image -> update thumbnail = null
            result = await myCampaignsContext.updateCampaign(
                viewingCampaign.id,
                viewingCampaign.campaignTitle,
                viewingCampaign.categoryId,
                viewingCampaign.campaignShortDescription,
                viewingCampaign.campaignDescription,
                null,
                viewingCampaign.campaignAddress,
                viewingCampaign.regionId,
                viewingCampaign.campaignEndDate,
                viewingCampaign.campaignGoal,
                viewingCampaign.autoClose
            );
        }
        if (result) {
            setAlertImage({ type: 'success', msg: 'Cập nhật thành công' });
        } else {
            setAlertImage({ type: 'danger', msg: 'Cập nhật thất bại, xin thử lại' });
        }
    }

    const removeImage = () => {
        setAlertImage(null);
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

    if (init && viewingCampaign) {
        if (Object.keys(viewingCampaign).length > 0) {
            setNewImageUrl(currentImageUrl);
            setInit(false);
        }
    }

    return (
        <div className='campaign-image-container'>
            <input id='createCampaignImage' type='file' accept='image/png, image/jpeg'
                style={{ display: 'none' }}
                onChange={chooseImage}
            />
            <label htmlFor='createCampaignImage' className='child campaign-image-cover'>
                {newImageUrl ?
                    <img src={newImageUrl} className='lazy-image' alt='' />
                    : <div className='btn-choose-image' > Chọn ảnh </div>
                }
            </label>
            <div className='child' >
                <Alert alert={alertImage} />
            </div>
            {newImageUrl && status !== 'close' ? btnsUpdateImg : null}
            {status !== 'close' ? (
                <div className='box-btn-save-campaign-image'>
                    {loading ? (
                        <button class="btn btn-success" type="button" disabled>
                            <span class="spinner-border spinner-border-sm"></span>
                                &nbsp; Đang lưu...
                        </button>) : (
                            <button className='btn btn-sm btn-success' onClick={saveImage}>Cập nhật</button>
                        )}
                </div>
            ) : null}
        </div>

    );
}

export default MyCampaignTabImage;