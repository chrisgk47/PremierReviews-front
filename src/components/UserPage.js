import { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import Teams from './Teams'
import UserReviews from './UserReviews'
import './User.css'

export default function UserPage(user, setUser, isLoggedIn, setIsLoggedIn, loggedInStatus, handleLogout){
    console.log(user.user)
    const [teams, setTeams] = useState([])
    const [matches, setMatches] = useState([])
    const [display, setDisplay] = useState(false)
    const [matchDisplay, setMatchDisplay] = useState(true)
    const [teamDisplay, setTeamDisplay] = useState(false)
   
    useEffect(() => {
        fetch('http://localhost:3001/matches')
        .then(res => res.json())
        .then(setMatches)
    }, [])


    useEffect(() => {
        fetch('http://localhost:3001/teams')
        .then(res => res.json())
        .then(setTeams)
    }, [])
    //hide user reviews
    function handleHide(){
        let newBoolean = !display
        setDisplay(newBoolean)
    }
    //hide teams user page
    function handleHideT(){
        let newBoolean = !teamDisplay
        setTeamDisplay(newBoolean)
    }
    //hide match events
    function handleHideE(){
        let newBoolean = !matchDisplay
        setMatchDisplay(newBoolean)
    }
    console.log(matches)
    return (
        <div className="user-container">
            <UserHeader user={user} loggedInStatus={loggedInStatus} handleLogout={handleLogout}/>
            <div className="body">
                <h1 className="welcome">Welcome <u>{user.user.username}</u></h1>
                <button className="hideMatches" onClick={handleHideE}>Matches</button>
                {matchDisplay ?
                <div className="matches">
                    {matches.map(match => {
                    return <div className="events">
                        <img className="matchimg" src={match.image} alt="match"/>
                        <h1 className="game">🏟{match.game1}🏟</h1>
                        <h2 className="season">Season: {match.season}</h2>
                        <h2 className="date">Match Date: 📆{match.date}</h2>
                        <h2 className="home">Home Team: {match.home}</h2>
                        <h2 className="away">Away Team: {match.away}</h2>
                        <h3 className="score">⚽️Home: {match.home_score} ⚽️Away: {match.away_score}</h3>
                    </div>
                    })} 
                </div>
                : null}
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
                            isLoggedIn={isLoggedIn}
                            loggedInStatus={loggedInStatus}
                        />
                </div>
                     : null}
                {/* <div className="apiCont">
                    <div className="apiCard">
                        {jerseys.map(link => {
                            return <img className="jersey" src={link} alt="jersey"/>
                        })}
                    </div>
                </div> */}
            </div>
        </div>
    )
}