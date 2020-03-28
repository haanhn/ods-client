import React from 'react';

const DonationOfProfile = () => {

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
                        <i class="fas fa-hand-holding-usd" style={{ marginRight: '5px', fontSize: '112%' }}></i>
                        120,000 / 300,000đ
                    </div>
                    <div style={{ color: '#555', fontStyle: 'italic' }}>
                        12/03/2020
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DonationOfProfile;