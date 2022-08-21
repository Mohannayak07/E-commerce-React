import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from '../FirebaseConfigs/Firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import '../App.css';

export default function Login() {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false)

    
    const validate = () => {
        setLoading(true)
        if(email==="" || pass===""){
            setLoading(false)
            toast.error('Enter email or password')

        }
        else{
            signInWithEmailAndPassword(auth, email, pass).then(res => {
        
                // console.log(res)
                setLoading(false)
                  toast.success('Login successful')
                  setTimeout(()=>{
                    // toast.success('Login successful')
                    history.push('/')          
                  },2000)
              }).catch(err => {
                setLoading(false)
                if(err.message==='Firebase: Error (auth/user-not-found).'){
                    toast.error('Invalid Email')
                }
                else if(err.message==='Firebase: Error (auth/wrong-password).'){
                    toast.error('Invalid Password')
                }
                else{
                    toast.error(err.message)
                }

                
                // setLoading(false)
              })
        
        }
    }
    return (
        <div className="login-container">

{loading && <div className="loader"></div>}
            <div id="loginform">

                <h3 id="lh3"><i className="fa-solid fa-user"></i>&nbsp;Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div><br></br>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="pass" value={pass} placeholder="Enter password" onChange={e => setPass(e.target.value)} />
                </div><br></br>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div><br></br>

                <button type="submit" className="btn btn-dark btn-lg btn-block" id="Lbtn" onClick={validate}>Sign in</button><br></br>
                {/* <p className="forgot-password text-right">
                    Forgot <Link to="/forget">password?</Link>
                </p> */}
                <br></br>
               
                <p className="forgot-password text-right">
                    Create Account <Link to="/signup">Signup?</Link>
                </p>
                <ToastContainer />
            </div>
        </div>

    )
}
