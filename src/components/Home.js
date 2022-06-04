import React from "react";
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="../img1.jpg"
                        alt="First slide"
                        id="Himg1"
                    />
                    <Carousel.Caption>
                        <h3>Welcome To BrandFactory</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="../mens.jpg"
                        alt="send slide"
                        id="Himg2"
                    />
                    <Carousel.Caption>
                        <h3>Mens Wear</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h1>Home Page...</h1>
        </div>
    )
}