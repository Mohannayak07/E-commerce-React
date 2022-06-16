import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export default function DisplayProduct() {
    const { id } = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        GetProduct();
    }, [])
    const GetProduct = async () => {
        await axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                setData(res.data)
                console.log(res.data);

                setLoading(false)
            })
    }
    const { category, description, image, price, rating, title } = data

    return (
        <>
            {loading && <div className="loader1"></div>}
            <h1>Display Product Page..</h1><br></br>
            <div id="dcontainer" className="container shadow-lg">
                <div className="row">
                    <div className="col-md-5">
                        <img src={image} className="img-fluid rounded-start" alt={title} height="400px" width="400px" />
                    </div>
                    <div className="col-md-5">
                        {/* <div className="card-body"> */}
                        <h3 className="card-title">{title}</h3>
                        <div className="card-title fw-bold">{category}</div>
                        <p className="card-text">{description}</p>
                        <h5 className="card-title" id="price">Price: ${price}</h5>
                        <h5 className="card-title mt-2" id="rating">Rating: {rating && data.rating.rate}&nbsp;<i className="fa-regular fa-star"></i></h5><br></br>
                        <Link to='' className="btn btn-outline-dark">Add to cart<i className="fa fa-shopping-cart" ></i></Link>

                        {/* </div> */}
                    </div>
                </div>
            </div>



        </>

    )
}