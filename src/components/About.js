import React from 'react'
import Header from './Header'


export default function About(props){
   
    return(
        <div className="aboutCont">
            <Header />
            <div className="aboutMain">
                <p className="leagueInfo">
                    [Legal Name: The Football Association Premier League Limited]:<br/><br/>
                    The <u>Premier League</u>, often called the <b>English Premier League(EPL)</b>, is the top level of the English football leagues. The EPL has 20 clubs competing in seasons from August to May, each team playing 38 matches.<br/><br/>
                    Enjoy some of the season highlights below.
                </p>
            </div>
            <div className="vid">
            <iframe 
                className="vid"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/o_20mzo-ZWY" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            </div>
        </div>

    )
}