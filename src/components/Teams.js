import React from 'react'
import TeamCard from './TeamCard'
import './TeamCard.css'


export default function Team(props){
   
    return (
        <div className="team-cont">
            {props.teams.map((team) => (
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