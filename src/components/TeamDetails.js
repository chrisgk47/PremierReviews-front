import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserHeader from './UserHeader'
import TeamReviews from './TeamReviews'

export default function TeamDetails({team, user}){
    const location = useLocation()
    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
        setReviews(location.state.params.reviews)
    }, [])
    console.log(user)
    
    return(
        <div className="teamDetail" key={location.state.params.id}>
            <UserHeader />
            <img className="teamDetailLogo" src={location.state.params.image} alt={location.state.params.name}/>
            <br/>
            <h1 className="team-name">{location.state.params.name}</h1>
            <br/>
            <div className="team-reviews">
                <TeamReviews reviews={reviews}/>
            </div>
        </div>
    )
}