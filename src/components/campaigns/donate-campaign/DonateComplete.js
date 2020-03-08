import React from 'react';
import { routes } from '../../../odsApi';

const DonateComplete = (props) => {
    const { completedDonation, history } = props;
    const { slug } = props.match.params;

    if (!completedDonation) {
        const route = routes.getRouteDonateCampaign(slug);
        history.replace(route);
    }

    return (
        <div>
            Quyên góp thành công
        </div>
    );
}

export default DonateComplete;