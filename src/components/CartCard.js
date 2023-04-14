import React, { useState } from 'react'
import {Link} from "react-router-dom"
function CartCard({ item }) {
  console.log(item[0])
  return (
    <div>
      <h2 style={{color:'#ffffff',textAlign:'center',padding:'20px',backgroundColor:'#fa4251'}}>Your Cart Items</h2><br></br>
      {console.log('inside cartcard')}
      {console.log(typeof(item))}

      <div id="prod" className="row row-cols-1 row-cols-md-5 g-1">
        {item.map((ele) => {
          return (<div className="cartcard">
            <div className="card1 p-3" key={ele.id}>
              <img src={ele.image} className="card-img" alt="Product img" height="250px" /><hr></hr>
              <div className="card-body">
                <h5 className="card-title">{ele.title.substring(0, 40)}</h5>
                <div className="card-title">{ele.category}</div>
                {/* <p className="card-text">{ele.description}</p> */}
                <h5 className="card-title">${ele.price}</h5>
                {/* <Link to="#" className="btn btn-outline-primary">Add to cart</Link> */}
                <Link to={`/products/${ele.id}`} id="btn2" className="btn btn-outline-dark" >More Details</Link>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartCard