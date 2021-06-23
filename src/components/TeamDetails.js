import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserHeader from './UserHeader'
import TeamReviews from './TeamReviews'
import axios from 'axios'
import zero from '../assets/0-stars.png'
import one from '../assets/1-stars.png'
import two from '../assets/2-stars.png'
import three from '../assets/3-stars.png'
import four from '../assets/4-stars.png'
import five from '../assets/5-stars.png'

const imgMapper = {0: zero, 1: one, 2: two, 3: three, 4: four, 5: five}

export default function TeamDetails({team, user, isLoggedIn, LoggedInStatus}){
    const location = useLocation()
    console.log(user)
    const [reviews, setReviews] = useState([])
    const [display, setDisplay] = useState(true)
    const [formData, setFormData] = useState({title: "", description: "", likes: 0, author: ""})
    const [pdisplay, setPDisplay] = useState(true)
    
   console.log(location.state.params)

    useEffect(() => {
        setReviews(location.state.params.reviews)
    }, [location.state.params.reviews])

    function handleHide(){
        let newBoolean = !display
        setDisplay(newBoolean)
    }
    function handleHideD(){
        let newBoolean = !pdisplay
        setPDisplay(newBoolean)
    }

    function handleChange(event){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(event){
        event.preventDefault()
        const { title, description, score } = formData

        let review = {
            title: title,
            description: description,
            likes: 0,
            score: score,
            author: user.email,
            team_id: location.state.params.id,
            user_id: user.id
        }
        console.log(review)

        axios.post(`http://localhost:3001/reviews`, { review })
        .then(res => {
            reviews.push(res.data)
        })
        event.target.reset()
    }

    function generateRatingElement(){
          return <img src={imgMapper[location.state.params.average_score]} alt={location.state.params.average_score} />
      }

  
    return(
        <div className="teamDetail" key={location.state.params.id}>
            <UserHeader />
            <div className="banner">
                <a href={`http://${location.state.params.website}`}>
                    <img className="teamBanner" src={location.state.params.banner} alt={location.state.params.name}/>
                </a>
            </div>
            <div className="column">
                <h1 className="team-name">{location.state.params.name}</h1>
                <a className="stadium" href={`${location.state.params.stadium_img}/preview`} ><u>Stadium:</u> {location.state.params.stadium}
                    <div className="stadium_img">
                        <img className="stadiumImg"  alt={location.state.params.name}src={location.state.params.stadium_img} />
                    </div>
                </a><br/><br/>
                <a className="youtube" href={`http://${location.state.params.youtube}`}>Youtube</a>
                <br/><br/>
                <a className="jerseyshop" href={`https://www.uksoccershop.com/football-shirts/english-premier-league?gclid=CjwKCAjwq7aGBhADEiwA6uGZp-0Ys3K_zYVEhqzUgKjTMOeX01e3_PEz1BqjpH0JhpU0ST9wpju-vBoCedsQAvD_BwE`}>
                    <img className="jersey" src={location.state.params.jersey} alt={location.state.params.name}/>
                </a>
                <h3 className="avg">Average Rating: <br/>{generateRatingElement()}</h3>
               <div className="descriptionDiv"><br/>
                <button className="descriptionHide" onClick={handleHideD}>Show/Hide Description</button><br/><br/>
                    {pdisplay ? 
                    <p className="teamDescription">{location.state.params.description}</p> : null}
               </div>
            </div>
            <div className="column">
                <button className="teamDReviewHide" onClick={handleHide}>Reviews</button>
                {display ? 
                <div className="review-cont">
                    {reviews.map((review) => (
                        <TeamReviews key={review.id} review={review} reviews={reviews} setReviews={setReviews}/>
                        ))}
                </div>
                : null}
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
                        <select 
                            className="scoreForm" 
                            placeholder="Choose a Score"
                            name="score"
                            value={ formData.score }
                            onChange={ handleChange }
                        >   
                            <option>Select a ⭐️ Rating</option>
                            <option value={1}>⭐️</option>
                            <option value={2}>⭐️⭐️</option>
                            <option value={3}>⭐️⭐️⭐️</option>
                            <option value={4}>⭐️⭐️⭐️⭐️</option>
                            <option value={5}>⭐️⭐️⭐️⭐️</option>
                        </select>
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
                </div>
            </div>
        </div>
    )
}