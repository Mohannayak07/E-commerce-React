import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { db } from '../FirebaseConfigs/Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import { useHistory } from 'react-router-dom'
import '../App.css'
import '../Header.css'
import { useContext } from 'react';
import { adminContext } from '../App';
import { slide as Menu } from 'react-burger-menu'
export default function Header() {
      
    const history = useHistory()
    const {admin,setAdmin}=useContext(adminContext)
    const [style, setStyle] = useState("navbarSupportedContent");
    const [open,setOpen]=useState(false)
    // GetuserDetails()
    const changeStyle=(val)=>{
        if(val==="open"){
            setOpen(true)
            setStyle("navbarSupportedContent2")
        }
        else{
            setOpen(false)
            setStyle("navbarSupportedContent")
        }
    }
   function GetuserDetails() {
        const [user, setUser] = useState('')
        const usercoll = collection(db, "users")

        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    const getUser = async () => {
                        const q = query(usercoll, where("email", "==", userlogged.email))
                        const data = await getDocs(q)
                        console.log(q)
                        setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    }
                    getUser()
                }
                else {
                    console.log("User not logged in")
                    setUser(null)
                }
            })
        }, [])
        return user
    }
    const loggeduser = GetuserDetails()
    console.log(loggeduser)

    // if(loggeduser){
    //     console.log(loggeduser)
    // }
    const Logout = () => {
        auth.signOut().then(() => {
            console.log(loggeduser)
            history.push("/login")
        })
    }
    const Adminlogout=()=>{
        setAdmin(false)
        history.push("/login")
    }
    // const [cartItem, setCartItem] = useState([])
    const [len, setLen] = useState(0)
    const cartdata = []
    if (loggeduser) {
        
        const getdata = async () => {
            const cartArray = []
            const path = `cart-${loggeduser[0].email}`
            const q = query(collection(db, path));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                cartArray.push({ ...doc.data(), id: doc.id })
                // console.log(doc.id, " => ", doc.data());
            });
            cartArray.forEach(data=>{
                cartdata.push(data)
            })
            // console.log(cartdata)
            setLen(cartArray.length)
            
            
        }
        getdata()
    }
    
    // console.log(cartArray)




    return (
        <nav className="navbar navbar-expand-lg bg-light shadow sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold fs-4" href="/home">Brand<span>Factory</span></a>
               {open && <div className="btn btn-dark" onClick={()=>changeStyle("close")} id="hanburder"><i class="fa-solid fa-bars"></i></div>} 
               {!open && <div className="btn btn-dark" onClick={()=>changeStyle("open")} id="hanburder"><i class="fa-solid fa-bars"></i></div>}
                <div className="collapse navbar-collapse" id={style}>
                    
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                       
                    <div id="navbar-items">
                    
                        <div>

                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/" id="active">Home</Link>
                        </li>
                        </div>
                        <div>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        </div>
                        
                        {/* {
                            <li className="nav-item">
                            <Link className="nav-link" to='/sell'>Sell</Link>
                        </li>
                        } */}
                        <div>

                        <li className="nav-item">
                            <Link className="nav-link" to='/about'>About</Link>
                        </li>
                        </div>
                        <div>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contactus">Contact Us</Link>
                        </li>
                        </div>
                        <div>
                        <Link className="nav-link" type="submit" to="/login" id="login-btn">Login&nbsp;</Link>
                        </div>
                        </div>
                    </ul>
                    
                    {!loggeduser && !admin &&<div id="signup-links">
                        <Link className="btn btn-outline-dark me-2" type="submit" to="/login">Login&nbsp;</Link>
                        <Link className="btn btn-outline-dark me-2" type="submit" to="/signup">SignUp</Link>
                        <Link to="/cartdata" className="btn btn-dark me-2" type="submit"><i className="fa-solid fa-cart-shopping"><sup><span className="cart-num">0</span></sup></i></Link>
                    </div>}
                   
                    {loggeduser && <>
                        <button className="btn btn-outline-dark me-2" type="submit" onClick={Logout}>Log out</button>
                        <Link to="/cartdata" className="btn btn-dark me-2" type="submit"><i className="fa-solid fa-cart-shopping"><sup><span className="cart-num" style={{fontSize:'10px'}}>{len}</span></sup></i></Link>
                        <button style={{border:'none',background:'transparent',fontSize:'20px'}}><i class="fa-sharp fa-solid fa-bell"><sup><span className="cart-num" style={{fontSize:'10px'}}>1</span></sup></i></button>&nbsp;&nbsp;
                        <Link to="/profile"><img src="../images/user.png" className='user'></img></Link>
                        

                    </>}
                    {admin && <>
                        <button className="btn btn-outline-dark me-2" type="submit" onClick={Adminlogout}>Log out</button>
                        {/* <Link to="/cartdata" className="btn btn-dark me-2" type="submit"><i className="fa-solid fa-cart-shopping"><sup><span className="cart-num">{len}</span></sup></i></Link> */}
                    </>}
                    
                    

                    

                   
                </div>
            </div>
            
        </nav>
       
    )
}

