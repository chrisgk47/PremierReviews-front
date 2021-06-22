import React from 'react'
import './TeamCard.css'
import zero from '../assets/0-stars.png'
import one from '../assets/1-stars.png'
import two from '../assets/2-stars.png'
import three from '../assets/3-stars.png'
import four from '../assets/4-stars.png'
import five from '../assets/5-stars.png'

const imgMapper = {0: zero, 1: one, 2: two, 3: three, 4: four, 5: five}

export default function TeamReviews(props){
    const reviewP = props.review
    function generateRatingElement(reviewP){
        if(reviewP.score == null){
            return <h4>No Rating Found</h4>
        } else {
          return <img src={imgMapper[reviewP.score]} alt={reviewP.score} />
        }
      }
   
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

    return (
        <div className="teamReviewsCont"><br/>
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
                        <h3 className="teamscore">{generateRatingElement(reviewP)}</h3>
                        <h3 className="author">By: {props.review.author}</h3>
                    </div>
                    ------------------------------------------------------------------------------------------------
                 </div>
            </div>
        </div>
    )
}