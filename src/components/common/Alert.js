import React from 'react';
import '../css/common.css';

const Alert = ({ alert }) => {
    return (alert !== null && (
        <div className={`alert alert-${alert.type}`} >
            <i className='fas fa-info-circle'></i> {alert.msg}
        </div>)
    );
    // return (alert ?
    //     ( <div className={`alert alert-${alert.type}`} >
    //         <i className='fas fa-info-circle'></i> {alert.msg}
    //     </div>)
    //     : null
    // );
    
}

export default Alert;