import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'
function Orders() {
    const [loading,setLoading] = useState(false)
    const [ordersdata,setOrdersdata]=useState([])
    const displayorders = async () => {
        setLoading(true);
        await axios.get('http://localhost:2000/orders')
            .then(res => {

                console.log(res.data);
                setOrdersdata(res.data)
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }
    const handleStatus=(e,orderid)=>{
        const data={
            status: e.target.value,
            orderid: orderid
        }
        axios.put('http://localhost:2000/updatestatus',data).then((res)=>{
            // console.log(res)
            toast.success('Status updated successfully')
            displayorders()
        }).catch((err)=>{
            console.log(err)
            toast.error('Error updating')
        })
        
    }
    useEffect(()=>{
        displayorders()
    },[])
  return (
    <div style={{width: '90%',margin: '0 auto',padding: '10px',marginTop: '20px',marginBottom: '300px',}}>
       <Link to={'/admin'} style={{color:'black'}}><i class="fa-solid fa-arrow-left" style={{fontSize:'22px'}}></i></Link> 
        <h4 style={{textAlign:'center'}}>Manage orders</h4><br></br>
        <div style={{background:'white',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',}}>
        <table className="table table-hover" style={{padding:'20px'}}>
        <thead style={{background:'#fa4251',color:'white',padding:'10px'}}>
        <tr >
            <th scope="col">Order id</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Total Price</th>
            <th scope="col">Status</th>
        </tr>
        </thead>
        <tbody>
            {ordersdata.map((item,i)=>{
                var totalprice=0
                return <tr key={i}>
                <th scope="row">{item.orderid}</th>
                <td>{item.email}</td>
                <td>{item.address.username}</td>
                    {item.cartdata.map((ele,index)=>{
                        totalprice+=(ele.data.price*80)*item.quantityarray[index]
                       
                    })}
                <td>
                <i class="fa-solid fa-indian-rupee-sign"></i>&nbsp;{totalprice}
                </td>
                <td>
                    <select name="status" onChange={(e)=>handleStatus(e,item.orderid)} className="form-select" aria-label="Default select example">
                    <option value="Shipped">{item.status}</option>
                       {item.status!=="Shipped" && <option value="Shipped">Shipped</option>} 
                       {item.status!=="Arrived at nearent hub" && <option value="Arrived at nearent hub">Arrived at nearent hub</option>} 
                       {item.status!=="out for delivery" && <option value="out for delivery">out for delivery</option>} 
                       {item.status!=="Delivered" && <option value="Delivered">Delivered</option>} 
                        


                    </select>
                </td>
                
              </tr>
            })}
            </tbody>
            </table>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Orders