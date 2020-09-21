import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { number } from 'yup';
import show_noty from '../Users/Notify'
class Checkout extends Component {
    state={
        alldat:[],
        cartdat:[],
        total:0,
        redirect:false,
        city:null,
        locdata:[],
        prov:''
    }
    componentDidMount(){
        this.getdata()
        this.getcart()
        
        
    }
    changestaus=(e)=>{
      this.setState({[e.target.name]:e.target.value})
  }
    updtch=(e)=>{
      this.setState({[e.target.name]:e.target.value},()=>{
          this.getdel()
      })
  }
    getdata=()=>{
      axios.interceptors.response.use(response => {
        console.log(response)
        return response;
     }, error => {
       if (error.response.status === 401) {
        window.location.href='/login'
       }
       return error;
     });
        let token=localStorage.getItem('Token')
        axios.get('http://127.0.0.1:8000/users/userdet/',{
            headers:{
              'Authorization':`Bearer ${token}`
               
            }
         })
         .then(res=>{
           console.log(res.data.data.city)
           this.setState({alldat:res.data.data,city:res.data.data.city,prov:res.data.data.state},()=>{this.getdel()})
         })

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
           this.setState({cartdat:res.data.data})
           if (res.data.data.length >=1){
            this.tot()
           }
           
         })

    }
    getdel=()=>{
      axios.get('http://127.0.0.1:8000/pages/locdat/',{
        headers:{
         
           'status':this.state.city,
        }
     })
     .then(res=>{
       console.log(res.data.data)
       this.setState({locdata:res.data.data})
     })
    }
    tot=()=>{
        let gh=this.state.cartdat.map(v => (v.product_id.price * v.quantity )).reduce((prev, next) => prev + next)  
        this.setState({total:(gh)})
      
      }
    sendel=(e)=>{
      e.preventDefault()
      let token=localStorage.getItem('Token')
      let data={
        total:(this.state.total+60),
        products:this.state.cartdat
        

      }
      axios.post('http://127.0.0.1:8000/pages/soldprod/',data,{
         headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
         }
     })
     .then(res=>{
       console.log(res.data)
       this.setState({redirect:true})
       if (res.data.status === 'success'){
         
       show_noty('alert', 'Your order has been processed')
        
    }
    else{
      show_noty('error', 'Your order could not be processed')
    }
     })
    }
    updtcart=()=>{
      let token=localStorage.getItem('Token')
              axios.put('http://127.0.0.1:8000/pages/addtocart/',this.state.cartdat,{
                headers:{
                  'Authorization':`Bearer ${token}`,
                  'Content-Type':'application/json',
                  'id':'Delivery'
                   
                }
             })
             .then(res=>{
               console.log(res.data)
               if(res.data.status === 'success'){
                //  this.setState({redirect:true})
               }
             })
    }
    render() {
      if(this.state.redirect){
        return (<Redirect to ="/"/>)
    }
    else{
        return (
          
            this.state.alldat.length !== 0 ?
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
  {/* Checkout Section Begin */}
  <section className="checkout spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h6 className="coupon__link"><span className="icon_tag_alt" /> <a href="#">Have a coupon?</a> Click
            here to enter your code.</h6>
        </div>
      </div>
      <form action="#" className="checkout__form">
        <div className="row">
          <div className="col-lg-8">
            <h5>Billing detail</h5>
            <div className="row">
              
              <div className="col-lg-12">
                <div className="checkout__form__input">
                  <p>Username <span>*</span></p>
                  <input style={rn} type="text" value={this.state.alldat.userid.username}/>
                </div>
                </div>
      
               
            
              <div className="col-lg-12">
                <div className="checkout__form__input">
                  <p>Email <span>*</span></p>
                  <input style={rn} type="text" value={this.state.alldat.userid.email}/>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="checkout__form__input">
                  <p>Town/City <span>*</span></p>
                  <input style={rn} type="text" value={this.state.alldat.city}/>
                </div>
                <div className="checkout__form__input">
                  <p>Province/State <span>*</span></p>
                  <select style={rn}  name='prov' onChange={this.updtch}>
                  <option>Select</option>
'                                                <option selected={this.state.prov === '1' ? 'selected' : null} value="1">Province No. 1</option>
'                                                <option selected={this.state.prov === '2' ? 'selected' : null} value="2">Province No. 2</option>
                                                <option selected={this.state.prov === '3' ? 'selected' : null} value="3">Province No. 3</option>
                                                <option selected={this.state.prov === '4' ? 'selected' : null} value="4">Province No. 4</option>
                                                <option selected={this.state.prov === '5' ? 'selected' : null} value="5">Province No. 5</option>
                                                <option selected={this.state.prov === '6' ? 'selected' : null} value="6">Province No. 6</option>
                                                <option selected={this.state.prov === '7' ? 'selected' : null} value="7">Province No. 7</option>
                                               
                    </select>
                </div>
                </div>
                {(()=>{
                    if(this.state.prov === '1'){
                    return(
                       <div className="col-lg-12">
                         <div className="checkout__form__input">
                            <p>Address <span>*</span></p>
                <select name='city'  style={rn} onChange={this.updtch}>
                            <option>Select</option>
                                                <option selected={this.state.city === 'Bhojpur' ? 'selected' : null} value="Bhojpur">Bhojpur</option>
                                                <option selected={this.state.city === 'Biratnagar' ? 'selected' : null}  value="Biratnagar">Biratnagar</option>
                                                <option selected={this.state.city === 'Ilam' ? 'selected' : null}  value="Ilam">Ilam</option>
                                                <option selected={this.state.city === 'Jhapa' ? 'selected' : null}  value="Jhapa">Jhapa</option>
                                                <option selected={this.state.city === 'Khotang' ? 'selected' : null}  value="Khotang">Khotang</option>
                                                <option selected={this.state.city === 'Morang' ? 'selected' : null}  value="Morang">Morang</option>
                                                <option selected={this.state.city === 'Okhaldhunga' ? 'selected' : null}  value="Okhaldhunga">Okhaldhunga</option>
                                                <option selected={this.state.city === 'Panchthar' ? 'selected' : null}  value="Panchthar">Panchthar</option>
                                                <option  selected={this.state.city === 'Sankhuwasabha' ? 'selected' : null} value="Sankhuwasabha">Sankhuwasabha</option>
                                                <option selected={this.state.city === 'Solukhumbu' ? 'selected' : null}  value="Solukhumbu">Solukhumbu</option>
                                                <option  selected={this.state.city === 'Sunsari' ? 'selected' : null} value="Sunsari">Sunsari</option>
                                                <option  selected={this.state.city === 'Taplejung' ? 'selected' : null} value="Taplejung">Taplejung</option>
                                                <option selected={this.state.city === 'Terhathum' ? 'selected' : null}  value="Terhathum">Terhathum</option>
                                                <option selected={this.state.city === 'Udayapur' ? 'selected' : null}  value="Udayapur">Udayapur</option>
                                                </select>
                                                </div>
                      </div>  )
                }
                   else if (this.state.prov === '2'){
                    return (
                      <div className="col-lg-12">
                        <div className="checkout__form__input">
                            <p>Address <span>*</span></p>
                <select name='city'  style={rn} onChange={this.updtch}>
                        <option>Select</option>
                                                <option selected={this.state.city === 'Parsa' ? 'selected' : null}  value="Parsa">Parsa</option>
                                                <option selected={this.state.city === 'Bara' ? 'selected' : null}  value="	Bara">	Bara</option>
                                                <option  selected={this.state.city === 'Rautahat' ? 'selected' : null} value="Rautahat">Rautahat</option>
                                                <option  selected={this.state.city === 'Sarlahi' ? 'selected' : null} value="Sarlahi">Sarlahi</option>
                                                <option selected={this.state.city === 'Siraha' ? 'selected' : null}  value="Siraha">Siraha</option>
                                                <option  selected={this.state.city === 'Dhanusha' ? 'selected' : null} value="Dhanusha">Dhanusha</option>
                                                <option selected={this.state.city === 'Saptari' ? 'selected' : null}  value="Saptari">Saptari</option>
                                                <option  selected={this.state.city === 'Mahottari' ? 'selected' : null}  value="Mahottari">Mahottari</option>
                                                </select>
                      </div>
                      </div>
                    )
                   }
                   else if (this.state.prov === '3'){
                    return (
                      <div className="col-lg-12">
                        <div className="checkout__form__input">
                            <p>Address <span>*</span></p>
                      <select name='city'  style={rn} onChange={this.updtch}>
                      <option>Select</option>
                                                <option  selected={this.state.city === 'Bhaktapur' ? 'selected' : null}  value="Bhaktapur">Bhaktapur</option>
                                                <option selected={this.state.city === 'Chitwan' ? 'selected' : null}  value="Chitwan">Chitwan</option>
                                                <option selected={this.state.city === 'Dhading' ? 'selected' : null}  value="Dhading">Dhading</option>
                                                <option selected={this.state.city === 'Dolakha' ? 'selected' : null}  value="Dolakha">Dolakha</option>
                                                <option selected={this.state.city === 'Kathmandu' ? 'selected' : null}  value="Kathmandu">Kathmandu</option>
                                                <option  selected={this.state.city === 'Kavrepalanchok' ? 'selected' : null} value="Kavrepalanchok">Kavrepalanchok</option>
                                                <option selected={this.state.city === 'Lalitpur' ? 'selected' : null}  value="Lalitpur">Lalitpur</option>
                                                <option selected={this.state.city === 'Makwanpur' ? 'selected' : null}  value="Makwanpur">Makwanpur</option>
                                                <option selected={this.state.city === 'Nuwakot' ? 'selected' : null} value="Nuwakot">Nuwakot</option>
                                                <option  selected={this.state.city === 'Ramechhap' ? 'selected' : null} value="Ramechhap">Ramechhap</option>
                                                <option selected={this.state.city === 'Rasuwa' ? 'selected' : null}  value="Rasuwa">Rasuwa</option>
                                                <option  selected={this.state.city === 'Sindhuli' ? 'selected' : null} value="Sindhuli">Sindhuli</option>
                                                <option selected={this.state.city === 'Sindhupalchok' ? 'selected' : null}  value="Sindhupalchok">Sindhupalchok</option>
                                                </select>
                      </div>
                      </div>
                    )
                   }
                   else if (this.state.prov === '4'){
                    return (
                      <div className="col-lg-12">
                        <div className="checkout__form__input">
                            <p>Address <span>*</span></p>
                <select name='city'  style={rn} onChange={this.updtch}>
                        <option>Select</option>
                        <option selected={this.state.city === 'Baglung' ? 'selected' : null}  value="Baglung ">Baglung </option>
                                                <option selected={this.state.city === 'Gorkha' ? 'selected' : null}  value="Gorkha">Gorkha</option>
                                                <option selected={this.state.city === 'Kaski' ? 'selected' : null}  value="Kaski">Kaski </option>
                                                <option selected={this.state.city === 'Lamjung' ? 'selected' : null}  value="Lamjung">Lamjung</option>
                                                <option selected={this.state.city === 'Manang' ? 'selected' : null}  value="Manang">Manang</option>
                                                <option selected={this.state.city === 'Mustang' ? 'selected' : null}  value="Mustang ">Mustang </option>
                                                <option selected={this.state.city === 'Myagdi' ? 'selected' : null}  value="Myagdi">Myagdi</option>
                                                <option selected={this.state.city === 'Nawalpur' ? 'selected' : null}  value="Nawalpur">Nawalpur</option>
                                                <option selected={this.state.city === 'Parbat' ? 'selected' : null}  value="Parbat">Parbat</option>
                                                <option  selected={this.state.city === 'Syangja' ? 'selected' : null} value="Syangja">Syangja</option>
                                                <option selected={this.state.city === 'Tanahun' ? 'selected' : null}  value="Tanahun">Tanahun</option>
                                                </select>
                      </div>
                      </div>
                    )
                   }
                   else if (this.state.prov === '5'){
                    return (
                      <div className="col-lg-12">
                        <div className="checkout__form__input">
                            <p>Address <span>*</span></p>
                <select name='city'  style={rn} onChange={this.updtch}>
                        <option>Select</option>
                        <option  selected={this.state.city === 'Kapilvastu' ? 'selected' : null}  value="Kapilvastu">Kapilvastu</option>
                                                <option selected={this.state.city === 'Parasi' ? 'selected' : null}  value="Parasi">Parasi</option>
                                                <option selected={this.state.city === 'Rupandehi' ? 'selected' : null}  value="Rupandehi">Rupandehi</option>
                                                <option selected={this.state.city === 'Arghakhanchi' ? 'selected' : null}  value="Arghakhanchi">Arghakhanchi</option>
                                                <option  selected={this.state.city === 'Rolpa' ? 'selected' : null} value="Rolpa">Rolpa</option>
                                                <option selected={this.state.city === 'Palpa' ? 'selected' : null}  value="Palpa">Palpa</option>
                                                <option selected={this.state.city === 'Dang' ? 'selected' : null}  value="Dang">Dang</option>
                                                <option selected={this.state.city === 'Pyuthan' ? 'selected' : null}  value="Pyuthan">Pyuthan</option>
                                                <option  selected={this.state.city === 'Eastern' ? 'selected' : null} value="Eastern">Eastern</option>
                                                <option  selected={this.state.city === '7Banke' ? 'selected' : null} value="Banke">Banke</option>
                                                <option  selected={this.state.city === 'Bardiya' ? 'selected' : null} value="Bardiya">Bardiya</option>
                                                </select>
                      </div>
                      </div>
                    )
                   }
                   else if (this.state.prov === '6'){
                    return (
                      <div className="col-lg-12">
                        <div className="checkout__form__input">
                            <p>Address <span>*</span></p>
                      <select name='city'  style={rn} onChange={this.updtch}>
                        <option>Select</option>
                        <option selected={this.state.city === '7' ? 'selected' : null}  value="Dailekh">Dailekh</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Dolpa">Dolpa</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Humla">Humla</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Jajarkot">Jajarkot</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Jumla">Jumla</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Kalikot">Kalikot</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Mugu">Mugu</option>
                                                <option  selected={this.state.city === '7' ? 'selected' : null} value="Salyan">Salyan</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Surkhet">Surkhet</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="WesternRukum">Western Rukum</option>
                                                </select>
                      </div>
                      </div>
                    )
                   }
                   else if (this.state.prov === '7'){
                    return (
                      <div className="col-lg-12">
                        <div className="checkout__form__input">
                            <p>Address <span>*</span></p>
                      <select name='city'  style={rn}  onChange={this.updtch}>
                        <option>Select</option>
                        <option selected={this.state.city === '7' ? 'selected' : null}  value="Achham">Achham</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Baitadi">Baitadi</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Bajhang">Bajhang</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Bajura">Bajura</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Dadeldhura">Dadeldhura</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Darchula">Darchula</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Doti">Doti</option>
                                                <option  selected={this.state.city === '7' ? 'selected' : null} value="Kailali">Kailali</option>
                                                <option selected={this.state.city === '7' ? 'selected' : null}  value="Kanchanpur">Kanchanpur</option>
                                                </select>
                      </div>
                      </div>
                    )
                   }
                  })()}
                {/* <div className="checkout__form__input">
                  <p>Address <span>*</span></p>
                  <input style={rn} type="text" placeholder="Street Address" value={this.state.alldat.address}/>
                  
                </div> */}
              
              <div className="col-lg-12">
              <div className="checkout__form__input">
                  <p>Phone <span>*</span></p>
                  <input style={rn} type="text" value={this.state.alldat.phone}/>
                </div>
                </div>
              <div className="col-lg-12">
             
                <div className="checkout__form__input">
                  <p>Oder notes <span>*</span></p>
                  <input style={rn} type="text" placeholder="Note about your order, e.g, special noe for delivery" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4" style={fn}>
            <div className="checkout__order">
              <h5>Your order</h5>
              <div className="checkout__order__product">
              <ul>
                          <li>
                    <span className="top__text">Product</span>
                    <span className="top__text__right">Total</span>
                  </li>
                  </ul>
                  
                  {this.state.cartdat.length !==0 ? this.state.cartdat.map((v,i)=>(
                      <ul>
                 
                  <li>0{i+1}. {v.product_id.name} <span>Rs. {(v.quantity *v.product_id.price)}</span></li>
                          </ul>
        )) : <ul><li>No Product</li></ul>}
                  
                
              </div>
              <div className="checkout__order__total">
                <ul>
                  <li>Subtotal <span>Rs .{this.state.cartdat.length !== 0 ? this.state.total : 0}</span></li>
                  <li>Delivery{this.state.locdata.length !==0 ? <span>{this.state.locdata[0].price}</span> :<span>Delivery Not Available</span> } </li>
                  <li>Total {this.state.locdata.length !==0 ? <span>Rs. {this.state.cartdat.length !== 0 ? (this.state.total+Number(this.state.locdata[0].price)) : "delivery not avilable"}</span>  :<span>Delivery Not Available</span> }</li>
                </ul>
              </div>
              <div className="checkout__order__widget">
                
                
                
                <label htmlFor="paypal">
                  Cash on Delivery
                  <input type="checkbox" checked='true' id="paypal" />
                  <span className="checkmark" />
                </label>
              </div>
              <button type="submit" disabled={this.state.cartdat.length !== 0 ? this.state.locdata.length !== 0 ? false : true : true} className="site-btn" onClick={this.sendel}>Place oder</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
  {/* Checkout Section End */}
  {/* Instagram Begin */}

  <div className="search-model">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="search-close-switch">+</div>
      <form className="search-model-form">
        <input type="text" id="search-input" placeholder="Search here....." />
      </form>
    </div>
  </div>
</div>
:<div>Loading</div>

        );
    }
  }
}
const fn={
  fontFamily: 'Graduate',fontSize: '16px'
}
const rn={
  fontFamily: 'Raleway',fontSize: '16px', fontWeight:'800'
}
export default Checkout;