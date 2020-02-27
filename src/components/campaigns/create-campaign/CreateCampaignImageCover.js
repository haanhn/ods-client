import React, { useState } from 'react';

const CreateCampaignImageCover = (props) => {
    const { image, setImage, setCurrentStep } = props;
    const labelButtonStep = image ? 'Lưu và tiếp tục' : 'Bỏ qua';

    const chooseImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            console.log(reader.result);
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const removeImage = () => {
        setImage(null);
    }

    const nextStep = () => {
        setCurrentStep(3);
    }

    return (
        <div>
            <p>Chọn ảnh bìa có nội dung ABC XYZ Chọn ảnh bìa có nội dung ABC XYZChọn ảnh bìa có nội dung ABC XYZ sẽ giúp cho mn dễ hình dung chiến dịch</p>
            <input type='file' accept='image/png, image/jpeg' onChange={chooseImage} />
            {image ? <img src={image} /> : null}
            <div>

                <button onClick={removeImage}>Xóa ảnh</button>
                <button onClick={nextStep}>{labelButtonStep}</button>
            </div>
        </div>
    );
}

export default CreateCampaignImageCover;