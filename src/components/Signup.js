import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const history=useHistory()
    const [user,setUser]=useState({
      "uname":"",
      "lastname":"",
      "email":"",
      "password":""
    })
    const {uname,lastname,email,password}=user
    const onInputchange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
    }
    const register=async (e)=>{
      if(user.email==="" || user.password==="" || user.name===""){
        alert('please fill all the fields')
      }
      else{
        await axios.post('http://localhost:2000/insertuser',user)
        .then(res=>{
          e.preventDefault()
          console.log('inserted..');
          // alert('registration successfull..')
          // history.push('/login')
          toast.success("Registration successful..");
         
         
        })
        .catch(err=>{
          toast.error("Failed to Register");
          console.log(err);
        })
    }
  }

  return (
    <div className='spage'>
    <div id="sform">
     
        <h3 id="lh3">Register</h3>

        <div className="form-group">
          <label>First name</label>
          <input type="text" name="uname" value={uname} className="form-control" placeholder="First name" onChange={e=>onInputchange(e)} required autoComplete='off'/>
        </div><br/>

        <div className="form-group">
          <label>Last name</label>
          <input type="text" name="lastname" value={lastname}className="form-control" placeholder="Last name" onChange={e=>onInputchange(e)} required autoComplete='off'/>
        </div><br/>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} className="form-control" placeholder="Enter email" onChange={e=>onInputchange(e)} required autoComplete='off' />
        </div><br/>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} className="form-control" placeholder="Enter password" onChange={e=>onInputchange(e)} required autoComplete='off' />
        </div><br/>

        <button type="submit" className="btn btn-dark btn-lg btn-block" id="sbtn" onClick={register}>Register</button><br/>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">log in?</Link>
        </p>
        <ToastContainer />
    </div>
    </div>
  )
}
