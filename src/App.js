import axios from "axios";
import { useState, useRef } from "react";
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import UserPage from './components/UserPage'
import Signup from './components/Signup'
import Teams from './components/Teams'
import TeamDetails from './components/TeamDetails'
import About from './components/About'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  // const [searchUser, setSearchUSer] = useState({})
  const [errors, setErrors] = useState([])
  const appD = useRef(null)
  const url = "http://localhost:3001"

  
  function loginStatus(){
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(res => {
      if (res.errors){
        setErrors(res.errors)
        console.log(res.data.user)
      } else {
        setIsLoggedIn(true)
        setUser(res.data.user.user)
      }
    })
  }

  function handleLogout(){
    setIsLoggedIn(false)
    setUser({})
  }

  // useEffect((id) => {
  //   fetch(`http://localhost:3001/users/${id}`)
  //   .then(res => console.log(res))
  // }, [])

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
                loginStatus={loginStatus}
                setIsLoggedIn={setIsLoggedIn}
              />
          </Route>
          <Route exact path='/about'>
              <About
                user={user} 
                setUser={setUser}
                url={url} 
                errors={errors} 
                setErrors={setErrors}
                loginStatus={loginStatus}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
          </Route>
          <Route exact path='/user'>
            {/* {isLoggedIn && */}
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
              {/* } */}
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
          {/* {isLoggedIn && */}
              <Teams  
                  url={url}
              />
              {/* } */}
          </Route>
          <Route exact path="/teams/:id">
          {/* {isLoggedIn && */}
              <TeamDetails
                  user={user}
                  setUser={setUser}
                  loggedInStatus={isLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
              />
              {/* } */}
          </Route>
         
         
          
        </Switch>
      </div>
    </div>
  )

}