import { useEffect, useState } from 'react'

export default function TeamReviews({reviews}){
    const [review, setReview] = useState([[]])

    useEffect(() => {
        reviews.map(review => {
            setReview(review)
        })
    })
    
    return (
        <div className="teamReviewsCont">
            <h1 className="label"><u>Reviews</u></h1>
            <br/>
            {reviews.map(review => (
                <div className="reviews" key={review.id}>
                    <h2 className="title"><u>{review.title}</u></h2>
                    <p className="description">{review.description}</p>
                    <h3 className="likes">{review.likes} Likes</h3>
                    <button  className="like-btn">👍</button>
                    <button className="dislike-btn">👎</button>
                 </div>
            ))}
        </div>
    )
}