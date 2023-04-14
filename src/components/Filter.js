import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import serviceapi from "./serviseapi";
import '../Filter.css'

export default function Filter() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [serviceData, setServiceData] = useState(serviceapi);
  const [latestproducts, setLatestproducts] = useState()
  const filter = async (item) => {
    // const item="jewelery"
    setLoading(true);
    await axios.get(`https://fakestoreapi.com/products/category/${item}`)
      .then(res => {
        setItems(res.data)
        // console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const latest = async () => {
    setLoading(true);
    await axios.get('http://localhost:2000/products')
      .then(res => {

        console.log(res.data);
        setLatestproducts(res.data)
        setLoading(false);
        // setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      })
  }
  useEffect(() => {
    latest();
  }, [])
  return (
    <>
      <div className='row row-cols-1 row-cols-md-5 g-4' id="fform">
        <div className="card mt-6">
          <img src="../images/mens2.jpg" alt="mens wear" className='card-img-top' id="fimg1"></img>
          <div className='card-body'><button id="fbtn" className="btn btn-outline-dark" onClick={() => filter("men's clothing")} ><h5 className="card-title">Mens Wear</h5></button></div>

        </div>
        <div className="card">
          <img src="../images/women1.jpg" alt="mens wear" className='card-img-top' id="fimg2"></img>
          <div className='card-body'><button id="fbtn1" className="btn btn-outline-dark" onClick={() => filter("women's clothing")} ><h5 className="card-title">Womens Wear</h5></button></div>

        </div>
        <div className="card">
          <img src="../images/jewelery1.jpg" alt="mens wear" className='card-img-top' id="fimg3"></img>
          <div className='card-body'><button id="fbtn" className="btn btn-outline-dark" onClick={() => filter("jewelery")}><h5 className="card-title">Jewelery</h5></button></div>

        </div>
        <div className="card">
          <img src="../images/ele1.jpg" alt="mens wear" className='card-img-top' id="fimg4"></img>
          <div className='card-body'><button id="fbtn" className="btn btn-outline-dark" onClick={() => filter("electronics")}><h5 className="card-title">Electronics</h5></button></div>

        </div>

      </div>
      {loading && <div className='loader'></div>}
      <div id="prod1" className="row row-cols-1 row-cols-md-4 g-4">

        {items.map((ele) => {
          return (<div className="col">

            <div className="card p-3" key={ele.id}>
              <img src={ele.image} className="card-img-top" alt="Product img" height="180px" width="80%" /><hr></hr>
              <div className="card-body">
                <h5 className="card-title" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap'}}>{ele.title.substring(0, 40)}</h5>
                <div className="card-title">{ele.category}</div>
                {/* <p className="card-text">{ele.description}</p> */}
                <h5 className="card-title"><i class="fa-solid fa-indian-rupee-sign">{Math.floor(ele.price*30)}</i></h5>
                {/* <Link className="btn btn-outline-primary">Add to cart</Link> */}
                <Link to={`/products/${ele.id}`} id="vbtn" className="btn btn-outline-dark" >More Details<i class="fa-solid fa-angle-down"></i></Link>
              </div>
            </div>
          </div>
          )
        })}
      </div>
      
      <h2 style={{ color: '#2d2d2d', textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold' }}>Latest Arrivals</h2>
      <div className='latest-products'>
       
          {latestproducts && latestproducts.map((data,index)=>{
            return (
            <div className="latest-container" key={index}>
                <div style={{padding:'16px',marginLeft:'6px',}}>
                  
                  <center>

                  <div style={{margin:'0 auto'}}><img src={data.imageurl} height='160'></img></div>
                  <hr/>
                  </center>
                  <div style={{fontWeight:'700'}}>{data.name}</div>
                  <div style={{backgroundColor:'yellow',width:'28%',paddingLeft:'6px',borderRadius:'6px',marginTop:'4px'}}>{data.category}</div><br/>
                  <span style={{color:'black',fontWeight:'600',marginRight:'16px',marginTop:'-6px'}}><i class="fa-solid fa-indian-rupee-sign">{data.price}</i></span>
                  {/* <Link to={`/products/${data.id}`} className="btn btn-outline-dark" >view<i class="fa-solid fa-angle-down"></i></Link> */}
                </div>
                
           
           
          </div>
            )
          })}
      </div>
      
      <div className="banner-sec" id="banner">
        <h4>Repair Services</h4>
        <h2>Up to<span> 70% Off</span> On all Accessories</h2>
        <button id="bannerbutton">Explore More</button>
      </div>
      <section id="smbanner" className='banner-sec'>
        <div className='banner-box'>
          <h4>Crazy Deals</h4>
          <h2>Buy 1 get 1 Free</h2>
          <span style={{ color: '#fff' }}>The best classic dress is on sale at BrandFactory</span>
          <Link className="bann-button" to={'/products'}>Learn More</Link>
        </div>
        <div className='banner-box2'>
          <h4>Spring/Summer</h4>
          <h2>Upcoming Season</h2>
          <span style={{ color: '#fff' }}>The best classic dress is on sale at BrandFactory</span>
          <Link className="bann-button" to={'/products'}>Learn More</Link>
        </div>
      </section>
      <section className="news-letter">
        <div className="news-text">
          <h4>Sign Up For Newsletter</h4>
          <p>Get Email updates about our latest shop and <span>Special Offers.</span></p>
        </div>
        <div className='form' id="subscribe-email">
          <input type="email" placeholder='enter your email address'></input>
          <button>Signup</button>

        </div>
        
      </section>
      <h2 style={{ color: '#2d2d2d', textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold',marginTop:'20px' }}>Our Services</h2>
      <div className="row" id="serv-container">
        {serviceData.map((curElem) => {
          const { id, title, info } = curElem;
          return (
            <>
              <div
                className="col-11 col-lg-4 col-xxl-4 work-container-subdiv"
                key={id}>
                <div className='about-container'>
                  <h2 className="sub-heading">{title}</h2>
                  <p className="main-hero-para">{info}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>

    </>
  )
}
