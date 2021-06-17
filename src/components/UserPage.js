import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserHeader from './UserHeader'
import Teams from './Teams'
import TeamCard from './TeamCard'
import './User.css'
export default function UserPage(user, setUser, isLoggedIn, setIsLoggedIn, loggedInStatus, handleLogout){
    console.log(user.user.email)
    console.log(user.username)
    const [teams, setTeams] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/teams')
        .then(res => res.json())
        .then(setTeams)
    }, [])
  
    return (
        <div className="user-container">
            <UserHeader loggedInStatus={loggedInStatus} handleLogout={handleLogout}/>
            <div className="body">
                <h1 className="welcome">Welcome <u>{user.user.username}</u></h1>
                <div className="teams">
                    <Teams teams={teams} user={user} loggedInStatus={loggedInStatus}/>
                </div>
            </div>
        </div>
    )
}