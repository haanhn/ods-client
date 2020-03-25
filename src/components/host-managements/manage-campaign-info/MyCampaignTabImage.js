import React, { useContext, useState } from 'react';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';
import { validateImageFile } from '../../../utils/imageUtils';

const MyCampaignTabImage = () => {
    const myCampaignsContext = useContext(MyCampaignsContext);
    const viewingCampaign = myCampaignsContext.hostViewingCampaign;

    const currentImageUrl = viewingCampaign ? viewingCampaign.campaignThumbnail : null;
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
                viewingCampaign.campaignRegion,
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
        setNewImageUrl(null);
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
            <label for='createCampaignImage' className='child campaign-image-cover'>
                {newImageUrl ?
                    <img src={newImageUrl} alt='' />
                    : <div className='btn-choose-image' > Chọn ảnh </div>
                }
            </label>
            <Alert alert={alertImage} />
            {newImageUrl ? btnsUpdateImg : null}
            <div>
                <button className='btn btn-sm btn-success' onClick={saveImage}>Cập nhật</button>
            </div>
            {/* {imageGuide} */}
        </div>

    );
}

export default MyCampaignTabImage;