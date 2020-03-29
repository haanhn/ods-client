import React from 'react'
import FormCreateRatingHost from './FormCreateRatingHost';
import ListRatingsOfProfile from './ListRatingsOfProfile';

const ProfileTabRatings = (props) => {
    const { userId, allowedRating } = props;

    return (
        <div>
            { allowedRating ? (
                <FormCreateRatingHost userId={userId} />
            ) : null }
            <ListRatingsOfProfile />
        </div>
    )
}

export default ProfileTabRatings;