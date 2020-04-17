import React, { useContext, useState } from 'react';
import CampaignProgressBar from './campaign-preview-components/CampaignProgressBar';
import CampaignStatistic from './campaign-preview-components/CampaignStatistic';
import ButtonSubscribeCampaign from './campaign-preview-components/ButtonSubscribeCampaign';
import ButtonDonate from './campaign-preview-components/ButtonDonate';
import CampaignHostInfo from '../../common/CampaignHostInfo';
import CampaignBasicInfo from '../../common/CampaignBasicInfo';
import RatingOverviewBox from './campaign-preview-components/RatingOverviewBox';
import CampaignTabs from './campaign-preview-components/CampaignTabs';
import CampaignPreviewTabMoreInfo from './campaign-preview-components/CampaignPreviewTabMoreInfo';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import '../campaign2.css';
import Alert from '../../common/Alert';

const CampaignPreviewBasicInfo = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { campaignTitle, goal, image,
        description,
        category, campaignRegion
    } = props.campaign;
    const regions = campaignsContext.regions;
    props.campaign.campaignThumbnail = image;
    props.campaign.Category = getCampaignCategory(campaignsContext.categories, category);
    const host = props.host ? props.host : {};
    host.Region = getCampaignRegion(regions, campaignRegion);
    const { loading, createCampaignStep5 } = props;

    //State Alert
    const [alertResult, setAlertResult] = useState(null);

    const createStep5 = async () => {
        setAlertResult(null);

        const result = await createCampaignStep5();
        if (result === false) {
            setAlertResult({ type: 'danger', msg: 'Lưu thất bại, xin hãy thử lại' });
        }
    }

    return (
        <div className="auto-container campaign-detail">
            <h2 style={{ textAlign: 'center', padding: '50px 0 20px', borderBottom: '2px gray solid' }}>
                {campaignTitle ? campaignTitle : 'Chiến dịch của bạn'}
            </h2>
            <div className="row clearfix" style={{ padding: '30px 0 10px' }}>
                {/* style={{ padding: '30px 0 50px' }} */}
                {/* <!--Content Side / Blog Sidebar--> */}
                <div className="content-side col-lg-8 col-md-12 col-sm-12">
                    <div className="cause-details">
                        <div className="inner-box">
                            <CampaignBasicInfo campaign={props.campaign} />
                        </div>
                    </div>

                </div>

                {/* <!--Sidebar Side--> */}
                <div className="sidebar-side col-lg-4 col-md-12 col-sm-12" >
                    <div className='rating-host-container row'>
                        <RatingOverviewBox />
                        <aside className="sidebar col-lg-12 col-md-6 col-sm-6">
                            <CampaignHostInfo host={host} />
                        </aside>
                    </div>
                    <aside className="sidebar col-lg-12 col-md-12 col-sm-12">
                        <CampaignProgressBar goal={goal} />
                        <CampaignStatistic />
                        <ButtonDonate />
                        <ButtonSubscribeCampaign />
                    </aside>
                </div>
            </div>
            {/* End of section: basic info */}
            <div style={{ width: '100%' }}>
                <CampaignTabs />
                <CampaignPreviewTabMoreInfo description={description} />
            </div>
            <div style={{ textAlign: 'right', padding: '20px 0 20px', marginTop: '20px', borderTop: '1px dashed black' }}>
                <p style={{ fontSize: '90%' }}><i>
                    <b>Lưu ý:</b> Phía trên là chỉ là trang mẫu cho chiến dịch của bạn.
                    </i>
                </p>
                {loading ? (
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm"></span>
                                &nbsp; Đang tạo...
                    </button>) : (
                        <button className="btn btn-primary" onClick={createStep5} >Tạo chiến dịch</button>
                    )}
            </div>
            <Alert alert={alertResult} />
        </div>

    );

}

const getCampaignCategory = (categories, categoryId) => {
    if (!categories) {
        return null;
    }
    for (const category of categories) {
        if (categoryId === category.id) {
            return category;
        }
    }
}

const getCampaignRegion = (regions, regionId) => {
    if (!regions) {
        return {};
    }
    for (const region of regions) {
        if (region.id === regionId) {
            return region;
        }
    }
    return {};
}

export default CampaignPreviewBasicInfo;
