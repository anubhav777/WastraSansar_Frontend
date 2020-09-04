import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import Usernav from './components/MIscal/Usernav'
import Footer from './components/MIscal/Footer'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signup" render={(props)=>(
            <React.Fragment>
              <Usernav/>
             <Footer/>
            </React.Fragment>
          )}/>
            </Switch>
       
   
          </Router>
    </div>
  );
}

export default App;
