import React, { Component } from 'react';
import axios from 'axios'
class Shipment extends Component {
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
              'status':'delivery'
               
            }
         })
         .then(res=>{
           console.log(res.data.data[0].product_id.picture[1])
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


    render() {
  
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
        <div className="col-lg-12">
          <div className="shop__cart__table">
            <table>
              <thead>
                <tr>
                <th>Product Name</th>
                  <th>Price</th>
                  <th>Shipment</th>
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
                     
                     <td className="cart__quantity"><strong>{val.status}</strong></td>
                     <td className="cart__quantity" style={{textAlign:'center'}}><strong>{val.quantity}</strong></td>
                     <td className="cart__total">{(val.quantity *val.product_id.price)} </td>
                     
                   </tr>

              ))
             
                    : <tr><td>No Products on Shipment/Delivery</td></tr>}
   
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
  


export default Shipment;