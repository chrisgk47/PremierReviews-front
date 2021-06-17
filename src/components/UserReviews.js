import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function UserReviews({teams, user}){
    const history = useHistory()
    const [reviews, setReviews] = useState([])
    // const [updatedReviews, setUpdatedReviews] = useState([])

    useEffect(() => {
        setReviews(user.reviews)
    }, [])


    const releaseReview = (review) => {
        setReviews(reviews.filter((r) => r !== review))
    }
    
    function handleDelete(review){
        // const updatedReviews = reviews.filter((item) => item !== review )
        console.log(review)
        releaseReview(review)
        fetch(`http://localhost:3001/reviews/${review.id}`, {
                method: "DELETE",
                headers: {
                    'Accepts': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                reviews.filter(r => r !== review)
            })
    }

    return (
        <div className="userReview" >
            {reviews.map(review => (
                 <div className="reviewCard" key={review.id}>
                    <button className="deleteUserReview" key={review.id} onClick={() => handleDelete(review)}>X</button>
                        <h2 className="title"><u>{review.title}</u></h2>
                        <p className="description">{review.description}</p>
                        <h3 className="likes">{review.likes} Likes</h3>
                 </div>
            ))}
        </div>
    )
}