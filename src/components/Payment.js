import React, { useState, useEffect } from 'react'
import '../Payments.css'
import Ordersuccess from './Ordersuccess'
import { db } from '../FirebaseConfigs/Firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import {Link} from "react-router-dom"
import axios from "axios"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ToastContainer, toast } from 'react-toastify'
export default function Payment() {
  const history=useHistory()
  const [orderdata,setOrderData]=useState([]);
  const [processing,setProcessing]=useState(false)
  var quantityarray=[]
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
const loggeduser= GetuserDetails()

  const [data, setData] = useState({
    'username': '',
    'cardnumber': '',
    'StreetAddress': '',
    'City': '',
    'State': '',
    'PinCode': '',

  })
  const [payment,setPayment]=useState(false);
  const handlechange = (e) => {
    const name=e.target.name
    const value=e.target.value
    setData({...data,[name]:value})
  }

  const handlebutton = async(e) => {
    e.preventDefault();
    setProcessing(true)
    const orderinfo = {
      cartdata: cartdata,
      quantityarray: quantityarray,
      address:data,
      email:loggeduser[0].email,
      orderId:Math.floor(Math.random() * 90000) + 10000,
    }
   
    setOrderData(orderinfo)

   await axios.post('http://localhost:2000/placeorder',orderinfo).then((res)=>{
      console.log('success');
      setProcessing(false)
      setTimeout(()=>{
        setProcessing(false)
        history.push('/order-success',{data:orderinfo.orderId})
        
      },1000)
      
      toast.success('Order placed successfully')
    }).catch((err)=>{
      console.log(err);
      setProcessing(false)
      toast.error('Something went wrong.')
    })
  }

  const [quantity, setQuantity] = useState(1);
  function GetcartDetails() {
    const [user, setUser] = useState('')
    const usercoll = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {

          const getUser = async () => {
            const q = query(collection(db, `cart-${userlogged.email}`))
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
  const cartdata = GetcartDetails()
  // console.log(cartdata)
  var price=0;
  return (

    <div className="card" id="check-out">

      <div className="card-body">
        <div className="row upper" style={{marginLeft:'50px'}}>
          <div className='col-md-4'>
            <Link to='/cartdata' style={{color:'black',fontweight:'bold',textDecoration:'none'}}><i className="fa-solid fa-circle-check"></i> Shopping bag</Link>
          </div>
          <div className='col-md-4'>
            <span><i className="fa fa-check-circle-o"></i> Order details</span>
          </div>
          <div className='col-md-4'>
            <span id="payment" style={{color:'black',fontweight:'bold'}}>Payment</span>
          </div>
        </div><br></br><hr></hr>
        
        
        <div className="row">

          <div className="col-md-5">
            <div className="right-border">
              <div className="header">Order Summary</div>
              <p>{cartdata.length} items</p>

              {cartdata && cartdata.map((ele, i) => {
                quantityarray[i]=1
                return (
                  <div key={ele.id}>
                    <div className="row item" key={ele.id}>
                      <div className="col-4 align-self-center"><img className="img-fluid" src={ele.data.image} /></div>
                      <div className="col-8">
                        <div className="row text-muted">{ele.data.title.substring(0, 28)}</div>
                        <div className="row"><b><i class="fa-solid fa-indian-rupee-sign"> {Math.floor(ele.data.price * 30)}</i></b></div><br></br>

                        <div className="row" >
                        <QuantityComponent i={i} quantityarray={quantityarray}/>
                         
                        </div>
                        <span style={{ display: 'none' }}>{price = price + (ele.quantity * ele.data.price)}</span>
                      </div>
                    </div><br></br><hr></hr>
                  </div>
                )
              })}


              <div className="row lower">
                <div className="col text-left">Subtotal</div>
                <div className="col text-right"><i class="fa-solid fa-indian-rupee-sign"> {Math.floor(price * 30)}</i></div>
              </div>
              <div className="row lower">
                <div className="col text-left">Delivery</div>
                <div className="col text-right" style={{ color: 'green', fontweight: 'bold' }}>Free</div>
              </div>
              <div className="row lower">
                <div className="col text-left"><b>Total to pay</b></div>
                <div className="col text-right"><b><i class="fa-solid fa-indian-rupee-sign"> {Math.floor(price * 30)}</i></b></div>
              </div>
              <div className="row lower">
                <div className="col text-left"><a href="#"><u>Add promo code</u></a></div>
              </div><br></br>
              {data.username!=='' && data.StreetAddress!=='' && data.City!=='' && data.State!=='' && data.PinCode!=='' && !processing && <button className="btn btn-dark" onClick={(e) => handlebutton(e)}>Place order</button>}
              {data.username=='' || data.StreetAddress=='' || data.City=='' || data.State=='' || data.PinCode=='' && <button className="btn btn-dark" disabled>Place order</button>}
              {processing && <button className="btn btn-dark" disabled>Processing...</button>}
              <p className="text-muted text-center">Complimentary Shipping & Returns</p>
            </div>
          </div>

              {/* ******* */}

          <div class="col-md-7 payment-card">


            <div className='payment' style={{marginLeft:'20px'}}>
              <h6 className="text-uppercase">Payment details</h6>
              <div className="inputbox mt-3">
                <span style={{color:'black'}}>Name on card</span> <input type="text" name="username" className="form-control" required="required" placeholder='Name on card' onChange={(e)=>handlechange(e)}/>  </div>
            </div>
            <div className="row" style={{marginLeft:'10px'}}>

              <div className="col-md-5">

                <div className="inputbox mt-2"><i class="fa fa-credit-card"></i> <span style={{color:'black'}}>Card Number</span>  <input type="text" name="cardnumber" className="form-control" required="required" placeholder='1234 1234 1234 1234' onChange={(e)=>handlechange(e)}/>


                </div>


              </div>

              <div className="col-md-7">
                <div className="d-flex flex-row">
                  <div className="mt-2 mr-2" style={{ width: '40%' }}> <span style={{color:'black'}}>Expiry</span><input type="text" name="name" className="form-control" required="required" placeholder='MM/YY'/> </div>&nbsp;&nbsp;
                  <div className="mt-2 mr-2" style={{ width: '40%' }}> <span style={{color:'black'}}>CVV</span><input type="text" name="name" className="form-control" required="required" placeholder='***'/>  </div>
                </div>
              </div>


            </div>

            <div class="mt-4 mb-4" style={{marginLeft:'20px'}}>

<h6 class="text-uppercase">Billing Address</h6>


<div class="row mt-3">

    <div class="col-md-6">

        <div class="inputbox mt-3 mr-2"><span style={{color:'black'}}>Street Address</span> <input type="text" name="StreetAddress" class="form-control" required="required" onChange={(e)=>handlechange(e)}/>  </div>
        

    </div>


     <div class="col-md-6">

        <div class="inputbox mt-3" style={{width:'80%'}}> <span style={{color:'black'}}>City</span><input type="text" name="City" class="form-control" required="required" onChange={(e)=>handlechange(e)}/>  </div>
        

    </div>


    

</div>


<div class="row mt-2">

    <div class="col-md-6">

        <div class="inputbox mt-3 mr-2"> <span style={{color:'black'}}>State</span><input type="text" name="State" class="form-control" required="required" onChange={(e)=>handlechange(e)}/>  </div>
        

    </div>


     <div class="col-md-6">

        <div class="inputbox mt-3" style={{width:'80%'}}> <span style={{color:'black'}}>Pin code</span><input type="text" name="PinCode" class="form-control" required="required" onChange={(e)=>handlechange(e)}/>  </div>
        

    </div>

    <br></br><br/>  
    

</div>

</div>

          </div>
          {/* *********** */}



      </div>      
      {/* -----row */}

      


      </div>

      <div>
      </div>
      <button className='btn btn-dark' style={{width:'60%',margin:'0 auto'}}>Pay <i class="fa-solid fa-indian-rupee-sign"></i> {Math.floor(price * 30)}</button>
      <ToastContainer />
    </div>
  )
}

function QuantityComponent(props) {
  const [quantity, setQuantity] = useState(1)
  const handlePlus = (i) => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
      props.quantityarray[i] = quantity + 1
    }

  }
  const handleMinus = (i) => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      props.quantityarray[i] = quantity + 1
    }
  }
  console.log(props.quantityarray)
  return (
    <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
      {quantity === 0 ? <div >
        <button disabled style={{ border: 'none', background: 'transparent' }}><i class="fa-solid fa-minus"> </i></button>
      </div>
        : <div onClick={() => handleMinus(props.i)}>
          <i class="fa-solid fa-minus"> </i>
        </div>}
      <div>
        {quantity}
      </div>
      {quantity === 10 ? <div >
        <button disabled style={{ border: 'none', background: 'transparent' }}><i class="fa-solid fa-plus"> </i></button>
      </div>
        : <div onClick={() => handlePlus(props.i)}>
          <i class="fa-solid fa-plus"> </i>
        </div>}

    </div>
  )
}
