import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../odsApi';

const AccountSettingTabs = () => {
    
    const routeInfo = routes.MY_ACCOUNT;
    const routeAvatar = routes.MY_ACCOUNT_AVATAR;
    const routeBankAccount = routes.MY_ACCOUNT_BANK_ACCOUNT;

    return (
        <ul className="list-group list-group-flush">
            <li class="list-group-item active">
                {/* <li className={`list-group-item`}> */}
                <Link to={routeInfo} id='linkTabInfoImg'
                // onClick={setActive}
                >
                    Thông tin chung
                                </Link>
            </li>
            <li class="list-group-item">
                {/* <li className={`list-group-item`}> */}
                <Link to={routeAvatar} id='linkTabInfoImg'
                // onClick={setActive}
                >
                    Ảnh đại diện
                                </Link>
            </li>
            <li className={`list-group-item `}>
                <Link to={routeBankAccount} id='linkTabInfoDetails'
                // onClick={setActive}
                >
                    TK ngân hàng
                                    </Link>
            </li>
            <li className={`list-group-item `}>
                {/* <Link to={routeInfoStory} id='linkTabInfoStory' onClick={setActive}> */}
                                        Câu chuyện
                                    {/* </Link> */}
            </li>
        </ul>

    );
}

export default AccountSettingTabs;