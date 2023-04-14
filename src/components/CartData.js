import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/Firebase'
import { collection, getDocs, query,deleteDoc,doc } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
// import CartCard from './CartCard'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
function CartData() {
    const history=useHistory()
    // const [quantity,setQuantity]=useState(1);
    const [loading,setLoading]=useState(true);
    const [useremail,setUseremail]=useState();
    const [removing,setRemoving]=useState(false)

    function GetcartDetails(){
        const [user,setUser]=useState('')
        const usercoll=collection(db,"users")
       
        useEffect(() => {
            auth.onAuthStateChanged(userlogged=>{
                if(userlogged){
                   
                    const getUser=async()=>{
                        const q=query(collection(db,`cart-${userlogged.email}`))
                        setUseremail(userlogged.email)
                        const data= await getDocs(q)
                        // console.log(q)
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
    const handleplaceorder=(quantityarray,totalprice)=>{
        history.push('/check-out',{quantityarray:quantityarray,totalprice:Math.floor(totalprice)})
    }
    const removeCart=(id)=>{
        setRemoving(true)
        deleteDoc(doc(db,`cart-${useremail}`,id))
        .then((res)=>{
            setRemoving(false)
            toast.success('Removed successfully')
            setTimeout(()=>{
                window.location.reload(false);
            },2000)
        }).catch((err)=>{
            setRemoving(false)
            toast.error('something went wrong')
            console.log('error')
        })
    }
    
      
    // setLoading(false)
    const cartdata= GetcartDetails()

    // console.log(cartdata)
    
    setTimeout(() => {
        setLoading(false);
    },100)
    
    var quantityarray=[]
    var price=0;
    return (
        <div >
            
            {/* {console.log('inside return')}
            {console.log(cartdata)} */}
            {loading && <div className="loader"></div>}
            {cartdata.length>0 && <div><h2 style={{textAlign: 'center',marginTop:'10px',padding:'10px',backgroundColor:'#fa4251',color:'white'}}>Your Cart Items</h2>
                <div className="row row-cols-1 row-cols-md-4 g-0" >
                    
                    {cartdata.map((ele,i) => {
                        return (
                            <>
                                
                           
                            <div className="col">
                                
                                <div className="card h-100 p-4" key={ele.id}>
                                    
                                    <img src={ele.data.image} className="card-img-top" alt="Product img" height="250px" /><hr></hr>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace:'nowrap'}}>{ele.data.title}</h5>
                                        <div className="card-title">{ele.data.category}</div>
                                        {/* <p className="card-text">{ele.description}</p> */}
                                        <h5 className="card-title"><i class="fa-solid fa-indian-rupee-sign">{Math.floor(ele.data.price*30)}</i></h5><br></br>
                                        <div className="col-sm-6" style={{alignItems: "center"}}>
                                           <Link to='#' onClick={()=>{ele.quantity=ele.quantity+1}} ><span style={{display:'none'}}>{quantityarray[i]=ele.quantity}</span> <i class="fa-solid fa-plus"> </i></Link> &nbsp;&nbsp;{ele.quantity}&nbsp;&nbsp;<Link to='#' onClick={()=>{ele.quantity=ele.quantity-1}}><i class="fa-solid fa-minus"></i></Link>
                                           <span style={{display:'none'}}>{price=price+(ele.quantity*ele.data.price)}</span>
                                            </div><br></br>
                                        <div  style={{display:'flex',flexDirection:'row',marginLeft:'-10px'}}>
                                            <div className="col-sm-6">
                                                <Link to={`/products/${ele.data.id}`} id="vbtn" className="btn btn-outline-dark" >View</Link>
                                            </div>
                                            <div>
                                                {/* {removing && <button className='btn btn-danger' disabled>Processing..</button>} */}
                                            <button className='btn btn-danger' onClick={()=>removeCart(ele.id)}>Remove</button>
                                            </div>
                                            

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    })}
                </div>
              {cartdata.length>0 &&  <div className='price-cont'>
                <h3 style={{padding: '10px',marginRight:'20px'}}>Total price:<i class="fa-solid fa-indian-rupee-sign"></i>{Math.floor(price*30)}</h3>
                <button style={{marginLeft: '10px'}} className='btn btn-primary' onClick={()=>handleplaceorder(quantityarray,price*30)}>Place order</button>
                </div>}
            </div>
           
            
            }
            

            {cartdata.length===0 && <div > <div className='cart-msg' style={{ textAlign: 'center', color: 'black', padding: '20px' }}><span style={{textDecoration: 'underline'}}>Your Shopping Cart is empty</span><br></br>
            You have no items in your cart.To buy one or more items,please login and click <b>'Add To Cart'</b> next to the item.
            </div>
                    <img className="empty-cart" src="../images/cart1.png" alt="empty-cart"></img>
            </div>}
            <ToastContainer />
        </div>
    )
    
}

export default CartData

