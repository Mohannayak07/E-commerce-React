import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Filter from "./Filter";

export default function Home() {
    
       
    return (
        <div>
            
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="../images/img1.jpg"
                        alt="First slide"
                        id="Himg1"
                    />
                    <Carousel.Caption>
                        <h3 id="hh1">Welcome To BrandFactory</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="../images/head2.jpg"
                        alt="send slide"
                        id="Himg2"
                    />
                    <Carousel.Caption>
                        <h3 id="hh2">Women's Wear</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="../images/mens.jpg"
                        alt="send slide"
                        id="Himg3"
                    />
                    <Carousel.Caption>
                        <h3 id="hh2">Mens Wear</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="../images/freedel.jpg"
                        alt="send slide"
                        id="Himg3"
                    />
                    <Carousel.Caption>
                        <h3 id="hh2">Fast and Free Delivery</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                
            </Carousel>

            <h2 style={{textAlign:"center",padding:'4px',marginTop:'8px',fontWeight:'bold',color:'#2d2d2d',textDecoration:'underline'}}>Featured Categories...</h2>
           <Filter></Filter>
        </div>
        
    )
}