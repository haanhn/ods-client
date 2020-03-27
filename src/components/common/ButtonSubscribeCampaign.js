import React, { useContext, useState } from 'react';
import CampaignsContext from '../../context/campaigns/campaignsContext';
import './campaign.css';
import { localStoreKeys } from '../../odsApi';
import CommonModal from './CommonModal';

const ButtonSubscribeCampaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { following, setFollowing } = props;

    const userId = localStorage.getItem(localStoreKeys.userId);
    const [showingModal, setShowingModal] = useState(false);
    
    const message = 'Bạn cần đăng nhập để theo dõi chiến dịch';

    const onClickFollow = async () => {
        if (userId) {
            const result = campaignsContext.followCampaign(userId);
            console.log('result follow ' + result)
            if (result === true) {
                setFollowing(true);
            }
        } else {
            setShowingModal(true);
        }
    }
    return (
        <div className='campaign-subscrible'>
            {following ? (
                <button className="btn btn-style-one-outline" style={{ color: '#066326' }}>
                    <i class="fas fa-check" style={{ marginRight: '2px' }}></i> Đang theo dõi
                </button>
            ) : (
                    <button className="btn btn-style-one-outline" onClick={onClickFollow}>
                        Theo dõi chiến dịch
                    </button>
                )}
            <CommonModal showingModal={showingModal} setShowingModal={setShowingModal} message={message} />
        </div>
    )
}

export default ButtonSubscribeCampaign;
