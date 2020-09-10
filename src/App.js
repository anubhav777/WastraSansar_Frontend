import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Usernav from './components/MIscal/Usernav'
import Adminnav from './components/MIscal/AdminNav'

import './App.css'
import Signup from './components/Users/Signup'
import Login from './components/Users/Login'

import Try from './components/Users/Try'
import Sidenav from './components/MIscal/Sidenav'
import Footer from './components/MIscal/Footer'
import Homeedit from './Admin/Homeedit'
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
         
                 <Route exact path="/adlog" render={(props)=>(
            <React.Fragment>
            
              <Adlog/>
           
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
