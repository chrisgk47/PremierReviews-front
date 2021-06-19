import { useEffect, useState } from 'react'
import './TeamCard.css'
export default function TeamReviews({review}){
   const [updatedReview, setUpdatedReview] = useState([])

    function addLikes(event){
        fetch(`http://localhost:3001/reviews/${event.target.id}`, {
            method: 'PATCH',
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({likes: review.likes + 1})
        })
        .then(res => res.json())
        .then(console.log)
    }
    return (
        <div className="teamReviewsCont">
            <br/>
            <div className="reviewCont">
                <div className="reviews" key={review.id}>
                ------------------------------------------------------------------------------------------------
                    <h2 className="title"><u>{review.title}</u></h2>
                    <p className="description">{review.description}</p>
                    <div className="likesCont">
                        <h3 className="likes">{review.likes} Likes</h3>
                        <button key={review.id}onClick={addLikes} 
                        className="like-btn">👍</button>
                        <button className="dislike-btn">👎</button>
                        <h3 className="author">By: {review.author}</h3>
                    </div>
                    ------------------------------------------------------------------------------------------------
                 </div>
            </div>
        </div>
    )
}