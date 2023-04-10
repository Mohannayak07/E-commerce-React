import React, {useEffect } from "react";
import { useState } from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import axios from 'axios'
import Orders from "./Orders";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import ClientsAdminPage from "../components/ClientsAdminPage";
// import DashboardProducts from "../components/DashboardProducts";
// import OrdersAdminPage from "../components/OrdersAdminPage";
import Addnewproducts from "./Addnewproducts";
function AdminDashboard() {
    const history=useHistory()
    const [loading, setLoading] = useState(false)
    const [products, setproducts] = useState()
    const [warning,setWarning]=useState(false)
    const [error, setError] = useState(false)
    const [newproduct, setNewproduct] = useState(false)
   
    
    const displayProducts = async () => {
        setNewproduct(false)
        setLoading(true);
        await axios.get('http://localhost:2000/products')
            .then(res => {

                // console.log(res.data);
                setproducts(res.data)
                setLoading(false);
                // setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }

   
    
// delete products

const deleteProduct=(id)=>{
    axios.delete(`http://localhost:2000/delete-product/${id}`)
    .then((res)=>{
        setWarning(true)
        displayProducts();
        setInterval(() => {
            setWarning(false)
        }, 2000);
    })
    .catch((err)=>{
        setError(true)
        setInterval(() => {
            setError(false)
        }, 2000);
    })
}
const handleorders=()=>{
    setNewproduct(false)
    history.push('/admin/orders')

}

    useEffect(()=>{
        displayProducts();
    },[])

    return (
        <Container>
             {loading && <div className='loader'></div>}
            {warning && <div className="alert alert-success" role="alert" style={{marginTop:'10px'}}>
                Product Deleted Successfully..
            </div>}
            {error && <div className="alert alert-success" role="alert" style={{marginTop:'10px'}}>
                Error in Deleting Product..
            </div>}
            <Tab.Container defaultActiveKey="products">
                <h3 style={{textAlign:'center',marginTop:'18px',marginBottom:'20px'}}>Admin Dashboard</h3>
                
                <Row>
                    <Col sm={3} className='admin-controls'>
                        <Nav variant="pills" className="flex-column" style={{cursor:'pointer',marginTop:'20px',marginBottom:'10px'}}>
                            <Nav.Item>
                                <Nav.Link eventKey="products" onClick={()=>displayProducts()}>Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="addproduct" onClick={()=>setNewproduct(true)}>Add Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders" onClick={()=>handleorders()}>Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients" onClick={()=>setNewproduct(false)}>Clients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    {newproduct &&
                        <Col sm={9}>
                            <div style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                                <Addnewproducts />
                            </div>
                        </Col>
                    }
                   
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                               {products && products.map((item,index)=>{
                                    //  console.log(item)
                                return (
                                   
                                    <div className="adminproductscontainer" key={index}>
                                        <Row>
                                        <Col sm={4}>
                                        <div><img src={item.imageurl}  height='100'></img></div>
                                        </Col>
                                        <Col sm={8}>
                                        <div style={{fontWeight:'700'}}>{item.name}</div>
                                        <div style={{marginTop:'6px'}}><i class="fa-solid fa-indian-rupee-sign"></i>{item.price}
                                        </div><br></br>
                                       
                                        <div><button className="btn btn-danger" onClick={()=>deleteProduct(item.pid)}>Delete</button>
                                        <button className="btn btn-warning" style={{marginLeft:'10px'}}>Update</button>
                                        </div>
                                        </Col>
                                        </Row>
                                       
                                        
                                    </div>
                                )
                               })}


                            </Tab.Pane>
                            {/* <Tab.Pane eventKey="orders">
                                <OrdersAdminPage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <ClientsAdminPage />
                            </Tab.Pane> */}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            
        </Container>
    );
}

export default AdminDashboard;
