import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Usernav from './components/MIscal/Usernav'
import Adminnav from './components/MIscal/AdminNav'
import Productdetails from './components/Products/Productdetails'
import Dashboard from './components/Products/Dashboard'
import './App.css'
import Signup from './components/Users/Signup'
import Login from './components/Users/Login'
import Cart from './components/Products/Cart'
import Checkout from './components/Products/Checkout'
import Try from './components/Users/Try'
import Sidenav from './components/MIscal/Sidenav'
import Footer from './components/MIscal/Footer'
import Homeedit from './Admin/Homeedit'
import Wishfile from './components/Products/Wishfile'
import Shipment from './components/Products/Shipment'
import Location from './Admin/Location'
import Adlog from './components/Users/Adlog'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signup" render={(props)=>(
            <React.Fragment>
              <Usernav/>
              <Signup/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path="/login" render={(props)=>(
            <React.Fragment>
              <Usernav/>
              <Login/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
     
          <Route exact path="/checkout" render={(props)=>(
            <React.Fragment>
              <Usernav/>
              <Checkout/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path="/side" render={(props)=>(
            <React.Fragment>
              <Sidenav/>
              
            </React.Fragment>
          )}>

          </Route>
          <Route exact path="/try" render={(props)=>(
            <React.Fragment>
              <Usernav/>
              <Try/>
            </React.Fragment>
          )}>

          </Route>
         
          
          <Route exact path='/' render={(props)=>(
            <React.Fragment>
               <Usernav/>
              <Dashboard/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/cart' render={(props)=>(
            <React.Fragment>
               <Usernav/>
              <Cart/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/wish' render={(props)=>(
            <React.Fragment>
               <Usernav/>
              <Wishfile/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/ship' render={(props)=>(
            <React.Fragment>
               <Usernav/>
              <Shipment/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>



          <Route exact path='/prodet' render={(props)=>(
            <React.Fragment>
              <Usernav/>
              <Productdetails/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          </Switch>
          <Switch>
          
          
          <Route exact path="/adlog" render={(props)=>(
            <React.Fragment>
            
              <Adlog/>
           
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/pdlocation' render={(props)=>(
            <React.Fragment>
              <Adminnav/>
              <Location/>
            </React.Fragment>
          )}>

          </Route>
         
          
          <Route exact path='/pdhomedit' render={(props)=>(
            <React.Fragment>
              <Adminnav/>
              <Homeedit/>
            </React.Fragment>
          )}>

          </Route>
          </Switch>
   
          </Router>
    </div>
  );
}

export default App;
