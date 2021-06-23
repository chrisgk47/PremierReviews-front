import { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import Teams from './Teams'
import UserReviews from './UserReviews'
import './User.css'

export default function UserPage(props){
    
    const [teams, setTeams] = useState([])
    const [matches, setMatches] = useState([])
    const [display, setDisplay] = useState(false)
    const [matchDisplay, setMatchDisplay] = useState(false)
    const [teamDisplay, setTeamDisplay] = useState(true)
    const [newsDisplay, setNewsDisplay] = useState(false)
   

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
    function handleNews(){
        let newBoolean = !newsDisplay
        setNewsDisplay(newBoolean)
    }

    return (
        <div className="user-container">
            <UserHeader user={props.user} handleLogout={props.handleLogout}/>
            <div className="body">
                <div className="userNav">
                    <img className="profile-img" src={props.user.profile_img} alt={props.user.username}/>
                    <h1 className="welcome">Welcome <u className="username">{props.user.username}</u></h1>
                    <button className="hideMatches" onClick={handleHideE}>Matches</button>
                    <button className="hideTeams" onClick={handleHideT}>Teams</button>
                    <button className="hideReviews" onClick={handleHide}>My Reviews</button>
                    <button className="hideNews" onClick={handleNews}>News</button>
                </div>
                
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
                { teamDisplay ?
                    <div className="teams">
                        <Teams teams={teams} user={props.user} />
                    </div>
                : null}
                { display ?
                    <div className="myReviews">
                            <UserReviews  
                                user={props.user}
                                teams={teams}
                                isLoggedIn={props.isLoggedIn}
                            />
                    </div>
                : null}
                { newsDisplay ?
                    <div className="news">
                        <iframe 
                            width="550" 
                            height="434" 
                            src="https://www.youtube.com/embed/2l5OxNAhPWE" 
                            title="News1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                        <br/>
                        <iframe 
                            width="550" 
                            height="434" 
                            src="https://www.youtube.com/embed/C1N_au09k9c" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                        <iframe 
                            width="566" 
                            height="443" 
                            src="https://www.youtube.com/embed/VK3SusEh10o" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                        <iframe 
                            width="550" 
                            height="434" 
                            src="https://www.youtube.com/embed/6r4gy9r_IKk" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                : null}
            </div>
        </div>
    )
}