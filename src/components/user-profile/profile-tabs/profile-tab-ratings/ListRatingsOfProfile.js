import React, { useContext } from 'react';
import RatingOfProfile from './RatingOfProfile';
import UserProfileContext from '../../../../context/user-profile/UserProfileContext';

const ListRatingsOfProfile = () => {
    const userProfileContext = useContext(UserProfileContext);
    const ratings = userProfileContext.profileRatings;

    let ratingsJsx = [];
    if (ratings && ratings.length > 0) {
        ratingsJsx = ratings.map((rating) => (
            <RatingOfProfile rating={rating} />
        ));
    } else {
        ratingsJsx = <div>Chưa có đánh giá nào.</div>;
    }

    return (
        <div>
            {/* <RatingOfProfile />
            <RatingOfProfile />
            <RatingOfProfile />
            <RatingOfProfile />
            <RatingOfProfile /> */}
            {ratingsJsx}
        </div>
    );
}

export default ListRatingsOfProfile;