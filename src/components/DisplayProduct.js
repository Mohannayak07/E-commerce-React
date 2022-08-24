import axios from "axios";
import '../App.css';
import SimilarProducts from "./SimilarProducts";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db } from '../FirebaseConfigs/Firebase'
import { addDoc, collection, getDocs,query,where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'


export default function DisplayProduct() {
    const { id } = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [items,setItems]=useState([])
    useEffect(() => {
        GetProduct();
    }, [])
    // GetuserDetails()
    
    function GetuserDetails(){
        const [user,setUser]=useState('')
        const usercoll=collection(db,"users")

        useEffect(() => {
            auth.onAuthStateChanged(userlogged=>{
                if(userlogged){
                    const getUser=async()=>{
                        const q=query(usercoll,where("email","==",userlogged.email))
                        const data= await getDocs(q)
                        console.log(q)
                        setUser(data.docs.map(doc => ({...doc.data(),id:doc.id})))
                    }
                    getUser()
                }
                else{
                    console.log("User not logged in")
                    setUser(null)
                }
            })
        },[])
        return user
    }
    const loggeduser= GetuserDetails()
    const AddtoCart=()=>{
        if(loggeduser){
            addDoc(collection(db,`cart-${loggeduser[0].email}`),
            {data, quantity:1}
        ).then(()=>{
            toast.success('Added to cart successfully')
        })
        .catch((err)=>{
            toast.error(err.message)
        })
        }
        else{
            toast.error('Please Login to add to cart')
        }
    }
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
            {!loading && <h2 className="disp-title">{category}</h2>}<br></br>
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
                        <button onClick={AddtoCart} className="btn btn-outline-dark">Add to cart<i className="fa fa-shopping-cart" ></i></button>

                        {/* </div> */}
                    </div>
                </div>
                <ToastContainer />
               
            </div>
            



        </>

    )
}