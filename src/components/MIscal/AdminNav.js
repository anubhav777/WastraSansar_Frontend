import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
class AdminNav extends Component {
  state={
    redirect: false
  }
  logout=()=>{
    localStorage.clear()
    let hr=window.location.href
   console.log(hr)

   this.setState({redirect:true})
   
    // setTimeout(()=>{window.location.reload()},100)
  
   

  }
    render() {
      if(this.state.redirect){
        return (<Redirect to ="/adlog"/>)
    }
    else{
        return (
<div>
  <div className="preloader">
    <div className="lds-ripple">
      <div className="lds-pos" />
      <div className="lds-pos" />
    </div>
  </div>

  <div id="main-wrapper">



    <aside className="left-sidebar" style={{position:'fixed'}} data-sidebarbg="skin5">
      {/* Sidebar scroll*/}
      <div className="scroll-sidebar">
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="p-t-30">
            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/pdupl" aria-expanded="false"><i className="mdi mdi-view-dashboard" /><span className="hide-menu">Product Upload</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/pdallprod" aria-expanded="false"><i className="mdi mdi-chart-bar" /><span className="hide-menu">All Product</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/pdsold" aria-expanded="false"><i className="mdi mdi-chart-bubble" /><span className="hide-menu">Sold Product</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/pdhomedit" aria-expanded="false"><i className="mdi mdi-blur-linear" /><span className="hide-menu">Home Edit</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/pdbrand" aria-expanded="false"><i className="mdi mdi-pencil" /><span className="hide-menu">Sub Category</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/pdlocation" aria-expanded="false"><i className="mdi mdi-map-marker" /><span className="hide-menu">Location</span></a></li>
            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" onClick={this.logout} aria-expanded="false"><i className="mdi mdi-account-key" /><span className="hide-menu">Logout</span></a></li>
            
            
              {/* <ul aria-expanded="false" className="collapse  first-level"> */}
                {/* <li className="sidebar-item"><a href="form-basic.html" className="sidebar-link"><i className="mdi mdi-note-outline" /><span className="hide-menu"> Form Basic </span></a></li>
                <li className="sidebar-item"><a href="form-wizard.html" className="sidebar-link"><i className="mdi mdi-note-plus" /><span className="hide-menu"> Form Wizard </span></a></li>
              </ul>
            </li> */}
           
          </ul>
        </nav>
 
      </div>

    </aside>

    <div className="page-wrapper">

    </div>

  </div>
</div>


        );
    }
}
}
export default AdminNav;