import React, { useEffect, useState } from "react";
import axios from "axios";
const Footer = () => {
  const [count,setCount]=useState(0)
  useEffect(()=>{
    axios.get('https://api.countapi.xyz/hit/brandfactory/count').then(res=>{
      setCount(res.data.value);
    })

  },[])
  return (
    <>
      <footer>
        <div className="container" id="footer-container" >
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="col-6 col-lg-3">
                  <h2 className="footer-head">Company</h2>
                  <ul>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2 className="footer-head">Support</h2>
                  <ul>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2 className="footer-head">Services</h2>
                  <ul>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2 className="footer-head">Follow Us</h2>
                  <div className="row">
                    <div className="col-3 mx-auto">
                      <i class="fab fa-facebook-f fontawesome-style"></i>
                    </div>
                    <div className="col-3 mx-auto">
                      <a
                        href="https://www.instagram.com"
                        target="#">
                        <i class="fab fa-instagram fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                      <i class="fab fa-youtube fontawesome-style"></i>
                    </div>
                    <div className="col-3 mx-auto">
                      <i class="fab fa-twitter fontawesome-style"></i>
                    </div>
                  </div>
                </div>
              </div>
             <hr/>
              <div className="row">
                <div className="col-md-6">
                <p className=" main-hero-para text-center w-100">
                ©Copyright @ 2022 All rights reserved.
                </p>
                </div>
                <div className="col-md-6">
                <p className="col-md-6"><i class="fa-regular fa-eye">Visitors count :&nbsp;</i><span style={{color:'white',fontWeight:'bold'}}>{count}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;