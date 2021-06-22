import { useEffect, useState } from 'react'
import './User.css'
import zero from '../assets/0-stars.png'
import one from '../assets/1-stars.png'
import two from '../assets/2-stars.png'
import three from '../assets/3-stars.png'
import four from '../assets/4-stars.png'
import five from '../assets/5-stars.png'

const imgMapper = {0: zero, 1: one, 2: two, 3: three, 4: four, 5: five}

export default function UserReviews(props){
    const [userReviews, setUserReviews] = useState([])

    function generateRatingElement(userReview){
        if(userReview.score == null){
            return <h4>No Rating Found</h4>
        } else {
          return <img src={imgMapper[userReview.score]} alt={userReview.score} />
        }
      }

    useEffect(() => {
        setUserReviews(props.user.reviews)
    }, [props.user.reviews])

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
                        <h3 className="score">Average Score: <br/>{generateRatingElement(userReview)}</h3>
                        <h3 className="author">By: {userReview.author}</h3>
                 </div>
            ))}
        </div>
    )
}