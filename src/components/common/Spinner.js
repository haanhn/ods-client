import React from 'react';

const Spinner = () => {
    return (
        <div className="text-center" style={{ minHeight: '90vh', paddingTop: '43vh' }}>
            <div className="spinner-border text-success">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;
