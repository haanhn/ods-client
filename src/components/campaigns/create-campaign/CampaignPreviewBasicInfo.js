import React, { useContext } from 'react';
import CampaignProgressBar from '../../common/CampaignProgressBar';
import CampaignStatistic from '../../common/CampaignStatistic';
import ButtonSubscribeCampaign from '../../common/ButtonSubscribeCampaign';
import ButtonDonate from '../../common/ButtonDonate';
import CampaignHostInfo from '../../common/CampaignHostInfo';
import CampaignBasicInfo from '../../common/CampaignBasicInfo';
import RatingOverviewBox from '../../common/RatingOverviewBox';
import CampaignTabs from '../../campaigns/CampaignTabs';
import CampaignPreviewTabMoreInfo from './CampaignPreviewTabMoreInfo';
import CampaignsContext from '../../../context/campaigns/campaignsContext';
import '../campaign2.css';

const Campaign = (props) => {
    const campaignsContext = useContext(CampaignsContext);
    const { id,
        campaignTitle, campaignGoal,
        campaignEndDate, campaignRatingPoint,
        image,
        campaignShortDescription, campaignDescription,
        category
    } = props.campaign;
    props.campaign.campaignThumbnail = image;
    props.campaign.Category = getCampaignCategory(campaignsContext.categories, category);
    const host = props.host;
    const { createCampaignStep5 } = props;

    const createStep5 = () => {
        createCampaignStep5();
    }

    return (
        // <div className="sidebar-page-container">
        // <div>
        <div className="auto-container campaign-detail">
            <h2 style={{ textAlign: 'center', padding: '50px 0 20px', borderBottom: '2px gray solid' }}>
                {campaignTitle ? campaignTitle : 'Chiến dịch của bạn'}
            </h2>
            <div className="row clearfix" style={{ padding: '30px 0 10px' }}>
                {/* style={{ padding: '30px 0 50px' }} */}
                {/* <!--Content Side / Blog Sidebar--> */}
                <div className="content-side col-lg-8 col-md-12 col-sm-12">
                    {/* <!--Cause Details--> */}
                    <div className="cause-details">
                        <div className="inner-box">
                            <CampaignBasicInfo campaign={props.campaign} />
                        </div>
                    </div>

                </div>

                {/* <!--Sidebar Side--> */}
                <div className="sidebar-side col-lg-4 col-md-12 col-sm-12" >
                    <div className='rating-host-container row'>
                        <aside className="sidebar col-lg-12 col-md-6 col-sm-6">
                            <RatingOverviewBox />
                        </aside>
                        <aside className="sidebar col-lg-12 col-md-6 col-sm-6">
                            <CampaignHostInfo host={host} />
                        </aside>
                    </div>
                    <aside className="sidebar col-lg-12 col-md-12 col-sm-12">
                        <CampaignProgressBar />
                        <CampaignStatistic />
                        <ButtonDonate />
                        <ButtonSubscribeCampaign />
                    </aside>
                </div>
            </div>
            {/* End of section: basic info */}
            <div style={{ width: '100%' }}>
                <CampaignTabs />
                <CampaignPreviewTabMoreInfo description={campaignDescription} />
            </div>
            <div style={{ textAlign: 'right', padding: '20px 0 20px', marginTop: '20px', borderTop: '1px dashed black' }}>
                <p style={{ fontSize: '90%' }}><i>
                    Lưu ý: Phía trên là chỉ là trang mẫu cho chiến dịch của bạn.
                    </i>
                </p>
                <button className="btn btn-primary" onClick={createStep5} >Tạo chiến dịch</button>
            </div>
        </div>

        // </div>
        // </div>
        // {/* <!-- End Sidebar Page Container --> */}

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

export default Campaign;
