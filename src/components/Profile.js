import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/Firebase'
import { collection, getDocs,query,where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import axios from 'axios'
import '../App.css';
function Profile() {
    const [orderdata,setOrderdata]=useState()
    const [order,setOrder]=useState(false)
    const getOrderdetails=async(email)=>{
        await axios.get(`http://localhost:2000/orders/${email}`).then((res)=>{
            setOrderdata(res.data)
            setOrder(true)
            console.log(res.data)
        // setTimeout(()=>{
        //     setProcessing(false)
        //     history.push('/order-success',{data:orderinfo.orderId})
        
        // },1000)
      
    }).catch((err)=>{
      console.log(err);
      setOrder(false)
    })
    }

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
         {/* <div style={{marginTop: '8px',position: 'fixed',marginRight: '28px',right: '0',background: 'lightgrey',
            padding: '10px',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',width:'9%'}}>
                        <p>You have no notifications</p>
                        
                    </div> */}
        {loggeduser &&<> <span className="user-name"><h1 className="user-name fw-bold">WELCOME {loggeduser[0].username}</h1></span>
        <div className='profile-container'>
        <img src="../images/user.png" className='profile-image'></img><br></br>
        <p>Name :&nbsp;<span style={{color:"#fa4251"}}>{loggeduser[0].username}</span></p>
        <p>Email Id :&nbsp;<span style={{color:"#fa4251"}}>{loggeduser[0].email}</span></p>
        <button className='btn btn-dark' style={{width:'100%'}} onClick={()=>getOrderdetails(loggeduser[0].email)}>Orders</button>
            
        </div>  <br></br> <br></br> 
        {orderdata && order && <div style={{paddingBottom:'150px'}}>
            <div style={{fontSize:'24px',fontWeight:700,color:'#fa4251',textAlign:'center'}}>Your Order Details</div><br></br>
            <div style={{width:'80%',marginTop:'30px',margin:'0 auto',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',}}>
            <table className="table table-striped">
                      <thead style={{background:'#fa4251',color:'white'}}>
                          <tr>
                              <th scope="col">Order ID</th>
                              <th scope="col">Status</th>
                              <th scope="col">Date</th>
                              <th scope="col">Price</th>
                          </tr>
                      </thead>
                      <tbody>
                       
                {orderdata.map((item,i)=>{
                    return <tr>
                            <td>{item.orderid}</td>
            
                            <td ><span className='btn btn-success'>{item.status}</span></td>
                            <td >{item.statusDate}</td>
                            <td><i class="fa-solid fa-indian-rupee-sign"></i>{item.price}</td>
                     </tr>
                })}
                
                </tbody>
                 </table>
                 </div>
            </div>}
        </>}
        
        
    </div>
  )
}

export default Profile