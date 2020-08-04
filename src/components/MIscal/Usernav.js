import React, { Component } from 'react';
import Loginpop from '../Users/Loginpop'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Redirect,withRouter} from 'react-router-dom'

class Usernav extends Component {
  state={
    mb:false,
    alldata:0,
    redirect:false,
    search:'',
    wishdata:0,
    ship:0,
    disp:'none'
  }
  componentDidMount(){
    this.getcart()
    this.getwish()
    this.getship()
}
getcart=()=>{
  let token=localStorage.getItem('Token')
  console.log(token)
  if (token!==null){
    axios.get('http://127.0.0.1:8000/pages/addtocart/',{
      headers:{
        'Authorization':`Bearer ${token}`,
        'status':'cart'
         
      }
   })
   .then(res=>{
     if (res.status === 200){
      this.setState({alldata:res.data.data.length})
     }
   
     
   })
  }

//   axios.interceptors.response.use(response => {
//     console.log(response)
//     return response;
//  }, error => {
//    if (error.response.status === 401) {
//     this.setState({alldata:0})
   
//    }
 
//    return error;
//  });
  //  token=localStorage.getItem('Token')


}
logout=()=>{
  localStorage.clear()
  let hr=window.location.href
 console.log(hr)
 if(hr !== 'http://localhost:3000/'){
  this.props.history.push({
    pathname: '/',
    
  })
  // setTimeout(()=>{window.location.reload()},100)

 }
 else{
   window.location.reload()
 }
}
getwish=()=>{
  let token=localStorage.getItem('Token')
        axios.get('http://127.0.0.1:8000/pages/wishreq/',{
            headers:{
              'Authorization':`Bearer ${token}`
               
            }
         })
         .then(res=>{
           console.log(res.data)
           this.setState({wishdata:res.data.data.length})
         })
}
getship=()=>{
  let token=localStorage.getItem('Token')
  axios.get('http://127.0.0.1:8000/pages/addtocart/',{
      headers:{
        'Authorization':`Bearer ${token}`,
        'status':'delivery'
         
      }
   })
   .then(res=>{
     console.log(res.data)
     this.setState({ship:res.data.data.length})
   })
}
chng=(e)=>{
  this.setState({search:e.target.value})
    
}
srch=(e)=>{
  e.preventDefault()
//   let history=useHistory()
let hre=window.location.href
let srch=hre.includes("search=")
let nw=`?search=${this.state.search}`
if(srch){

 this.props.history.push({
  pathname: '/sr',
  search: nw
})
  setTimeout(()=>{window.location.reload()},200)
}
else{
  this.props.history.push({
    pathname: '/sr',
    search: nw
  })
}
// this.props.history.goBack()
//  location.reload()
}
    render() {
     
      if(this.state.redirect){
        return (<Redirect to ="/"/>)
    }
    else{
        return (
          <div>
  <div>
  <div id="preloder">
    <div className="loader" />
  </div>
  {/* Offcanvas Menu Begin */}
  <div className={this.state.mb ? "offcanvas-menu-overlay active" : "offcanvas-menu-overlay"} />
  <div className={this.state.mb ? "offcanvas-menu-wrapper active" :"offcanvas-menu-wrapper "  } >
    <div onClick={()=>{
      this.setState({mb:false})
    }} className="offcanvas__close">+</div>
    <ul className="offcanvas__widget">
  

    <li><a href="/wish"><span className="icon_heart_alt" /> {this.state.wishdata > 0 ?  <div className="tip">{this.state.wishdata}</div>: null}</a></li>
            <li><a href="/cart"><span className="icon_bag_alt" />
            {this.state.alldata > 0 ?  <div className="tip">{this.state.alldata}</div>: null}
               
              </a></li>
              <li><a href="/ship"><i class="fas fa-shipping-fast"></i>{this.state.ship > 0 ?  <div className="tip">{this.state.ship}</div>: null}</a></li>
              <li><span onClick={this.logout} class="fas fa-sign-out-alt"></span>
                             
                            </li>
    </ul>
    <div className="offcanvas__logo">
      <a href="/"><img src="img/wastrasansar.png" alt /></a>
    </div>
  
    <div className='slicknav_menu'>
<nav className='slicknav_nav slicknav_hidden' aria-hidden="true" role="menu">
<ul>
            <li className="active"><a href="/">Home</a></li>
            <li><a href="/shop?page=Women/">Women’s</a></li>
            <li><a href="/shop?page=Men/">Men’s</a></li>
            <li><a href="/shop?page=Children/">Kid’s</a></li>
            
            
          </ul>

</nav>

    </div>
    <div className="offcanvas__auth">
         
    <Loginpop/>
      <a href="/signup">Register</a>
    </div>
  </div>
</div>

<header className="header">
  <div className="container-fluid">
    <div className="row">
      <div className="col-xl-3 col-lg-2">
        <div className="header__logo">
          <a href="/"><img style={{width:'98px',height:'32px'}} src="img/wastrasansar.png" alt /></a>
          <div style={{position:'absolute',right:'15%',top:'29%'}} className='smallnav'>
            <div className="col-xl-3 col-lg-2">
            <ul className="offcanvas__widget"><li><i class="fas fa-search fa-2x" onClick={()=>{
     this.setState({disp:'block'})
   }} ></i>

</li></ul>
            
            </div>
            </div>
        </div>
      </div>
      <div className='mobnav'>
      <div className="col-xl-3 col-lg-2">

        <div class="search-container">
        <input type="text" placeholder="Search.." name="search" />
         <button type="submit"><i className="fa fa-search" /></button>
        </div>
      </div>
      </div>
      <div className="col-xl-4 col-lg-4">
        <nav className="header__menu">
          <ul>
            <li className="active"><a href="/">Home</a></li>
            <li><a href="/shop?page=Women/">Women’s</a></li>
            <li><a href="/shop?page=Men/">Men’s</a></li>
            <li><a href="/shop?page=Children/">Kid’s</a></li>
       

          </ul>
        </nav>
      </div>


      <div className="col-lg-6">
   
          {/* <div style={{display:"inline-block", marginLeft:'20px'}} class="topnav">
          <div class="search-container"> */}
{/* <form onSubmit={this.srch} >
  <div >
  <input type="text" placeholder="Search.." name="search" onChange={this.chng} />
  <button type="submit" ><i className="fa fa-search" /></button>
  </div>
</form> */}
{/* </div>
</div> */}
<div className="header__right">
{/* <div className="searchBox">
  <input className="searchInput" type="text" name placeholder="Search" />
  <button className="searchButton" href="#">
    <i className="fa fa-search"/>
     
  </button>
</div> */}

   
          <div className="header__right__auth">
          <Loginpop/>
            <a href="/signup">Register</a>
          </div>
     

          <ul className="header__right__widget">
            <li>

</li>
          <li><span className="icon_search search-switch" onClick={()=>{
     this.setState({disp:'block'})
   }} /></li>
             <li><FontAwesomeIcon icon={["fas", "coffee"]} /></li>
            <li><a href="/wish"><span className="icon_heart_alt" /> {this.state.wishdata > 0 ?  <div className="tip">{this.state.wishdata}</div>: null}</a></li>
            <li><a href="/cart"><span className="icon_bag_alt" />
            {this.state.alldata > 0 ?  <div className="tip">{this.state.alldata}</div>: null}
               
              </a></li>
              <li><a href="/ship"><i class="fas fa-shipping-fast"></i>{this.state.ship > 0 ?  <div className="tip">{this.state.ship}</div>: null}</a></li>
              <li><span onClick={this.logout} class="fas fa-sign-out-alt"></span>
                             
                            </li>
                           
          </ul>
        </div>
      </div>
    </div>
    <div className="canvas__open">
      <i onClick={()=>{
        this.setState({mb:!this.state.mb})
      }} className="fa fa-bars" />
    </div>
  </div>
</header>
<div className="search-model" style={{display:this.state.disp}}>
  <div className="h-100 d-flex align-items-center justify-content-center">
    <div className="search-close-switch" onClick={()=>{
      this.setState({disp:'none'})
    }}><span style={{marginTop:'-7px'}}>+</span></div>
    <form  onSubmit={this.srch}>m>
    <div className="searchBox">
  <input className="searchInput" onChange={this.chng} type="text" name placeholder="Search Here..." />
  <button type="submit" className="searchButton" href="#">
    <i className="fa fa-search fa-lg"/>
     
  </button>
</div>
</form>
    {/* <form className="search-model-form" onSubmit={this.srch}>
      <input type="text" id="search-input" placeholder="Search here....." onChange={this.chng}/>
      <button type="submit" ><i className="fa fa-search" /></button>
    </form> */}
  </div>
</div>
</div>


        );
    }
}
}


export default withRouter(Usernav);