import React, { useContext } from 'react';
import CurrencyFormat from 'react-currency-format';
import UserProfileContext from '../../../context/user-profile/UserProfileContext';
import RatingStatisticsContainer from '../../common/rating-statistics/RatingStatisticsContainer';

const UserProfileStats = () => {
    const userProfileContext = useContext(UserProfileContext);

    //Profile Stats
    const profileStats = userProfileContext.profileStats;
    const raised = profileStats && profileStats.countRaised ? profileStats.countRaised : 0;
    const donating = profileStats && profileStats.countDonating ? profileStats.countDonating : 0;
    
    //Profile Rating Stats
    const ratingStats = userProfileContext.profileRatingStats;
    const ratingPoint = ratingStats && ratingStats.hostRatingPoint ? ratingStats.hostRatingPoint : 0;

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