import React from 'react';
import '../../campaign2.css';
import { tipsForPreviewDescription } from '../create-campaign-modal-suggest/tipsModal';

const CampaignTabMoreInfo = (props) => {
    const { description } = props;
    let contentHtml = { __html: '' };

    if (description && description.trim().length > 0) {
        contentHtml = { __html: description };
    } else {
        contentHtml = { __html: tipsForPreviewDescription };
    }

    return (
        <div className='campaign-tab-more-info'>
            <div dangerouslySetInnerHTML={contentHtml} />
        </div>
    );
}

export default CampaignTabMoreInfo;