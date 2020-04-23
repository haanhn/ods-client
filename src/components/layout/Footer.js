import React, { useState, useEffect } from 'react';

function Footer() {
    const styles = {
        backgroundColor: "black", 
        color: "white", 
        textAlign: "center", 
        margin: "0 auto", 
        padding: "15px 0",
        fontSize: '95%'
    };
    return (
        <div style={styles}>
            Hệ thống quyên góp từ thiện: ODS
            <p>Được làm bởi ODS Team</p>
        </div>
    );
}

export default Footer;
