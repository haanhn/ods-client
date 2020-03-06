import React from 'react';

const CreateCampaignImageBox = (props) => {
    const { image, setImage, setImageBinary } = props;

    // const labelButtonImage = image ? 'Lưu và tiếp tục' : 'Bỏ qua';

    const chooseImage = (event) => {
        try {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                console.log('Image file ');
                console.log(file);
                setImageBinary(file);
                console.log(reader.result);
                setImage(reader.result);
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
            {image ? btnsUpdateImg : null}
            {imageGuide}
        </div>
    );
}

const imageGuide = <p className='child image-guide'>
    Chọn ảnh bìa đại diện cho chiến dịch của bạn, nội dung ảnh nên khái quát lý do bạn gây quỹ.
    Những bức ảnh có người hoặc con vật làm tăng sự kết nối, đồng cảm giữa người xem với bạn, từ đó giúp bạn gây quỹ được nhiều và nhanh hơn.
</p>;

export default CreateCampaignImageBox;