import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
class Wishfile extends Component {
    state={
        alldat:[],
        redirect:false
    }
    componentDidMount(){
        this.getcart()
    }
    getcart=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://127.0.0.1:8000/pages/wishreq/',{
            headers:{
              'Authorization':`Bearer ${token}`
               
            }
         })
         .then(res=>{
           console.log(res.data)
           this.setState({alldat:res.data.data})
         })

    }

    delcart=(id)=>{
      console.log('hi')
      let token=localStorage.getItem('Token')
      axios.delete('http://127.0.0.1:8000/pages/wishreq/',{
        headers:{
          'Authorization':`Bearer ${token}`,
          'id':id
           
        }
      })
      .then(res=>{
          console.log('del')
        if(res.data.status === 'success'){
          this.getcart()
        }
      })
    }
    addcart=(id,size,vid)=>(e)=>{
        e.preventDefault()
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
             console.log(res.data.status)
            if(res.data.status === 'success'){
                this.delcart(vid)
              }
         })
    
        
       
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
            <span>Wishlist</span>
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
        <div className="col-lg-14">
          <div className="shop__cart__table">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Added Date</th>
                  <th></th>
                  <th></th>
                  <th />
                </tr>
              </thead>
              <tbody>
            {this.state.alldat.length !== 0 ? this.state.alldat.map((val,i)=>(
                     <tr>
                 
                     <td className="cart__product__item" style={{width:'215px'}}>
                     <div style={{width:'90px',height:'120px',display:'inline-block'}}><img style={{width:'100%',height: '100%'}} src={`img/pembada/${val.product_id.picture[1]}`} alt />
                       {/* <img style={{width:'90px',height:'90px'}} src={`img/pembada/${val.product_id.picture[1]}`} alt /> */}
                       </div><div className="cart__product__item__title" >
              <h5>{val.product_id.name}</h5>
                         <div className="rating">
                         <h6 style={{color:"grey"}}>{val.product_id.brand}</h6>
                         </div>
                       </div>
                     </td>
                     <td className="cart__price">Rs. {val.product_id.price}</td>
                     
                     <td className="cart__quantity">{val.added_date}</td>
                     <td className="cart__price"><button onClick={this.addcart(val.product_id.id,val.product_id.size,val.id)} className="site-btn">Add to Cart</button></td>
                     <td className="cart__close" onClick={()=>{ let token=localStorage.getItem('Token')
      axios.delete('http://127.0.0.1:8000/pages/wishreq/',{
        headers:{
          'Authorization':`Bearer ${token}`,
          'id':val.id
           
        }
      })
      .then(res=>{
        if(res.data.status === 'success'){
          this.getcart()
        }
      })}}><span className="icon_close"  /></td>
                   </tr>

              ))
             
                    : <tr><td>No Products on Widhlist</td></tr>}
   
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  </section>

</div>

            
        );
          }
        }
    }

export default Wishfile;