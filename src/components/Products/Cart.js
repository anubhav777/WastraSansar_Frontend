import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Cart extends Component {
    state={
        alldat:[],
        redirect:false
    }
    componentDidMount(){
        this.getcart()
    }
    getcart=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://127.0.0.1:8000/pages/addtocart/',{
            headers:{
              'Authorization':`Bearer ${token}`,
              'status':'cart'
               
            }
         })
         .then(res=>{
           console.log(res.data)
           this.setState({alldat:res.data.data})
         })

    }
    tot=()=>{
      let gh=this.state.alldat.map(v => (v.product_id.price * v.quantity )).reduce((prev, next) => prev + next)  
      return gh
    }
    delcart=(id)=>{
      console.log('hi')
      let token=localStorage.getItem('Token')
      axios.delete('',{
        headers:{
          'Authorization':`Bearer ${token}`,
          'id':id
           
        }
      })
      .then(res=>{
        if(res.data.status === 'success'){
          this.getcart()
        }
      })
    }
    updtquantity=(id)=>{
      
    }
    render() {
      if(this.state.redirect){
        return (<Redirect to ="/checkout"/>)
    }
    else{
        return (
      <div>
  <div className="breadcrumb-option">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__links">
            <a href="./index.html"><i className="fa fa-home" /> Home</a>
            <span>Shopping cart</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Breadcrumb End */}
  {/* Shop Cart Section Begin */}
  <section className="shop-cart spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="shop__cart__table">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
              {this.state.alldat.length !== 0 ? this.state.alldat.map((val,i)=>(
                     <tr>
                 
                     <td className="cart__product__item">
                       
                       <img style={{width:'90px',height:'120px'}} src={`img/pembada/${val.product_id.picture[1]}`} alt />
                       <div className="cart__product__item__title">
              <h5>{val.product_id.name}</h5>
                         <div className="rating">
                         <h6 style={{color:"grey"}}>{val.product_id.brand}</h6>
                         </div>
                       </div>
                     </td>
                     <td className="cart__price">Rs. {val.product_id.price}</td>
                     <td className="cart__quantity">
                 
                       <div className="pro-qty">
                       <span className='inc qtybtn' onClick={(e)=>{
                             
                             const gl=this.state.alldat.map((v)=>{
                                 if(v.id === val.id){
                                   if (val.quantity >= 1){
                                    v.quantity = (parseInt(val.quantity)-1) 
                                   }
                                    
                                 }
                                 return v
                             })
                             this.setState({alldat:gl})
                         }}>-</span>
                         <input type="text"  value={val.quantity} />
                         <span className='inc qtybtn' onClick={(e)=>{
                             
                             const gl=this.state.alldat.map((v)=>{
                                 if(v.id === val.id){
                                    v.quantity = (parseInt(val.quantity)+1) 
                                 }
                                 return v
                             })
                             this.setState({alldat:gl})
                         }}>+</span>
                       </div>
                     </td>
                     <td className="cart__total">{(val.quantity *val.product_id.price)} </td>
                     <td className="cart__close" onClick={()=>{ let token=localStorage.getItem('Token')
      axios.delete('http://127.0.0.1:8000/pages/addtocart/',{
        headers:{
          'Authorization':`Bearer ${token}`,
          'id':val.id
           
        }
      })
      .then(res=>{
        
 
          this.getcart()
              
        
      })}}><span className="icon_close"  /></td>
                   </tr>

              ))
             
                    : <tr><td>No Products on Cart</td></tr>}
                {/* <tr>
                  <td className="cart__product__item">
                    <img src="img/shop-cart/cp-2.jpg" alt />
                    <div className="cart__product__item__title">
                      <h6>Zip-pockets pebbled tote briefcase</h6>
                      <div className="rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div>
                    </div>
                  </td>
                  <td className="cart__price">$ 170.0</td>
                  <td className="cart__quantity">
                    <div className="pro-qty">
                      <input type="text" defaultValue={1} />
                    </div>
                  </td>
                  <td className="cart__total">$ 170.0</td>
                  <td className="cart__close"><span className="icon_close" /></td>
                </tr>
                <tr>
                  <td className="cart__product__item">
                    <img src="img/shop-cart/cp-3.jpg" alt />
                    <div className="cart__product__item__title">
                      <h6>Black jean</h6>
                      <div className="rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div>
                    </div>
                  </td>
                  <td className="cart__price">$ 85.0</td>
                  <td className="cart__quantity">
                    <div className="pro-qty">
                      <input type="text" defaultValue={1} />
                    </div>
                  </td>
                  <td className="cart__total">$ 170.0</td>
                  <td className="cart__close"><span className="icon_close" /></td>
                </tr>
                <tr>
                  <td className="cart__product__item">
                    <img src="img/shop-cart/cp-4.jpg" alt />
                    <div className="cart__product__item__title">
                      <h6>Cotton Shirt</h6>
                      <div className="rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div>
                    </div>
                  </td>
                  <td className="cart__price">$ 55.0</td>
                  <td className="cart__quantity">
                    <div className="pro-qty">
                      <input type="text" defaultValue={1} />
                    </div>
                  </td>
                  <td className="cart__total">$ 110.0</td>
                  <td className="cart__close"><span className="icon_close" /></td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="cart__btn">
            <a href="#">Continue Shopping</a>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="cart__btn update__btn">
            <a href="#"><span className="icon_loading" /> Update cart</a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="discount__content">
            <h6>Discount codes</h6>
            <form action="#">
              <input type="text" placeholder="Enter your coupon code" />
              <button type="submit" className="site-btn">Apply</button>
            </form>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-2">
          <div className="cart__total__procced">
            <h6>Cart total</h6>
            <ul>
              <li>Subtotal <span>Rs .{this.state.alldat.length !== 0 ? this.tot() : 0}</span></li>
              {/* <li>Delivery <span>Rs. 60</span></li>
            <li>Total <span>Rs. {this.state.alldat.length !== 0 ? (this.tot()+60) :0}</span></li> */}
            </ul>
            <a href="#" className="primary-btn" onClick={()=>{
              let token=localStorage.getItem('Token')
              axios.put('http://127.0.0.1:8000/pages/addtocart/',this.state.alldat,{
                headers:{
                  'Authorization':`Bearer ${token}`,
                  'Content-Type':'application/json',
                  'id':'Cart'
                   
                }
             })
             .then(res=>{
               console.log(res.data)
               if(res.data.status === 'success'){
                 this.setState({redirect:true})
               }
             })
            }}>Proceed to checkout</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Footer Section End */}
  {/* Search Begin */}
  <div className="search-model">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="search-close-switch">+</div>
      <form className="search-model-form">
        <input type="text" id="search-input" placeholder="Search here....." />
      </form>
    </div>
  </div>
</div>

            
        );
          }
        }
    }


export default Cart;