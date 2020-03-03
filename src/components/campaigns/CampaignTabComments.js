import React from 'react';
import CampaignComments from './CampaignComments';
import FormCreateComment from './campaign-detail/campaign-comments/FormCreateComment';
import { localStoreKeys } from '../../odsApi';

const CampaignTabComments = () => {
    const token = localStorage.getItem(localStoreKeys.token);

    return (
        <div className='campaign-tab-comments'>
            { token ?
                <FormCreateComment />
                : null
            }
            <CampaignComments />
        </div>
    );
}

export default CampaignTabComments;
