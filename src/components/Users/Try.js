import React, { Component } from 'react';
import Popup from 'reactjs-popup'
import {Redirect} from 'react-router-dom'
import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
class Try extends Component {
  state = {
    email:'',
    password:'',
    open:false
    
}
componentWillMount(){
  this.setState({ open: true });
}
closeModal=()=> {

  this.props.handler(false)
}
render() {
    return (
       
            <Popup open={this.state.open}  onClose={this.closeModal}>
        {close => (
          <div style={{width:'100%',marginTop:'10px'}}>
     
     <input type="image" id="imgbtn" style={{width:'32px',height:'32px', position:'absolute',right: 0,zIndex: 2,marginTop: '-15px',float:'right'}}  src="https://image.flaticon.com/icons/png/512/106/106830.png"  alt="Tool Tip" onClick={close}/>

<div className="container">

<div className="card" style={{background:'#fafafa'}}><Formik initialValues={this.state} validationSchema={Yup.object().shape({
                   
                   
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
                        if (res.data.status === 'success'){
                            console.log(res.data.access)
                            localStorage.setItem('Token',res.data.access)
                            let fg=document.getElementById('imgbtn')
                              
                                    setTimeout(()=>{fg.click()},2000)
                         
                        }
                       
                    })

                }} >
                    {({values,handleChange,handleBlur,handleSubmit})=>(

  <form className="form-horizontal" onSubmit={handleSubmit}>
    <div className="card-body">
      <h4 className="card-title" style={{float:'left',position:'absolute'}}>Login</h4><br/>
     
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
        <button type="submit" className="btn btn-success" style={{float:'left'}}  >login</button>
      </div>
    </div>
  </form>
   )}
               
   </Formik>
</div>
</div>


</div>

            
          )}
        </Popup>
      
    );
}
}
const fn={
fontFamily: 'Graduate',fontSize: '16px'
}
const ml={
marginLeft:'15px',width:'150px',textAlign: 'center'

}
const anch={
fontSize: '12px',
color: '#666666',
position: 'relative',
marginRight: '8px',


}
const err={
color:"red"
}
export default Try;