import React from 'react'
import Header from './Header'


export default function About({isLoggedIn}){
   
    return(
        <div className="aboutCont">
            {/* {isLoggedIn ? <Header />  : <UserHeader/>} */}
            <Header />
            <div className="aboutMain">
                <p className="leagueInfo">
                    [Legal Name: The Football Association Premier League Limited]:<br/><br/>
                    The <u>Premier League</u>, often called the <b>English Premier League(EPL)</b>, is the top level of the English football leagues. The EPL has 20 clubs competing in seasons from August to May, each team playing 38 matches.
                </p>
            </div>
        </div>

    )
}