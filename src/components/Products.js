import React, { useEffect } from "react";
import axios from "axios"
import '../App.css';
import { useState } from "react";
import {Link} from "react-router-dom"

export default function Products() {
    const [product, setProduct] = useState([])
    // const [filter, setFilter] = useState(product)
    const [loading,setLoading]=useState(true)
    useEffect(() => {

        getProduct()
    }, [])
    const getProduct = async () => {
        await axios.get('https://fakestoreapi.com/products')
        .then((res)=>{
            console.log(res.data);
            setProduct(res.data)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    


    return (
        <div>
            {loading && <h1>Loading please wait...</h1>}
            <h1>Products Page...</h1>
            <div className="row row-cols-1 row-cols-md-4 g-4">
            {product.map((ele)=>{
              return (<div className="col">
              <div className="card h-100 p-3" key={ele.id}>
              <img src={ele.image} className="card-img-top" alt="Product img" height="250px"/><hr></hr>
              <div className="card-body">
                <h5 className="card-title">{ele.title.substring(0,40)}</h5>
                <div className="card-title">{ele.category}</div>
                {/* <p className="card-text">{ele.description}</p> */}
                <h5 className="card-title">${ele.price}</h5>
                <Link to="#" className="btn btn-outline-primary">Add to cart</Link>
                <Link to={`/products/${ele.id}`} id="btn2" className="btn btn-outline-dark" >View Product</Link>
              </div>
              </div>
            </div>
            )})}
            </div>

        </div>
    )

}