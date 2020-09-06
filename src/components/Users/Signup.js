import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
class Signup extends Component {
  state={
    username:'',
    email:'',
    password:'',
    prov:'3',
    city:'',
    address: '',
    phone: '',
    redirect:false
  }
  changestaus=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}

    render() {
      if(this.state.redirect){
        return (<Redirect to ="/home"/>)
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
  <section className="checkout spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h6 className="coupon__link"><span className="icon_tag_alt" /> <a href="/login">Have a Account? Click
            here to Login </a></h6>
        </div>
      </div>
      <Formik initialValues={this.state} validationSchema={Yup.object().shape({
                            username:Yup.string()
                            .min(1,"Username must be longer than 1 character")
                            .required("Username is required for registration"),

                            address:Yup.string()
                            .min(1,"Address must be longer than 1 character")
                            .required("Address is required for registration"),
                            phone:Yup.string()
                            .min(1,"Phone must have 9 numbers")
                            .required("Phone Number is required for Delivery"),

                            email:Yup.string()
                            .email("Email is required")
                            .required("Email is required for registration"),

                            password:Yup.string()
                            .required("please enter a password")
                            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.{8,})/,
                            "Must Contain 8 Characters,contain One Number and One alphabet at minimum"),

                        })  } onSubmit={(values,err)=>{
                         
                            console.log(err)
                            let username=values.username
                            let password = values.password
                            let email=values.email
                            console.log(username,password)
                            let data={
                                "username":username,
                                "email":email,
                                "password":password,
                                "address":values.address,
                                "state":values.prov,
                                "city":values.city,
                                "phone":values.phone,
                                
                            }
                            axios.post(' http://127.0.0.1:8000/users/signup/',data,{
                                headers:{
                                    "Content-Type":"application/json"
                                }
                            })
                            .then(res=>{
                                console.log(res)
                                if (res.status === 200){
                                    console.log(res.data)
                                   
                                    this.setState({redirect:true})
                                }
                               
                            })

                        }} >
                            {({values,handleChange,handleBlur,handleSubmit})=>(

          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="card-body">
              <h4 className="card-title">Personal Info</h4>
             
              <div className="form-group row">
          
                <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">Full Name</label>
                <div className="col-sm-9">
                <ErrorMessage component="div" name="username" style={err}/>
                  <input type="text"  className="form-control" name="username"  placeholder="Full Name Here"  required value={values.name} onChange={handleChange} onBlur={handleBlur} />
                </div>
              </div>
              <div className="form-group row">
              
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Email</label>
                <div className="col-sm-9">
                <ErrorMessage component="div" name="email" style={err}/>
                  <input type="text"  className="form-control" name="email" placeholder="Last Name Here"  required value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                </div>
              </div>
              <div className="form-group row">
              
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Password</label>
                <div className="col-sm-9">
                <ErrorMessage component="div" name="password" style={err}/>
                  <input type="password"  className="form-control" name="password" placeholder="Password Here" required value={values.name} onChange={handleChange} onBlur={handleBlur} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Province</label>
                <div className="col-sm-9">
                <select name='prov'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                  
                                            <option>Select</option>
                                                <option value="1">Province No. 1</option>
                                                <option value="2">Province No. 2</option>
                                                <option value="3">Province No. 3</option>
                                                <option value="4">Province No. 4</option>
                                                <option value="5">Province No. 5</option>
                                                <option value="6">Province No. 6</option>
                                                <option value="7">Province No. 7</option>
                                               
                                                

                                        </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">City</label>
               
                {(()=>{
                    if(values.prov === '1'){
                    return(
                       <div className="col-sm-9">
                <select name='city'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                            <option>Select</option>
                                                <option value="Bhojpur">Bhojpur</option>
                                                <option value="Biratnagar">Biratnagar</option>
                                                <option value="Ilam">Ilam</option>
                                                <option value="Jhapa">Jhapa</option>
                                                <option value="Khotang">Khotang</option>
                                                <option value="Morang">Morang</option>
                                                <option value="Okhaldhunga">Okhaldhunga</option>
                                                <option value="Panchthar">Panchthar</option>
                                                <option value="Sankhuwasabha">Sankhuwasabha</option>
                                                <option value="Solukhumbu">Solukhumbu</option>
                                                <option value="Sunsari">Sunsari</option>
                                                <option value="Taplejung">Taplejung</option>
                                                <option value="Terhathum">Terhathum</option>
                                                <option value="Udayapur">Udayapur</option>
                                                </select>
                      </div>  )
                }
                   else if (values.prov === '2'){
                    return (
                      <div className="col-sm-9">
                <select name='city'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                        <option>Select</option>
                                                <option value="Parsa">Parsa</option>
                                                <option value="	Bara">	Bara</option>
                                                <option value="Rautahat">Rautahat</option>
                                                <option value="Sarlahi">Sarlahi</option>
                                                <option value="Siraha">Siraha</option>
                                                <option value="Dhanusha">Dhanusha</option>
                                                <option value="Saptari">Saptari</option>
                                                <option value="Mahottari">Mahottari</option>
                                                </select>
                      </div>
                    )
                   }
                   else if (values.prov === '3'){
                    return (
                      <div className="col-sm-9">
                      <select name='city'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                      <option>Select</option>
                                                <option value="Bhaktapur">Bhaktapur</option>
                                                <option value="Chitwan">Chitwan</option>
                                                <option value="Dhading">Dhading</option>
                                                <option value="Dolakha">Dolakha</option>
                                                <option value="Kathmandu">Kathmandu</option>
                                                <option value="Kavrepalanchok">Kavrepalanchok</option>
                                                <option value="Lalitpur">Lalitpur</option>
                                                <option value="Makwanpur">Makwanpur</option>
                                                <option value="Nuwakot">Nuwakot</option>
                                                <option value="Ramechhap">Ramechhap</option>
                                                <option value="Rasuwa">Rasuwa</option>
                                                <option value="Sindhuli">Sindhuli</option>
                                                <option value="Sindhupalchok">Sindhupalchok</option>
                                                </select>
                      </div>
                    )
                   }
                   else if (values.prov === '4'){
                    return (
                      <div className="col-sm-9">
                <select name='city'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                        <option>Select</option>
                        <option value="Baglung ">Baglung </option>
                                                <option value="Gorkha">Gorkha</option>
                                                <option value="Kaski">Kaski </option>
                                                <option value="Lamjung">Lamjung</option>
                                                <option value="Manang">Manang</option>
                                                <option value="Mustang ">Mustang </option>
                                                <option value="Myagdi">Myagdi</option>
                                                <option value="Nawalpur">Nawalpur</option>
                                                <option value="Parbat">Parbat</option>
                                                <option value="Syangja">Syangja</option>
                                                <option value="Tanahun">Tanahun</option>
                                                </select>
                      </div>
                    )
                   }
                   else if (values.prov === '5'){
                    return (
                      <div className="col-sm-9">
                <select name='city'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                        <option>Select</option>
                        <option value="Kapilvastu">Kapilvastu</option>
                                                <option value="Parasi">Parasi</option>
                                                <option value="Rupandehi">Rupandehi</option>
                                                <option value="Arghakhanchi">Arghakhanchi</option>
                                                <option value="Rolpa">Rolpa</option>
                                                <option value="Palpa">Palpa</option>
                                                <option value="Dang">Dang</option>
                                                <option value="Pyuthan">Pyuthan</option>
                                                <option value="Eastern">Eastern</option>
                                                <option value="Banke">Banke</option>
                                                <option value="Bardiya">Bardiya</option>
                                                </select>
                      </div>
                    )
                   }
                   else if (values.prov === '6'){
                    return (
                      <div className="col-sm-9">
                      <select name='city'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                        <option>Select</option>
                        <option value="Dailekh">Dailekh</option>
                                                <option value="Dolpa">Dolpa</option>
                                                <option value="Humla">Humla</option>
                                                <option value="Jajarkot">Jajarkot</option>
                                                <option value="Jumla">Jumla</option>
                                                <option value="Kalikot">Kalikot</option>
                                                <option value="Mugu">Mugu</option>
                                                <option value="Salyan">Salyan</option>
                                                <option value="Surkhet">Surkhet</option>
                                                <option value="WesternRukum">Western Rukum</option>
                                                </select>
                      </div>
                    )
                   }
                   else if (values.prov === '7'){
                    return (
                      <div className="col-sm-9">
                      <select name='city'   class="select2 form-control custom-select" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                        <option>Select</option>
                        <option value="Achham">Achham</option>
                                                <option value="Baitadi">Baitadi</option>
                                                <option value="Bajhang">Bajhang</option>
                                                <option value="Bajura">Bajura</option>
                                                <option value="Dadeldhura">Dadeldhura</option>
                                                <option value="Darchula">Darchula</option>
                                                <option value="Doti">Doti</option>
                                                <option value="Kailali">Kailali</option>
                                                <option value="Kanchanpur">Kanchanpur</option>
                                                </select>
                      </div>
                    )
                   }
                  })()}
         
                
              </div>
              <div className="form-group row">
             
                <label htmlFor="cono1" className="col-sm-3 text-right control-label col-form-label">Address</label>
                <div className="col-sm-9">
                <ErrorMessage component="div" name="address" style={err}/>
                  <input type="text"  className="form-control"  name='address' placeholder="Address  Here" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                </div>
              </div>
              <div className="form-group row">
             
                <label htmlFor="cono1" className="col-sm-3 text-right control-label col-form-label">Contact No</label>
                <div className="col-sm-9">
                <ErrorMessage component="div" name="phone" style={err}/>
                  <input type="text"  className="form-control"  name='phone' placeholder="Contact No Here" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                </div>
              </div>
              
            </div>
            <div className="border-top">
              <div className="card-body">
                <button type="submit" className="btn btn-success">Submit</button>
              </div>
            </div>
          </form>
           )}
                       
           </Formik>
    </div>
  </section>
</div>


  );
    }
}
}
const mnbg={
    background:'#eeeeee'
}
const err={
  color:"red"
}
export default Signup;