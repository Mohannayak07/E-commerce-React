import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/Firebase'
import { collection, getDocs,query,where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import '../App.css';
function Profile() {
    const [loading,setLoading]=useState(false)
    // GetuserDetails()
    
    function GetuserDetails(){
        const [user,setUser]=useState('')
        const usercoll=collection(db,"users")

        useEffect(() => {
            auth.onAuthStateChanged(userlogged=>{
                if(userlogged){
                    setLoading(true)
                    const getUser=async()=>{
                        const q=query(usercoll,where("email","==",userlogged.email))
                        const data= await getDocs(q)
                        console.log(q)
                        setUser(data.docs.map(doc => ({...doc.data(),id:doc.id})))
                        setLoading(false)
                    }
                    getUser()
                }
                else{
                    console.log("User not logged in")
                    setUser(null)
                }
            })
        },[])
        return user
    }
    const loggeduser= GetuserDetails()
    // console.log(loggeduser)
  return (
    <div>
         {loading && <div className="loader"></div>}
        {loggeduser &&<> <span className="user-name"><h2>WELCOME {loggeduser[0].username}</h2></span>
        <div className='profile-container'>
        <img src="../images/user.png" className='profile-image'></img><br></br>
        <p>Name :&nbsp;<span style={{color:"#ff3700"}}>{loggeduser[0].username}</span></p>
        <p>Email Id :&nbsp;<span style={{color:"#ff3700"}}>{loggeduser[0].email}</span></p>
            
            </div>    
        
        </>}
        
        
    </div>
  )
}

export default Profile