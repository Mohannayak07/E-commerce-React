import React, { useState, useEffect } from 'react'
import '../Payments.css'
import { db } from '../FirebaseConfigs/Firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import {Link} from "react-router-dom"
export default function Payment() {
  const [data, setData] = useState({
    'username': '',
    'cardnumber': '',

  })
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
  console.log(cartdata)
  var price=0;
  return (

    <div className="card" id="check-out">

      <div className="card-body">
        <div className="row upper">
          <div className='col-md-4'>
            <Link to='/cartdata' style={{color:'black',fontweight:'bold',textDecoration:'none'}}><i className="fa fa-check-circle-o"></i> Shopping bag</Link>
          </div>
          <div className='col-md-4'>
            <span><i className="fa fa-check-circle-o"></i> Order details</span>
          </div>
          <div className='col-md-4'>
            <span id="payment" style={{color:'black',fontweight:'bold'}}>Payment</span>
          </div>
        </div><br></br><hr></hr>
        <div className="row">
          <div className="col-md-7">
            <div className="left-border">
              <div className="row">

                <div className="row">
                  <div className="col-md-7"> <span style={{ color: 'black', fontWeight: 'bold' }}>Payment</span></div>
                  < div className="col-md-5">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                    <img src="https://img.icons8.com/color/48/000000/maestro.png" />
                  </div>
                </div>
              </div>
              <form>
                <span style={{ color: 'black' }}>Cardholder's name:</span><br></br>
                <input placeholder="card holder name" /><br></br>
                <span style={{ color: 'black' }}>Card Number:</span><br></br>
                <input placeholder="0125 6780 4567 9909" />
                <div className="row"><br></br>
                  <div className="col-4" ><span style={{ color: 'black' }}>Expiry date:</span>
                    <input id="cvv" placeholder="YY/MM" />
                  </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="col-4"><span style={{ color: 'black' }}>CVV:</span>
                    <input id="cvv" placeholder="123"/>
                  </div>
                </div>
                <input type="checkbox" id="save_card" className="align-left" />
                <label for="save_card" style={{ color: 'black' }}>Save card details to wallet</label>
              </form>
            </div>
          </div>
          <div className="col-md-5">
            <div className="right-border">
              <div className="header">Order Summary</div>
              <p>{cartdata.length} items</p>
              
              { cartdata && cartdata.map((ele, i) => {
                return (
                  <>
                    <div className="row item" key={ele.id}>
                      <div className="col-4 align-self-center"><img className="img-fluid" src={ele.data.image} /></div>
                      <div className="col-8">
                      <div className="row text-muted">{ele.data.title.substring(0,28)}</div>
                        <div className="row"><b><i class="fa-solid fa-indian-rupee-sign"> {Math.floor(ele.data.price*30)}</i></b></div>
                       
                        <div className="row">Qty:{ele.quantity}</div>
                        <span style={{display:'none'}}>{price=price+(ele.quantity*ele.data.price)}</span>
                      </div>
                    </div><br></br><hr></hr>
                  </>
                )
              })}

              
              <div className="row lower">
                <div className="col text-left">Subtotal</div>
                <div className="col text-right"><i class="fa-solid fa-indian-rupee-sign"> {Math.floor(price*30)}</i></div>
              </div>
              <div className="row lower">
                <div className="col text-left">Delivery</div>
                <div className="col text-right" style={{color:'green',fontweight:'bold'}}>Free</div>
              </div>
              <div className="row lower">
                <div className="col text-left"><b>Total to pay</b></div>
                <div className="col text-right"><b><i class="fa-solid fa-indian-rupee-sign"> {Math.floor(price*30)}</i></b></div>
              </div>
              <div className="row lower">
                <div className="col text-left"><a href="#"><u>Add promo code</u></a></div>
              </div><br></br>
              <button className="btn btn-dark">Place order</button>
               <p className="text-muted text-center">Complimentary Shipping & Returns</p>
            </div>
          </div>
        </div>
      </div>

      <div>
      </div>
    </div>
  )
}
