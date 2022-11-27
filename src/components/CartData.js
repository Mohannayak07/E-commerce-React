import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/Firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import { Link } from "react-router-dom"
import CartCard from './CartCard'

function CartData() {
    const [quantity,setQuantity]=useState(1);
    const [loading,setLoading]=useState(true);
    function GetcartDetails(){
        const [user,setUser]=useState('')
        const usercoll=collection(db,"users")
       
        useEffect(() => {
            auth.onAuthStateChanged(userlogged=>{
                if(userlogged){
                   
                    const getUser=async()=>{
                        const q=query(collection(db,`cart-${userlogged.email}`))
                        const data= await getDocs(q)
                        console.log(q)
                        setUser(data.docs.map(doc => ({...doc.data(),id:doc.id})))
                        
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
    // setLoading(false)
    const cartdata= GetcartDetails()

    console.log(cartdata)
    
    console.log(cartdata)
    setTimeout(() => {
        setLoading(false);
    },100)
    

    var price=0;
    return (
        <div >
            
            {/* {console.log('inside return')}
            {console.log(cartdata)} */}
            {loading && <div className="loader"></div>}
            {cartdata && <div><h2 style={{textAlign: 'center',marginTop:'10px',padding:'10px',backgroundColor:'yellow'}}>Your Cart Items</h2>
                <div className="row row-cols-1 row-cols-md-4 g-0" >
                    
                    {cartdata.map((ele,i) => {
                        return (
                            <>
                                
                           
                            <div className="col">
                                
                                <div className="card h-100 p-4" key={ele.id}>
                                    
                                    <img src={ele.data.image} className="card-img-top" alt="Product img" height="250px" /><hr></hr>
                                    <div className="card-body">
                                        <h5 className="card-title">{ele.data.title}</h5>
                                        <div className="card-title">{ele.data.category}</div>
                                        {/* <p className="card-text">{ele.description}</p> */}
                                        <h5 className="card-title"><i class="fa-solid fa-indian-rupee-sign">{Math.floor(ele.data.price*30)}</i></h5><br></br>
                                        
                                        <div className='row'>
                                            <div className="col-sm-6">
                                            <Link to={`/products/${ele.data.id}`} id="vbtn" className="btn btn-outline-dark" >View</Link>
                                            </div>
                                            <div className="col-sm-6" style={{alignItems: "center"}}>
                                           <Link to='#' onClick={()=>{ele.quantity=ele.quantity+1}} > <i class="fa-solid fa-plus"> </i></Link> &nbsp;&nbsp;{ele.quantity}&nbsp;&nbsp;<Link to='#' onClick={()=>{ele.quantity=ele.quantity-1}}><i class="fa-solid fa-minus"></i></Link>
                                           <span style={{display:'none'}}>{price=price+(ele.quantity*ele.data.price)}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    })}
                </div>
              {cartdata &&  <div className='price-cont'>
                <h3 style={{padding: '10px',marginRight:'20px'}}>Total price:<i class="fa-solid fa-indian-rupee-sign"></i>{Math.floor(price*30)}</h3>
                <Link style={{marginLeft: '10px'}} className='btn btn-primary' to='/check-out'>Place order</Link>
                </div>}
            </div>
            
            }
            

            {!cartdata && <div > <div className='cart-msg' style={{ textAlign: 'center', color: 'black', padding: '20px' }}><span style={{textDecoration: 'underline'}}>Your Shopping Cart is empty</span><br></br>
            You have no items in your cart.To buy one or more items,please login and click <b>'Add To Cart'</b> next to the item.
            </div>
                    <img className="empty-cart" src="../images/cart1.png" alt="empty-cart"></img>
            </div>}

        </div>
    )
}

export default CartData