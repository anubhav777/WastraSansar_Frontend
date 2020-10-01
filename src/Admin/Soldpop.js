import React, { Component } from 'react';
import Popup from 'reactjs-popup'
import axios from 'axios'
class Soldpop extends Component {
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
              'status':'admin',
              'id':this.props.mid
               
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
    render() {
        return (
            <div>
<Popup  trigger={<button  className="btn btn-danger"  >View</button>} modal>
            {close => (
              <div style={{width:'100%',marginTop:'10px'}}>
                 
                <div className="mcontent"></div>
            
                  <div className="row">
                  <div className="col-lg-12" style={fn}>
            <div className="checkout__order">
              <h5>Your order</h5>
              <div className="checkout__order__product">
              {/* <ul>
                          <li>
                      <span  className="top__text">S.No</span>
                      <span style={ml} className="top__text">Image</span>
                    <span style={{marginLeft:'15px',width:'150px'}} className="top__text">Product</span>
                    <span style={ml} className="top__text">Quantity</span>
                    <span style={ml} className="top__text__right">Total</span>
                  </li>
                  </ul>
                  
                  {this.state.alldat.length !==0 ? this.state.alldat.map((v,i)=>(
                      <ul>
                 
                  <li>0{i+1}. <div style={{display:'inline',marginLeft:'25px',width:'100px'}}> <img style={{width:'50px',height:'50px'}} src={process.env.PUBLIC_URL +`img/trend/bs-${i+1}.jpg`} alt /> </div> <div style={{display:'inline',marginLeft:'25px',width:'150px'}}> {v.product_id.name} </div><h5 style={{display:'inline',marginLeft:'25px',width:'100px'}}> {v.quantity} </h5><span>Rs. {(v.quantity *v.product_id.price)}</span></li>
                          </ul>
        )) : <ul><li>No Product</li></ul>} */}
        <table>
          <thead>
            <tr>
              <th style={ml}>S.No</th>
              <th style={ml}>Image</th>
              <th style={{ marginLeft:'15px',width:'200px'}}>Product</th>
              <th style={ml}>Quantity</th>
              <th style={ml}>Total</th>
            </tr>
            </thead>
            <tbody>
            {this.state.alldat.length !==0 ? this.state.alldat.map((v,i)=>(
                      <tr>
                 
                  <td style={ml}>0{i+1}. </td ><td style={ml}><img style={{width:'50px',height:'50px'}} src={process.env.PUBLIC_URL +`img/pembada/${v.product_id.picture[1]}`} alt /></td><td style={{ marginLeft:'15px',width:'200px'}}>{v.product_id.name}</td ><td style={ml}>{v.quantity}</td><td style={ml}>Rs. {(v.quantity *v.product_id.price)}</td>   
                          </tr>
        )) : <tr><td>No Product</td></tr>} 
            </tbody>
          
        </table>
                  
                
              </div>
              <div className="checkout__order__total">
                <ul>
                  <li>Subtotal <span>Rs .{this.state.alldat.length !== 0 ? this.tot() : 0}</span></li>
                  <li>Delivery <span>Rs. 60</span></li>
                  <li>Total <span>Rs. {this.state.alldat.length !== 0 ? (this.tot()+60) :0}</span></li>
                </ul>
              </div>
       
             
            </div>
          </div>
                </div>
            
            </div>
                
              )}
            </Popup>
            </div>
        );
    }
}
const fn={
  fontFamily: 'Graduate',fontSize: '16px'
}
const ml={
  marginLeft:'15px',width:'150px',textAlign: 'center'
 
}

export default Soldpop;