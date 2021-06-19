import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Header from './Header'
// import Nav from 'react-bootstrap/Nav'
import axios from 'axios'

export default function Login({user, setUser, url, setIsLoggedIn, isLoggedIn, errors, setErrors}){
    const [formData, setFormData] = useState({username: "", email: "", password: ""})
    const [display, setDisplay] = useState(false)
    const history = useHistory()

    
    function handleChange(event){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e){
        e.preventDefault()
        const { username, email, password } = formData

        let user = {
            username: username,
            email: email,
            password: password
        }

        axios.post(`${url}/login`, { user }, { withCredentials: true })
        .then(res => {
            if(res.data.logged_in){
                setIsLoggedIn(true)
                console.log(res.data)
                console.log(res.data.user)
                setUser(res.data.user)
                localStorage.setItem('User', res.data)
                redirect()
            } else {
                setErrors(res.data.errors)
            }
        }) 
        .catch(error => console.log('api errors', error))
    }

    function redirect(){
        history.push('/user')
    }

    function handleErrors(){
        return (
            <div>
                <ul className="error-ul">
                    {errors.map(error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
            </div>
        )
    }

    function handleHide(){
        let newBoolean = !display
        setDisplay(newBoolean)
    }

    return (
        <div className="form-cont">
            <Header />
            <div className="Body-Links">
                <h1 className="body-title">Welcome, Please Login or Signup</h1>
                <button className="hideForm" onClick={handleHide}>Log In / Signup</button>
                { display ?  
                <form align="center" className="login-form" onSubmit={handleSubmit}>
                <br></br><br></br>
                <input
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={ formData.username }
                    onChange={handleChange}
                />
                <br></br><br></br>
                <input
                    placeholder="Email Address"
                    type="text"
                    name="email"
                    value={ formData.email }
                    onChange={handleChange}
                />
                <br></br><br></br>
                <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={ formData.password }
                    onChange={handleChange}
                />
                <br></br><br></br>
                <button className="Login-Btn" placeholder="submit" type="submit">
                    Log In
                </button>
                <div className='Alt'>
                    <br></br>
                    or <Link to='/signup'>Sign Up</Link>
                </div>
                </form> 
                : null}
                <div className="errors">
                    {errors ? handleErrors() : null}
                </div>
            </div>
        </div>
    )


}