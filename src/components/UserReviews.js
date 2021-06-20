import { useEffect, useState } from 'react'
import './User.css'
export default function UserReviews({teams, user}){
    const [userReviews, setUserReviews] = useState([])
    // const [formData, setFormData] = useState({title: "", description: "", likes: review.id, author: user.email})

    useEffect(() => {
        setUserReviews(user.reviews)
    }, [])

    const releaseReview = (userReview) => {
        setUserReviews(userReviews.filter((r) => r !== userReview))
    }
    
    function handleDelete(userReview){
        releaseReview(userReview)
        fetch(`http://localhost:3001/reviews/${userReview.id}`, {
                method: "DELETE",
                headers: {
                    'Accepts': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                userReviews.filter(r => r !== userReview)
            })
    }

    return (
        <div className="userReview" >
            {userReviews.map(userReview => (
                 <div className="reviewCard" key={userReview.id}>
                    <button className="deleteUserReview" key={userReview.id} onClick={() => handleDelete(userReview)}>X</button>
                        <h2 className="title"><u>{userReview.title}</u></h2>
                        <p className="description">{userReview.description}</p>
                        <h3 className="likes">{userReview.likes} Likes</h3>
                        <h3 className="author">By: {userReview.author}</h3>
                 </div>
            ))}
        </div>
    )
}