import React from 'react'

const CampaignOfProfile = () => {
    const styleImage = {
        background: `url(${'/images/default-data-images/default-campaign-cover.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    // const img = '/images/default-data-images/default-campaign-cover.jpg';
    // const img = 'https://wallpapershome.com/images/pages/pic_h/21486.jpg';
    const img = 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';
    return (
        <div className='campaign-of-profile'>
            <div style={{
                // backgroundImage: `url('https://wallpapershome.com/images/pages/pic_h/21486.jpg')`,
                // backgroundImage: `url('${`https://wallpapershome.com/images/pages/pic_h/21486.jpg`}')`,
                backgroundImage: `url('${img}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '120px'
            }}>
                {/* <img src={`/images/default-data-images/default-campaign-cover.jpg`}
                    alt="" /> */}
            </div>
            <div>
                <h5>Tên chiến dịch ABC ABC</h5>
                <div className='description-box'>
                    <div>
                        120,000 / 300,000đ
                    </div>
                    <div style={{ color: '#555' }}>
                        <i class="fas fa-tag" style={{ marginRight: '5px', fontSize: '80%' }}></i>
                        Category
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignOfProfile;