import { useEffect, useState } from 'react'
import './User.css'
export default function UserReviews({teams, user}){
    const [reviews, setReviews] = useState([])
    // const [formData, setFormData] = useState({title: "", description: "", likes: review.id, author: user.email})

    useEffect(() => {
        setReviews(user.reviews)
    }, [])


    const releaseReview = (review) => {
        setReviews(reviews.filter((r) => r !== review))
    }
    
    function handleDelete(review){
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


    function editReview(review){
        fetch(`http://localhost:3001/reviews/${review.id}`, {
            method: 'PATCH',
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
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
                        <h3 className="author">By: {review.author}</h3>
                 </div>
            ))}
        </div>
    )
}