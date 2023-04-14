import React, { useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
function Ordersuccess() {
  const history = useHistory()
    const orderId=useLocation().state.data
    const [loading,setLoading] = useState(true)
   setTimeout(()=>{
    setLoading(false)
   },2000)
  const redirect=()=>{
    history.push('/profile')
  }
  return (
    <>
    {loading && <div className="loader"></div>}
   {!loading &&  <div style={{background:'white',width: '50%',margin: '0 auto',padding: '14px',marginTop: '50px',marginBottom: '250px',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
        
        <div style={{marginTop:'10px'}}>
            <center>
            <i className="fa-regular fa-circle-check fa-beat" style={{color:'#00FF00',fontSize:'30px'}}></i>
            </center>
        
        </div>
        <div style={{textAlign:'center',color:'#0aec0a',marginTop:'10px',fontSize:'18px'}}>
                Order Placed successfully <br>
                </br>
                <p style={{color:'black'}}>#Order ID : {orderId}</p>           
        </div>
        <center>
            <button className='btn btn-dark' onClick={()=>redirect()}>Track order</button>
        </center>
        <br></br>
    </div>}
    </>
  )
}

export default Ordersuccess