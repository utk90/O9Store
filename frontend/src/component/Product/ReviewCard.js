import React from 'react'
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
    const options = {
        size: 'large',
        value: review.rating,
        readOnly: true,
        precision: 0.5
    }

    return (
        <div className='reviewCard'>
            <img src={'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'} alt='User' />
            <p>{review.name}</p>
            <Rating {...options} />
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard