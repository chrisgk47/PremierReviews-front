import { useState, useEffect } from 'react'
import TeamCard from './TeamCard'
import './TeamCard.css'


export default function Team(props){
   const [teams, setTeams] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/teams')
        .then(res => res.json())
        .then(setTeams)
    }, [])

    return (
        <div className="team-cont">
            {teams.map((team) => (
                <TeamCard 
                    key={team.id}
                    team={team}
                    user={props.user}
                    loginStatus={props.loginStatus}
                    isLoggedIn={props.isLoggedIn}
                />
            ))}
        </div>
    )
}