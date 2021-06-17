import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Login from './components/Login'
import UserPage from './components/UserPage'
import Signup from './components/Signup'
import Teams from './components/Teams'
import TeamDetails from './components/TeamDetails'


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [searchUser, setSearchUSer] = useState({})
  const [errors, setErrors] = useState([])
  const history = useHistory()
  const appD = useRef(null)
  const url = "http://localhost:3001"

  
  
  function loginStatus(){
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(res => {
      if (res.data.logged_in){
        setIsLoggedIn(true)
        setUser(res.data.user)
        console.log(res.data.user)
      } else {
        setIsLoggedIn(false)
        setUser({})
      }
    })
  }


  function handleLogout(){
    setIsLoggedIn(false)
    setUser({})
  }

  useEffect((id) => {
    fetch(`http://localhost:3001/users/${id}`)
    .then(res => console.log(res))
  }, [])

  return (
    <div className="App" ref={appD}>
      <div className="main">
        <Switch>
          <Route exact path='/'>
              <Login 
                user={user} 
                setUser={setUser}
                url={url} 
                errors={errors} 
                setErrors={setErrors}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
          </Route>
          <Route exact path='/user'>
              <UserPage
                  user={user}
                  setUser={setUser}
                  loggedInStatus={isLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  errors={errors}
                  setErrors={setErrors}
                  handleLogout={handleLogout}
              />
          </Route>
          <Route exact path='/signup'>
              <Signup
                  url={url}
                  errors={errors}
                  setErrors={setErrors}
              />
          </Route>
          <Route exact path='/teams'>
              <Teams  
                  url={url}
              />
          </Route>
          <Route exact path="/teams/:id">
              <TeamDetails
                  user={user}
                  setUser={setUser}
                  loggedInStatus={isLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
              />
          </Route>
         
         
          
        </Switch>
      </div>
    </div>
  )

}