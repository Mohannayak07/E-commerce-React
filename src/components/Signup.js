import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import '../App.css';
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db } from '../FirebaseConfigs/Firebase'
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../FirebaseConfigs/Firebase'



export default function Signup() {
  const history = useHistory()
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confpass: ""

  })


  const [success, setSuccess] = useState('')
  const { name, email, password, confpass } = value
  const [loading, setLoading] = useState(false)
  const register = async (e) => {
    setLoading(true)
    if (email === "" || password === "" || name === "") {
      setLoading(false)
      toast.error('please fill all the fields')
    }
    else if (confpass !== password) {
      setLoading(false)
      toast.error('Password do not match ')
    }
    else {

      e.preventDefault()
      // console.log(value)
      createUserWithEmailAndPassword(auth, email, password).then(res => {
        
        console.log(res)
        addDoc(collection(db, "users"), {
          username: name, email: email, password: password,initialcart:0
        }).then(res => {
          setLoading(false)
          toast.success('registration successful')
          setTimeout(()=>{
            
            history.push('/login')          
          },2000)

        }).catch(err => {
          setLoading(false)
          toast.error(err.message)
          
        })
      }).catch(err => {
        setLoading(false)
        toast.error(err.message)
        
      })


    }
  }

  return (
    <div className='spage'>
      {loading && <div className="loader"></div>}
      <div id="sform">

        <h3 id="lh3">Register</h3>

        <div className="form-group">
          <label>First name</label>
          <input type="text" name="name" value={name} className="form-control" placeholder="First name" onChange={(e) => setValue((prev) => ({ ...prev, name: e.target.value }))} required autoComplete='off' />
        </div><br />

        {/* <div className="form-group">
          <label>Last name</label>
          <input type="text" name="lastname" value={lastname}className="form-control" placeholder="Last name" onChange={e=>onInputchange(e)} required autoComplete='off'/>
        </div><br/> */}

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} className="form-control" placeholder="Enter email" onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))} required autoComplete='off' />
        </div><br />

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} className="form-control" placeholder="Enter password" onChange={(e) => setValue((prev) => ({ ...prev, password: e.target.value }))} required autoComplete='off' />
        </div><br />
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confpass" value={confpass} className="form-control" placeholder="Enter password" onChange={(e) => setValue((prev) => ({ ...prev, confpass: e.target.value }))} required autoComplete='off' />
        </div><br />

        <button type="submit" className="btn btn-dark btn-lg btn-block" id="sbtn" onClick={register}>Register</button><br />
        <p className="forgot-password text-right">
          Already registered <Link to="/login">log in?</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  )
}
