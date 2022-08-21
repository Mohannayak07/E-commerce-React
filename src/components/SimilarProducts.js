import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom"
export default function SimilarProducts({category}) {
    const [loading, setLoading] = useState(false)
    const [items,setItems]=useState([])
    useEffect(() =>{
        filter(category)
    },[])
    const filter = async (category) => {
        console.log(category)
        setLoading(true);
        await axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => {
                setItems(res.data)
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
        }
        return (
            <div> 
                {loading && <div className="loader1"></div>}
                <h1>Similar Products</h1>
                <div id="prod1" className="row row-cols-1 row-cols-md-4 g-4">
                {items.map((ele)=>{
              return (<div className="similar-product">
        
              <div className="card h-80 p-3" key={ele.id}>
              <img src={ele.image} className="card-img-top" alt="Product img" height="250px"/><hr></hr>
              <div className="card-body">
                <h5 className="card-title">{ele.title.substring(0,40)}</h5>
                <div className="card-title">{ele.category}</div>
                {/* <p className="card-text">{ele.description}</p> */}
                <h5 className="card-title">${ele.price}</h5>
                <Link className="btn btn-outline-primary" to="/">Add to cart</Link>
                <Link to={`/products/${ele.id}`} id="vbtn" className="btn btn-outline-dark" >View</Link>
              </div>
              </div>
            </div>
            )})}
            </div>

            </div>
        )
    }


