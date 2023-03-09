import axios from "axios";
import '../App.css';
import SimilarProducts from "./SimilarProducts";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db } from '../FirebaseConfigs/Firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth } from '../FirebaseConfigs/Firebase'
import Header from './Header'

export default function DisplayProduct() {
    const { id } = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false);
    const [items, setItems] = useState([])
    useEffect(() => {
        GetProduct();
    }, [])
    // GetuserDetails()

    function GetuserDetails() {
        const [user, setUser] = useState('')
        const usercoll = collection(db, "users")

        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    const getUser = async () => {
                        const q = query(usercoll, where("email", "==", userlogged.email))
                        const data = await getDocs(q)
                        // console.log(q)
                        setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    }
                    getUser()
                }
                else {
                    console.log("User not logged in")
                    setUser(null)
                }
            })
        }, [])
        return user
    }
    const loggeduser = GetuserDetails()
    const AddtoCart = () => {
        if (loggeduser) {
            addDoc(collection(db, `cart-${loggeduser[0].email}`),
                { data, quantity: 1 }
            ).then(() => {

                toast.success('Added to cart successfully')
                window.location.reload(false);
            })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
        else {
            toast.error('Please Login to add to cart')
        }


    }

    const GetProduct = async () => {
        setLoading(true)
        await axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                setData(res.data)
                console.log(res.data);

                setLoading(false)
                setFetched(true)
            })
    }
    const { category, description, image, price, rating, title } = data


    return (
        <>
            {loading && <div className="loader1"></div>}
            {fetched && <h2 className="disp-title">{category}</h2>}<br></br>
            {fetched &&
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
                            <h5 className="card-title" style={{ color: '#ff3700' }}>Price: <i class="fa-solid fa-indian-rupee-sign"></i>{Math.floor(price * 30)}</h5>
                            <h5 className="card-title mt-2" id="rating">Rating: {rating && data.rating.rate}<i class="fa-regular fa-star"></i>&nbsp;({rating && data.rating.count})</h5><br></br>
                            <button onClick={AddtoCart} className="btn btn-outline-dark">Add to cart<i className="fa fa-shopping-cart" ></i></button>
                            <br></br><br></br><p style={{ color: 'green' }}>Pay on delivery is available<br></br>Easy 30 days returns and exchanges available</p>
                            <img style={{ width: '15%' }} src='https://t3.ftcdn.net/jpg/02/96/05/46/240_F_296054631_1SbautqneleQG40Ewtkice8RkM4bTNsK.jpg' alt="alt"></img>&nbsp;&nbsp;
                            <img style={{ width: '18%' }} src='https://t3.ftcdn.net/jpg/03/50/57/72/240_F_350577297_LnBv07VuyrK5MIFWr0OXRNlUHuxQOIrZ.jpg' alt='quality-check'></img>
                            {/* </div> */}
                        </div>
                    </div>
                    <ToastContainer />

                </div>}




        </>

    )
}