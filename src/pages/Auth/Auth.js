import React from 'react'
import './Auth.css'
import {auth} from '../../config/firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Auth() {

    let navigate = useNavigate();

    //create state to track if existing user
    const [existingUser, setExistingUser] = React.useState(false)
    //create state for form data
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")

    //create functions for signup and login
    const handleSignup = (e) =>{
        //alert('signup');
        e.preventDefault();
        console.log('signup');
        //connect to fb uth
        createUserWithEmailAndPassword(auth, email, password)
        .then(res =>{
            console.log(res.user)
            //add username as display name
            updateProfile(auth.currentUser, {displayName: name})
            navigate('/')
        })
        .catch(err =>{
            alert(err.code)
        })

    }

    const handleLogin = (e) =>{
        e.preventDefault();
        //login
        signInWithEmailAndPassword(auth, email, password)
        .then(res =>{
            navigate('/')
        })
        .catch(err =>{
            alert(err.com)
        })


    }

  return (
    <div className="auth-container">

        {
            existingUser?
            <form className="auth-form" onSubmit={handleLogin}>
                <h1>Login with your email</h1>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <span className="form-link" onClick={()=>setExistingUser(false)}>Signup</span></p>
            </form>
            :
            <form className="auth-form" onSubmit={handleSignup}>
                <h1>Signup with your email</h1>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => {setName(e.target.value)}}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}
                        required
                    />
                    
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <span className="form-link" onClick={()=>setExistingUser(true)}>Login</span></p>
            </form>
        }

        {/* {
            existingUser?
            <p>Login</p>
            :
            <p>Signup</p>
        } */}
    </div>
  )
}

export default Auth