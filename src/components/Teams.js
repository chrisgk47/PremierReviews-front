import React from 'react'
import TeamCard from './TeamCard'
import './TeamCard.css'
export default function Team(teams, user, loggedInStatus, isLoggedIn){
   
    return (
        <div className="team-cont">
            {teams.teams.map((team) => (
                <TeamCard 
                    key={team.id}
                    team={team}
                    user={user}
                    loggedInStatus={loggedInStatus}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </div>
    )
}