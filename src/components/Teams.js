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

    const sortedTeams = [].concat(teams).sort((a, b) => a.name > b.name ? 1 : -1)

    return (
        <div className="team-cont">
            {sortedTeams.map((team) => (
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