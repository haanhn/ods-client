import React, { useContext } from 'react';
import CurrencyFormat from 'react-currency-format';
import UserProfileContext from '../../../context/user-profile/UserProfileContext';
import RatingStatisticsContainer from '../../common/rating-statistics/RatingStatisticsContainer';

const UserProfileStats = () => {
    const userProfileContext = useContext(UserProfileContext);
    const profileStats = userProfileContext.profileStats;
    const raised = profileStats && profileStats.countRaised ? profileStats.countRaised : 0;
    const donating = profileStats && profileStats.countDonating ? profileStats.countDonating : 0;

    const ratingPoint = 4;
    const ratingStats = {
        "totalReviews": 1,
        "count1": 0,
        "count2": 0,
        "count3": 0,
        "count4": 1,
        "count5": 0
    };
    return (
        <div className='profile-stats'>
            {/* <div>

                <div className='stats-name'>Quyên được</div>
                <div className='stats-number'>4,500,094đ</div>
            </div>
            <div>

                <div className='stats-name'>Quyên được</div>
                <div className='stats-number'>4,500,094đ</div>
            </div> */}
            <table className='table table-borderless' >
                {/* <col style={{ width: '30%', }} /> */}
                {/* <col style={{ width: '30%', }} /> */}
                <tbody>
                    <tr>
                        <td>
                            <div className='stats-name'>Quyên được</div>
                            <div className='stats-number'>
                                <CurrencyFormat value={raised} displayType={'text'} thousandSeparator={true} />
                                đ
                            </div>
                        </td>
                        <td>
                            <div className='stats-name'>Đóng góp</div>
                            <div className='stats-number'>
                                <CurrencyFormat value={donating} displayType={'text'} thousandSeparator={true} />
                                đ
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <RatingStatisticsContainer point={ratingPoint} ratingStats={ratingStats} />
        </div>
    );
}

export default UserProfileStats;