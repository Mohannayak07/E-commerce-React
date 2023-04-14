import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button, FormLabel } from "react-bootstrap";
import {useHistory} from "react-router-dom" 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Addnewproducts() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [imageurl, setImageurl] = useState([]);
    const history = useHistory();
    const [productData,setProductData]=useState({
      name,
      description,
      price,
      category,
      imageurl,

    });
    const [loading, setLoading] = useState(false)
    // const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    const isfilled=()=>{
      if (!name || !description || !price || !category) {
        return false
      }
      else{
        return true
      }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category) {
            return alert("Please fill out all the fields");
        }
        else{
          setProductData({
            name:name,
            description:description,
            price:price,
            imageurl:imageurl,
            category:category
          })
        }
        setLoading(true)
        axios.post('http://localhost:2000/add-new-product',{
          name:name,
          description:description,
          price:price,
          imageurl:imageurl,
          category:category
        }).then((res)=>{
          setLoading(false)
          
            toast.success('Added successfully')
            

          setName("")
          setCategory("")
          setDescription("")
          setImageurl("")
          setPrice("")
          // setInterval(() => {
          //   history.push('/')
          // }, 2000);
          
        })
        .catch((err)=>{
          setLoading(false)
          
          toast.error('Failed to Add')
        })
       
    }

    
       
    

    return (
        <Container>
           {loading && <div className="loader"></div>}
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%",paddingLeft:'12px',borderRadius:'6px' }} onSubmit={handleSubmit}>
                        <h4 className="mt-4">Add product</h4>
                        {/* {isSuccess && <Alert variant="success">Product created with succcess</Alert>} */}
                        {/* {isError && <Alert variant="danger">{error.data}</Alert>} */}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price(Rs)</Form.Label>
                            <Form.Control type="number" placeholder="Price (Rs)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="technology">technology</option>
                                <option value="tablets">tablets</option>
                                <option value="phones">phones</option>
                                <option value="laptops">laptops</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            
                                <FormLabel>Upload Images url</FormLabel>
                                <Form.Control type="text" placeholder="url" value={imageurl} required onChange={(e) => setImageurl(e.target.value)} />
                           
                           
                        </Form.Group>

                        <Form.Group style={{paddingBottom:'14px'}}>
                          {isfilled() ? <Button type="submit">Add Product</Button> : <Button type="submit" disabled>Add Product</Button>}
                            
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container">
                      <img src="../images/intro2.jpg" alt="intro" style={{width:'100%',height:'100%',marginLeft:'11px'}}></img>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default Addnewproducts;
