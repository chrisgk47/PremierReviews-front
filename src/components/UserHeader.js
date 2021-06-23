import React from 'react'
import axios from 'axios'
import './User.css'

const UserHeader = (user, loggedInStatus, handleLogout, history) => {

    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', { withCredentials: true })
            .then(res => {
                handleLogout()
                history.push('/')
            })
            .catch(error => console.log(error))
    }
    

    return (
        <div className="umain-header">
            <a href='http://localhost:3000/user'>
                <img className="upremier-logo" src='https://b.thumbs.redditmedia.com/ZvZBvQ9kg21R8OcRKt0K8hsusgoqMHGtdQ6pCDKj1ok.png' alt="logo"/>
            </a> 
                <ul className="uNav-ul">
                    <li className="Github-Link">
                        <a href='https://github.com/chrisgk47/PremierReviews-front'>
                            <img
                                className="github-logo"
                                src="https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png"
                                alt="gitinit"
                            />
                        </a>
                    </li>
                    <li className="uMedium-Link">
                        <a href="https://chris-kim1990.medium.com/">
                            <img
                                className="umedium-logo"
                                src='https://cdn.iconscout.com/icon/free/png-256/medium-2296046-1912005.png'
                                alt="medium"
                            />
                        </a>
                    </li>
                    <li className="uLinkedIn-Link">
                        <a href='http://linkedin.com/in/christopher-kim-0737b0149'>
                        <img 
                            className="ulinkedin-logo" 
                            src="https://parthenonpub.com/assets/2011/11/LINKED_IN_LOGO__NICOTENHAVE_DOT_TK.gif"
                            alt="in"
                        />
                        </a>
                    </li>
                    <li className="uLogout-Link">
                        {/* <a className="logout" href='http://localhost:3000/' onClick={handleClick}>Log Out</a> */}
                        {loggedInStatus ? <a href='http://localhost:3000/' onClick={handleClick}>Log Out</a> : null}
                    </li>
                </ul>
              </div>
    )              
}
export default UserHeader

