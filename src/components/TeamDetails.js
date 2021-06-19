import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserHeader from './UserHeader'
import TeamReviews from './TeamReviews'
import axios from 'axios'

export default function TeamDetails({team, user, isLoggedIn, LoggedInStatus}){
    const location = useLocation()
    // console.log(location.state.params)
    console.log(user)
    const [reviews, setReviews] = useState([])
    const [display, setDisplay] = useState(true)
    const [formData, setFormData] = useState({title: "", description: "", likes: 0, author: ""})
  

    // console.log(location.state.params)
    // const reviews = location.state.params.reviews
   
    useEffect(() => {
        setReviews(location.state.params.reviews)
    }, [])

    function handleHide(){
        let newBoolean = !display
        setDisplay(newBoolean)
    }

    function handleChange(event){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(event){
        event.preventDefault()
        const { title, description } = formData

        let review = {
            title: title,
            description: description,
            likes: 0,
            author: user.email,
            team_id: location.state.params.id,
            user_id: user.id
        }

        axios.post(`http://localhost:3001/reviews`, { review })
        .then(res => {
            console.log(res.data)
            reviews.push(res.data)
            
        })
    }

    function addLikes(review){
        console.log(review)
        fetch(`http://localhost:3001/reviews/${review.id}`, {
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

    
    return(
        <div className="teamDetail" key={location.state.params.id}>
            <UserHeader />
            <div className="column">
              
                <img className="teamDetailLogo" src={location.state.params.image} alt={location.state.params.name}/>
                <h1 className="team-name">{location.state.params.name}</h1>
                    <button className="teamDReviewHide" onClick={handleHide}>Reviews</button>
                    {display ? 
                <div className="review-cont">
                        {reviews.map((review) => (
                            <TeamReviews key={review.id} review={review} addLikes={addLikes}/>
                            ))}
                </div>
                : null}
            </div>
            <div className="column">
                <div className="reviewFormCont">
                    <h1 className="ReviewTitle"><u>Review Form</u></h1>
                    <br/>
                    <form onSubmit={handleSubmit} className="reviewForm">
                        <input
                            className="title"
                            placeholder="Choose a Title"
                            type="text"
                            name="title"
                            value={ formData.title }
                            onChange={ handleChange }
                        />
                        <input
                            className="description"
                            placeholder="Write your review"
                            type="text"
                            name="description"
                            value={ formData.description }
                            onChange={ handleChange }
                        />
                        <button className="submitReviewBtn" type="submit">
                            Submit Review
                        </button>
                    </form>
                    <div className="api">
                           
                    </div>
                </div>
            </div>
        </div>
    )
}