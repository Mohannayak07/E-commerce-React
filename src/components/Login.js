import React, { useState } from 'react'
import {Link,useHistory} from "react-router-dom"
import { useEffect } from 'react'
import axios from 'axios'
export default function Login() {
    const history=useHistory()
    const [email1,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [data,setData]=useState([])

    useEffect(() => {
        
        getData()
    }, [])
    const getData=async ()=>{
        await axios.get("http://localhost:2000/getusers")
        .then(res=>{
            // console.log(res.data)
            setData(res.data)
        })
        .catch(err=> console.log('error while fetching data..'))
        
    }
    const validate=()=>{
        data.map(ele => {
            return (ele.email===email1 && ele.password===pass) ? history.push('/') : alert('Enter valid details..')
            // if(ele.email===email1 && ele.password===pass){
            //     console.log('Login successfull..')
            //     history.push('/');
            // }
            // else{
            //     console.log('unauthorized user..')
            //     alert('Please Enter Valid Details...')
            // }
        }); 
    }
    return (
        <>


            <div id="loginform">

                <h3 id="lh3"><i className="fa-solid fa-user"></i>&nbsp;Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} />
                </div><br></br>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e=>setPass(e.target.value)}/>
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
                <p className="forgot-password text-right">
                    Create Account <Link to="/signup">Signup?</Link>
                </p>
            </div>
        </>

    )
}
