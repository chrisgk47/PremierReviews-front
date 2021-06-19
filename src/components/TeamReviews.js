import { useEffect, useState } from 'react'
import './TeamCard.css'
export default function TeamReviews(props){
    const [updatedReview, setUpdatedReview] = useState([])   
    // const [reviews, setReviews] = useState([])
   

    function addLikes(){
        fetch(`http://localhost:3001/reviews/${props.review.id}`, {
            method: 'PATCH',
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({likes: props.review.likes + 1})
        })
        .then(res => res.json())
        .then(json => props.setReviews(props.reviews.map((r) => (r.id === props.review.id ? json : r))))
    }

    function disLike(){
        fetch(`http://localhost:3001/reviews/${props.review.id}`, {
            method: 'PATCH',
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({likes: props.review.likes - 1})
        })
        .then(res => res.json())
        .then(json => props.setReviews(props.reviews.map((r) => (r.id === props.review.id ? json : r))))
    }

    function filterReviews(){
        fetch('http://localhost:3001/reviews')
        .then(res => res.json())
        .then(console.log)
    }
    return (
        <div className="teamReviewsCont">
            <br/>
            <div className="reviewCont">
                <div className="reviews" key={props.review.id}>
                ------------------------------------------------------------------------------------------------
                    <h2 className="title"><u>{props.review.title}</u></h2>
                    <p className="description">{props.review.description}</p>
                    <div className="likesCont">
                        <h3 className="likes">{props.review.likes} Likes</h3>
                        <button key={props.review.id} onClick={addLikes} 
                        className="like-btn">👍</button>
                        <button className="dislike-btn" onClick={disLike}>👎</button>
                        <h3 className="author">By: {props.review.author}</h3>
                    </div>
                    ------------------------------------------------------------------------------------------------
                 </div>
            </div>
        </div>
    )
}