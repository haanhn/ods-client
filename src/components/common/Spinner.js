import React from 'react';

const Spinner = () => {
    return (
        <div className="text-center" style={{ minHeight: '90vh', paddingTop: '43vh' }}>
            <div className="spinner-border text-success" style={{width: '3rem', height: '3rem'}} >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;
