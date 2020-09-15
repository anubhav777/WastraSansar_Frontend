import React, { Component } from 'react';
import axios from 'axios'
import Try from '../Users/Try';
class Dashboard extends Component {
  state={
    brand:'Default',
        size:'Default',
        price:'Default',
        category:'Default',
        search:'Default',
        subcategory:'Default',
    filt:null,
    alldata:[],
    mainhead:'',
    subhead:'',
    botthead:'',
    imgback:null,
    disp:false,

  }
  componentDidMount(){
    this.getdata()
    this.gethome()
  }
  getdata=()=>{
    axios.get('http://127.0.0.1:8000/pages/getuserfiltproduct/',{
    headers:{
     
       'brand':this.state.brand,
       'size':this.state.size,
       'price':this.state.price,
       'category':this.state.category,
       'subcategory':this.state.subcategory,
       'search':this.state.search
       

    }
 })
 .then(res=>{
   console.log(res.data.data)
   this.setState({alldata:res.data.data})
 })
}
gethome=()=>{
  axios.get('http://127.0.0.1:8000/pages/homeset/')
  .then(res=>{
      Object.values(res.data.data[0].trend).map((v)=>{console.log(v)})
      this.setState({mainhead:res.data.data[0].mainheader,subhead:res.data.data[0].maintext,botthead:res.data.data[0].bottomtext,imgback:res.data.data[0].picture})
  })
}
  changefilt=(e)=>{
    console.log(e.target.getAttribute('name'))
    this.setState({category:e.target.getAttribute('name')},()=>{
      this.getdata()
    })
  }
  addcart=(id,size)=>(e)=>{
    e.preventDefault()
    axios.interceptors.response.use(response => {
      console.log(response)
      return response;
   }, error => {
     if (error.response.status === 401) {
      this.setState({disp:true})
     
     }
     return error;
   });
    let token=localStorage.getItem('Token')

      const newjs={
        'quantity':1,
        'status':'Cart',
        'size':size,
        'product_id':id
      }
      axios.post('http://127.0.0.1:8000/pages/addtocart/',newjs,{
        headers:{
         
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
           
        }
     })
     .then(res=>{
      // console.log(res)
      //  if(res.status == 401){
      //    console.log('hi')
      //  }
       console.log(res.data)
     })

    
   
  }
  handler = (val) => {
    this.setState({
      disp: val
    })
  }
    render() {
        return (
<div>
{this.state.disp ? <Try open={true} handler={this.handler}/> : null}
  <section className="categories">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 p-0">
          <div className="categories__item categories__large__item set-bg" style={ { backgroundImage:`url(${process.env.PUBLIC_URL+ "img/categories//category-1.jpg"})`}}>
            <div className="categories__text">
              <h1>Women’s fashion</h1>
              <p>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore
                edolore magna aliquapendisse ultrices gravida.</p>
              <a href="/shop?page=Women/">Shop now</a>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
              <div className="categories__item set-bg"style={ { backgroundImage:`url(${process.env.PUBLIC_URL+ "img/categories/category-2.jpg"})`}}>
                <div className="categories__text">
                  <h4>Men’s fashion</h4>
                  <p>358 items</p>
                  <a href="/shop?page=Men/">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
              <div className="categories__item set-bg"  style={ { backgroundImage:`url(${process.env.PUBLIC_URL+"img/categories/category-3.jpg"})`}}>
                <div className="categories__text">
                  <h4>Kid’s fashion</h4>
                  <p>273 items</p>
                  <a href="/shop?page=Children/">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
              <div className="categories__item set-bg"style={ { backgroundImage:`url(${process.env.PUBLIC_URL+ "img/categories/category-4.jpg"})`}}>
                <div className="categories__text">
                  <h4>Cosmetics</h4>
                  <p>159 items</p>
                  <a href="/shop?page=Women/">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
              <div className="categories__item set-bg"style={ { backgroundImage:`url(${process.env.PUBLIC_URL+ "img/categories/category-5.jpg"})`}}>
                <div className="categories__text">
                  <h4>Accessories</h4>
                  <p>792 items</p>
                  <a href="/shop?page=Women/">Shop now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Categories Section End */}
  {/* Product Section Begin */}
  <section className="product spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <div className="section-title">
            <h4>New product</h4>
          </div>
        </div>
        <div className="col-lg-8 col-md-8">
          <ul className="filter__controls">
            <li className="active" name='Default' onClick={this.changefilt}>All</li>
            <li name='Women' onClick={this.changefilt}>Women’s</li>
            <li name='Men' onClick={this.changefilt}>Men’s</li>
            <li name='Children' onClick={this.changefilt}>Kid’s</li>
          
          </ul>
        </div>
      </div>
      <div className="row property__gallery">
        {this.state.alldata.length !==0 ? this.state.alldata.slice(0,8).map((v,i)=>(
               <div className="col-lg-3 col-md-4 col-sm-6 mix women">
               <div className="product__item">
                 <div className="product__item__pic set-bg" style={ { backgroundImage:`url(${process.env.PUBLIC_URL+"img/pembada/"+v.picture[1]})`}}>
                   <div className="label new">New</div>
                   <ul className="product__hover">
                     <li><a href={process.env.PUBLIC_URL + "img/product/product-1.jpg"} className="image-popup"><span className="arrow_expand" /></a></li>
                     <li><a href="#"><span className="icon_heart_alt" /></a></li>
                     <li><div onClick={this.addcart(v.id,v.size)}><span className="icon_bag_alt" /></div></li>
                   </ul>
                 </div>
                 <div className="product__item__text">
                   <h6><a href={`prodet?page=${v.id}`}>{v.name}</a></h6>
              
                   <div className="product__price"style={v.discount === 0 ? fn : rfn}>RS: {((v.price-((v.discount*v.price)/100))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span style={v.discount == 0 ? {display:'none'} : {display:'inline'}}>{v.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span></div>
                 </div>
               </div>
             </div>

        )) :<div>Loading</div>}
      
      </div>
    </div>
  </section>
  {/* Product Section End */}
  {/* Banner Section Begin */}
  <section className="banner set-bg"style={ { backgroundImage:`url(${process.env.PUBLIC_URL+ "img/banner/"+this.state.imgback})`}}>
    <div className="container">
      <div className="row">
        <div className="col-xl-7 col-lg-8 m-auto">
          <div style={banmain}>
            <div className='ban'>
            <div className="banner__text">
                <span>{this.state.mainhead}</span>
                <h1>{this.state.subhead}</h1>
                <a href="#">{this.state.botthead}</a>
              </div>
            </div>
          

          </div>

        </div>
      </div>
    </div>
  </section>
  {/* Banner Section End */}
  {/* Trend Section Begin */}

  <section className="services spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="services__item">
            <i className="fa fa-car" />
            <h6>Free Shipping</h6>
            <p>For all oder over $99</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="services__item">
            <i className="fa fa-money" />
            <h6>Money Back Guarantee</h6>
            <p>If good have Problems</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="services__item">
            <i className="fa fa-support" />
            <h6>Online Support 24/7</h6>
            <p>Dedicated support</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="services__item">
            <i className="fa fa-headphones" />
            <h6>Payment Secure</h6>
            <p>100% secure payment</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Services Section End */}
  {/* Instagram Begin */}
  
</div>

        );
    }
}
const fn={
  fontFamily: 'Graduate',fontSize: '16px'
}
const rfn={
fontFamily: 'Graduate',fontSize: '16px',color: '#ca1515'
}
const banmain={
  display:'block',
  textAlign: 'center',
  padding:' 150px 0 0',
 
  webkitFontSmoothing: 'antialiased',


}
export default Dashboard;