import React from 'react'
import '../App.css'
const Header = (props) => {
     
    return(
        <div className="main-header">
            <a href='http://localhost:3000/'>
                <img className="premier-logo" src='https://b.thumbs.redditmedia.com/ZvZBvQ9kg21R8OcRKt0K8hsusgoqMHGtdQ6pCDKj1ok.png' alt="logo"/>
            </a>
             <h1 className="header-title">Premier League Reviews</h1>
                <ul className="Nav-ul">
                    <li className="About-Link">
                        <a href="http://localhost:3000/about">
                            <img
                                className="about-logo"
                                src='https://cdn.iconscout.com/icon/premium/png-256-thumb/contact-book-128-980494.png'
                                alt="about"
                            />
                        </a>
                    </li>
                    <li className="Github-Link">
                        <a href='https://github.com/chrisgk47/Premier-Reviews-Front'>
                            <img
                                className="github-logo"
                                src="https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png"
                                alt="gitinit"
                            />
                        </a>
                    </li>
                    <li className="Medium-Link">
                        <a href="https://chris-kim1990.medium.com/">
                            
                            <img
                                className="medium-logo"
                                src='https://cdn.iconscout.com/icon/free/png-256/medium-2296046-1912005.png'
                                alt="medium"
                            />
                        </a>
                    </li>
                    <li className="LinkedIn-Link">
                        <a href='http://linkedin.com/in/christopher-kim-0737b0149'>
                        <img 
                            className="linkedin-logo" 
                            src="https://parthenonpub.com/assets/2011/11/LINKED_IN_LOGO__NICOTENHAVE_DOT_TK.gif"
                            alt="in"
                        />
                        </a>
                    </li>
                </ul>
              </div>
    )
}
export default Header