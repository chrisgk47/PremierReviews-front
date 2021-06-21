import { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import Teams from './Teams'
import UserReviews from './UserReviews'
import './User.css'

export default function UserPage(props){
    
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
   
    return (
        <div className="user-container">
            <UserHeader user={props.user} handleLogout={props.handleLogout}/>
            <div className="body">
                <h1 className="welcome">Welcome <u className="username">{props.user.username}</u></h1>
                <button className="hideMatches" onClick={handleHideE}>Matches</button>
                {matchDisplay ?
                    <div className="matches">
                        {matches.map(match => {
                        return <div className="events" key={match.id}>
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
                        <Teams teams={teams} user={props.user} />
                    </div>
                : null}

                <button className="hideReviews" onClick={handleHide}>My Reviews</button>
                { display ?
                    <div className="myReviews">
                            <UserReviews  
                                user={props.user}
                                teams={teams}
                                isLoggedIn={props.isLoggedIn}
                            />
                    </div>
                : null}
            </div>
        </div>
    )
}