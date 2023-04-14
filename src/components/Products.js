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
            {loading && <div className="loader"></div>}
            
           {!loading && <h1 className='prod-title'>TOP DEALS JUST FOR YOU</h1>}

        
            <div id="prod" className="row row-cols-1 row-cols-md-4 g-1">
            {product.map((ele)=>{
              return (<div className="col" style={{marginBottom:'10px'}}>
              <div className="card p-3" key={ele.id}>
              <img src={ele.image} className="card-img-top" alt="Product img" height="180px"/><hr></hr>
              <div className="card-body">
                <h5 className="card-title" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap'}}>{ele.title.substring(0,40)}</h5>
                <div className="card-title">{ele.category}</div>
                {/* <p className="card-text">{ele.description}</p> */}
                <h5 className="card-title"><i class="fa-solid fa-indian-rupee-sign">{Math.floor(ele.price*30)}</i></h5><br></br>
                {/* <Link to="#" className="btn btn-outline-primary">Add to cart</Link> */}
                <Link to={`/products/${ele.id}`} id="btn2" className="btn btn-outline-dark" >More Details<i class="fa-solid fa-angle-down"></i></Link>
              </div>
              </div>
            </div>
            )})}
            </div>

        </div>
    )

}