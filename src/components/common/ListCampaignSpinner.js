import React from 'react';

const ListCampaignSpinner = () => {
    return (
        <div className="text-center" style={{ minHeight: '70vh', paddingTop: '23vh' }}>
            <div className="spinner-border text-success" style={{width: '3rem', height: '3rem'}} >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default ListCampaignSpinner;