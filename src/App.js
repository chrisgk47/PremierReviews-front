import axios from "axios";
import { useState, useEffect} from "react";
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import UserPage from './components/UserPage'
import Signup from './components/Signup'
import Teams from './components/Teams'
import TeamDetails from './components/TeamDetails'
import About from './components/About'
import Clips from './components/Clips'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])
  const url = "http://localhost:3001"

  
  function loginStatus(){
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(res => {
      if (res.errors){
        setErrors(res.errors)
        console.log(res.data.user)
      } else {
        setIsLoggedIn(true)
        setUser(res.data.user)
      }
    })
  }
  useEffect(() => {
    loginStatus()
  }, [])

  function handleLogout(){
    setIsLoggedIn(false)
    setUser({})
  }

  return (
    <div className="App" >
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
                loginStatus={loginStatus}
                setIsLoggedIn={setIsLoggedIn}
              />
          </Route>
          <Route exact path='/about'>
              <About
                user={user}        
                url={url} 
                errors={errors} 
                setErrors={setErrors}
                loginStatus={loginStatus}
                isLoggedIn={isLoggedIn}
              />
          </Route>
          <Route exact path='/user'>
              <UserPage
                  user={user}
                  setUser={setUser}
                  loginStatus={loginStatus}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  errors={errors}
                  setErrors={setErrors}
                  handleLogout={handleLogout}
              />
          </Route>
          <Route exact path='/signup'>
              <Signup
                  user={user} 
                  setUser={setUser}
                  url={url} 
                  errors={errors} 
                  setErrors={setErrors}
                  isLoggedIn={isLoggedIn}
                  loginStatus={loginStatus}
                  setIsLoggedIn={setIsLoggedIn}
              />
          </Route>
          <Route exact path='/teams'>
              <Teams  
                  user={user}
                  setUser={setUser}
                  loggedInStatus={isLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
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
          <Route exact path="/clips">
            <Clips
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