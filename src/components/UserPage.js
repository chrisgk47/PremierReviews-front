import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserHeader from './UserHeader'
import Teams from './Teams'
import TeamCard from './TeamCard'
import UserReviews from './UserReviews'
import './User.css'
export default function UserPage(user, setUser, isLoggedIn, setIsLoggedIn, loggedInStatus, handleLogout){
    console.log(user.user)
    const [teams, setTeams] = useState([])
    // const [reviews, setReviews] = useState([])
    const [display, setDisplay] = useState(false)
    const [teamDisplay, setTeamDisplay] = useState(false)
    // console.log(user.user.reviews)
    useEffect(() => {
        fetch('http://localhost:3001/teams')
        .then(res => res.json())
        .then(setTeams)
    }, [])
  
    // useEffect(() => {
        // fetch('http://localhost:3001/reviews')
        // .then(res => res.json())
        // .then(setReviews)
    //     setReviews(user.user.reviews)
    // }, [])

    
    function handleHide(){
        let newBoolean = !display
        setDisplay(newBoolean)
    }
    function handleHideT(){
        let newBoolean = !teamDisplay
        setTeamDisplay(newBoolean)
    }

    return (
        <div className="user-container">
            <UserHeader user={user} loggedInStatus={loggedInStatus} handleLogout={handleLogout}/>
            <div className="body">
                <h1 className="welcome">Welcome <u>{user.user.username}</u></h1>
                <button className="hideTeams" onClick={handleHideT}>Teams</button>
                { teamDisplay ?
                <div className="teams">
                    <Teams teams={teams} user={user} loggedInStatus={loggedInStatus}/>
                </div>
                : null}

                <button className="hideReviews" onClick={handleHide}>My Reviews</button>
                { display ?
                <div className="myReviews">
                        <UserReviews  
                            user={user.user}
                            teams={teams}
                            loggedInStatus={loggedInStatus}
                        />
                </div>
                     : null}
            </div>
        </div>
    )
}