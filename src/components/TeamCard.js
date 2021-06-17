import React from 'react'
import { useHistory } from 'react-router-dom'

export default function TeamCard({team}){
    const history = useHistory()

    function handleTeamClick(){
        history.push(`teams/${team.id}`, {params: team})
    }

    return (
        <div className="teamCard" key={team.id}>
            <img className="teamLogo" src={team.image} alt="hello"/>
            <br/>
            <h1 className="teamName">{team.name}</h1>
            <button className="teamDetBtn" onClick={handleTeamClick}>
                {team.name} Page
            </button>
        </div>
    )
}