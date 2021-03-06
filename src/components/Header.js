import React from "react"
import {Link} from "react-router-dom"
export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-light shadow">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold fs-4" href="/home">Brand <span>Factory</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/"><i className='fa fa-home' ></i>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to='/about'>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                    
                        <Link className="btn btn-dark me-2" type="submit" to="/login">Login&nbsp;<i className="fa-solid fa-right-to-bracket"></i></Link>
                        <Link className="btn btn-dark me-2" type="submit" to="/signup">SignUp</Link>
                        <Link to="/cart" className="btn btn-dark me-2" type="submit">Cart<i className="fa-solid fa-cart-shopping"></i></Link>
                    
                </div>
            </div>
        </nav>
    )
}