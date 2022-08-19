import Header from './components/Header';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import DisplayProduct from './components/DisplayProduct';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import Filter from './components/Filter';

import { useEffect,useState } from 'react';
function App() {
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
  return (
    <Router>
      {
        loading? <img src="../images/weblogo.png" alt='logo' className='hlogo'/>:<Header/>

      }
  

      


    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/products" component={Products}></Route>
      <Route exact path="/products/:id" component={DisplayProduct}></Route>
      <Route path="/about" component={About}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/profile" component={Profile}></Route>
    </Switch>
    </Router>
  );
}

export default App;
