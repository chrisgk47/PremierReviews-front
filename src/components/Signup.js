import { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import Header from './Header'

export default function Signup({user, setUser, setIsLoggedIn, isLoggedIn, errors, setErrors}) {
    const [formData, setFormData] = useState({username: "", email: "", password: "", password_confirmation: ""})
    const history= useHistory()
    function handleChange(event){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e){
        e.preventDefault()
        const { username, email, password, password_confirmation } = formData

        let user = {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }

        axios.post(`http://localhost:3001/users`, { user }, { withCredentials: true })
        .then(res => {
            if(res.data.status === 'created'){
                setIsLoggedIn(true)
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
    return (
        <div className="form-cont">
            <Header />
            <div className="Body-Links">
                <h1 className="body-title">Welcome, Please Login or Signup</h1> 
                <form align="center" className="signup-form" onSubmit={handleSubmit}>
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
                <input
                    placeholder="Password"
                    type="password"
                    name="password_confirmation"
                    value={ formData.password_confirmation }
                    onChange={handleChange}
                />
                <br></br><br></br>
                <button className="Signup-Btn" placeholder="submit" type="submit">
                    Signup
                </button>
                <div className='Alt'>
                    <br></br>
                    or <Link to='/'>Login</Link>
                </div>
                </form> 
                <div className="errors">
                    {errors ? handleErrors() : null}
                </div>
            </div>
        </div>
    )

}