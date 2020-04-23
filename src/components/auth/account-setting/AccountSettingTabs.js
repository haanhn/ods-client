import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../odsApi';

const AccountSettingTabs = () => {

    const routeInfo = routes.MY_ACCOUNT;
    const routeAvatar = routes.MY_ACCOUNT_AVATAR;
    const routeBankAccount = routes.MY_ACCOUNT_BANK_ACCOUNT;

    //State for set tab active css
    const [activeInfo, setActiveInfo] = useState(false);
    const [activeAvatar, setActiveAvatar] = useState(false);
    const [activeBankAccount, setActiveBankAccount] = useState(false);

    const setActive = (event) => {
        const target = event.target;
        if (!target) {
            return;
        }
        const id = target.id;
        setActiveInfo(false);
        setActiveAvatar(false);
        setActiveBankAccount(false);
        switch (id) {
            case 'linkTabAccountInfo':
                setActiveInfo(true);
                break;
            case 'linkTabAccountAvatar':
                setActiveAvatar(true);
                break;
            case 'linkTabAccountBank':
                setActiveBankAccount(true);
                break;
        }
    }

    return (
        <ul className="list-group list-group-flush">
            <li class={`list-group-item ${activeInfo ? 'active' : null}`}>
                <Link to={routeInfo} id='linkTabAccountInfo' onClick={setActive} >
                    Thông tin chung
                </Link>
            </li>
            <li class={`list-group-item ${activeAvatar ? 'active' : null}`}>
                <Link to={routeAvatar} id='linkTabAccountAvatar' onClick={setActive} >
                    Ảnh đại diện
                </Link>
            </li>
            <li className={`list-group-item ${activeBankAccount ? 'active' : null}`}>
                <Link to={routeBankAccount} id='linkTabAccountBank' onClick={setActive} >
                    TK ngân hàng
                </Link>
            </li>
        </ul>

    );
}

export default AccountSettingTabs;