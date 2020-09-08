import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

class Adlog extends Component {
    state = {
        email:'',
        password:'',
        redirect:false
    }
    
render() {
        if(this.state.redirect){
            return (<Redirect to ="/pdupl"/>)
        }
        else{
        return (
<div style={{background:'linear-gradient(-135deg, #c850c0, #4158d0)', height: '752px'}}>
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
          <h6 className="coupon__link"><span className="icon_tag_alt" /> <a href="/">Admin Login.</a></h6>
        </div>
      </div>
    <div className="secar" ><Formik initialValues={this.state} validationSchema={Yup.object().shape({
                       
                       
                        email:Yup.string()
                        .email("Email is required")
                        .required("Email is required for registration"),

                        password:Yup.string()
                        .required("please enter a password")
                        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.{8,})/,
                        "Must Contain 8 Characters,contain One Number and One alphabet at minimum"),

                    })  } onSubmit={(values,err)=>{
                     
                        let email = values.email
                        let password = values.password
                        console.log(email,password)
                        let data={
                            "email":email,
                            "password":password
                        }
                        axios.post(' http://127.0.0.1:8000/api/token/',data,{
                            headers:{
                                "Content-Type":"application/json"
                            }
                        })
                        .then(res=>{
                            console.log(res)
                            if (res.data.usert === 'admin'){
                                console.log(res.data)
                                localStorage.setItem('Token',res.data.access)
                                localStorage.setItem('Usert',res.data.usert)
                                this.setState({redirect:true})
                                 setTimeout(()=>{window.location.reload()},200)
                                // window.location.href=document.referrer
                            //    window.history.back()
                            }
                           
                        })

                    }} >
                        {({values,handleChange,handleBlur,handleSubmit})=>(

      <form className="form-horizontal" style={{background:'#fff'}} onSubmit={handleSubmit}>
        <div className="card-body">
          <h4 className="card-title">Login</h4>
         
          <div className="form-group row">
          
            <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Email</label>
            <div className="col-sm-6">
            <ErrorMessage component="div" name="email" style={err}/>
              <input type="text"  className="form-control" name="email" placeholder="Email Name Here"  required value={values.name} onChange={handleChange} onBlur={handleBlur}/>
            </div>
          </div>
          <div className="form-group row">
          
            <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Password</label>
            <div className="col-sm-6">
            <ErrorMessage component="div" name="password" style={err}/>
              <input type="password"  className="form-control" name="password" placeholder="Password Here" required value={values.name} onChange={handleChange} onBlur={handleBlur} />
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
    </div>
  </section>
</div>
        );
    }
}
}
const err={
    color:"red"
  }
export default Adlog;