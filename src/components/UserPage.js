import { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import Teams from './Teams'
import UserReviews from './UserReviews'
import './User.css'
export default function UserPage(user, setUser, isLoggedIn, setIsLoggedIn, loggedInStatus, handleLogout){
    console.log(user.user)
    const [teams, setTeams] = useState([])
    // const [reviews, setReviews] = useState([])
    const [display, setDisplay] = useState(false)
    const [teamDisplay, setTeamDisplay] = useState(true)
    // console.log(user.user.reviews)

    // const [apiData, setApiData] = useState([])
    // const [jerseys, setJerseys] = useState([])

    // useEffect(() => {
    //     fetch('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League')
    //     .then(res => res.json())
    //     .then(res => setApiData(res.teams))
    // }, [])
    
    // useEffect(() => {
    //     setJerseys(apiData.map(team => team.strTeamJersey))
    // }, [ console.log(jerseys)])
   
    
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