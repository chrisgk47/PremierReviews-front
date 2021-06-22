import React from 'react'
import { useHistory } from 'react-router-dom'
import zero from '../assets/0-stars.png'
import one from '../assets/1-stars.png'
import two from '../assets/2-stars.png'
import three from '../assets/3-stars.png'
import four from '../assets/4-stars.png'
import five from '../assets/5-stars.png'

const imgMapper = {0: zero, 1: one, 2: two, 3: three, 4: four, 5: five}

export default function TeamCard({team}){
    const history = useHistory()

    function generateRatingElement(){
        if(team.average_score == null){
            return <h4>No Rating Found</h4>
        } else {
          return <img src={imgMapper[team.average_score]} alt={team.average_score} />
        }
      }

    function handleTeamClick(){
        history.push(`teams/${team.id}`, {params: team})
    }

    return (
        <div className="teamCard" key={team.id}>
            <img className="teamLogo" src={team.image} alt="hello"/>
            <br/>
            <h1 className="teamName">{team.name}</h1>
            <h1 className="average">{generateRatingElement(team)}</h1>
            <button className="teamDetBtn" onClick={handleTeamClick}>
                {team.name} Page
            </button>
        </div>
    )
}