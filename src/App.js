import Header from './components/Header';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import DisplayProduct from './components/DisplayProduct';
import About from './components/About';
import {BrowserRouter as Router,Link,Switch,Route} from "react-router-dom"
  
function App() {
  return (
    <Router>
      <Header/>

    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/products" component={Products}></Route>
      <Route exact path="/products/:id" component={DisplayProduct}></Route>
      <Route path="/about" component={About}></Route>
    </Switch>
    </Router>
  );
}

export default App;
