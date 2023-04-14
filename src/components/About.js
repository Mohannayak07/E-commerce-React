import React, { useState } from "react";
import serviceapi from "./serviseapi";
export default function About(){
    const [serviceData, setServiceData] = useState(serviceapi);
    return (
      <>
        <section className="service-main-container">
          <div className="container service-container">
            <h1 className="main-heading text-center fw-bold">
              About Us
              
              </h1>
              <br></br>
              <br></br>
              {/* <br></br> */}
              <p className="fw-bold text-secondary" style={{fontSize:'18px'}}>
              We believe that best way deliver a <span style={{color:'#fa4251'}}>great user experience</span> is by deeply understanding what people want to ove.Then deliver the featires,mesaages,and content thar are most helpful, relevant and timely. That's what makes users happy and loyal. Our company strives to deliver the tools ans support that helps companies deliver that great experience.<span style={{color:'#fa4251'}}>We want our customers to be happy</span>.so then our customers to be happy,so then our customers are happy and that makes us happy</p>
            
            <br></br>
            <br></br>
            <br></br>
            <div className="row">
              {serviceData.map((curElem) => {
                const { id,title, info } = curElem;
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
          </div>
        </section>
      </>
    );
  };
  