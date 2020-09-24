import React, { Component } from 'react';
import Editpop from './Editpop'
import axios from 'axios'
class Homeedit extends Component {
  state={
    mainhead:'',
    subhead:'',
    botthead:'',
    disp:true,
    trenddisp:true,
    alldata:[],
    file:null,
    imgback:null,
    filedisplay:'',

  }
  componentDidMount(){
    this.getdata()

  }
  getdata=()=>{
    axios.get('http://127.0.0.1:8000/pages/homeset/')
    .then(res=>{
        // console.log(res.data.data[0].mainheader)
        Object.values(res.data.data[0].trend).map((v)=>{console.log(v)})
        this.setState({alldata:res.data.data,mainhead:res.data.data[0].mainheader,subhead:res.data.data[0].maintext,botthead:res.data.data[0].bottomtext,imgback:res.data.data[0].picture})
    })

  }

  uploadfile=(e)=>{
    this.setState({[e.target.name]:e.target.files,filedisplay:e.target.files[0].name})
}
  chngupdt=(e)=>{
    console.log(e.target.value)
    this.setState({[e.target.name]:e.target.value})
  }
  sendfile = async (e)=>{
    e.preventDefault()
    let formdata=null
    let cont=-null
    if (this.state.file !== null){
      cont='multipart/form-data'
    formdata = new FormData()
for(const key of Object.keys(this.state.file)){
    formdata.append("file",this.state.file[key])

    formdata.append('mainheader',this.state.mainhead)
    formdata.append('maintext',this.state.subhead)
    formdata.append('bottomtext',this.state.botthead)
    formdata.append('picture','fgh')
    
}

    }
    else{
      cont='application/json'
      formdata={
        'mainheader':this.state.mainhead,
        'maintext':this.state.subhead,
        'bottomtext':this.state.botthead,
        'picture':this.state.imgback
      }

    }


try{
  let token=localStorage.getItem('Token')
  console.log(formdata)
 await axios.put('http://127.0.0.1:8000/pages/homeset/',formdata,{
     headers:{
        'Content-Type':cont,
        'Authorization':`Bearer ${token}`
     }
 })
 .then(res=>{
   console.log(res.data)
   this.getdata()
   this.setState({disp:true})
   })

}
catch(err){
    console.log(err)
}
}
    render() {
        return (
          this.state.alldata.length !== 0 ?
            <div className="page-wrapper">

  <div className="page-breadcrumb">
    <div className="row">
      <div className="col-12 d-flex no-block align-items-center">
        <h4 className="page-title">Form Basic</h4>
        <div className="ml-auto text-right">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Library</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <div className="container-fluid">

    <div className="row">
      <div className="col-md-12" style={{margin:"auto"}}>
        <div className="card">
          <form className="form-horizontal">
            <div className="card-body">
           
              <section className="banner set-bg"style={ { height:'310px',backgroundSize: 'contain',backgroundImage:`url(${process.env.PUBLIC_URL+ "img/banner/"+this.state.imgback})`}}>
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
         

            </div>
            <div className="border-top">
              <div className="card-body">
                {this.state.disp ? <button type="button" className="btn btn-primary" onClick={()=>{
                  this.setState({disp:false})
                }}>Update</button>: 
               
                  <form action="#" className="checkout__form">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="checkout__form__input">
                              <p>Main Header<span>*</span></p>
                              <input type="text" value={this.state.mainhead} onChange={this.chngupdt}  name="mainhead"/>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="checkout__form__input">
                              <p>Main Text <span>*</span></p>
                              <input type="text" value={this.state.subhead} onChange={this.chngupdt}  name="subhead"/>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="checkout__form__input">
                              <p>Bottom Text <span>*</span></p>
                              <input type="text" value={this.state.botthead} onChange={this.chngupdt}  name="botthead"/>
                             
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3">
                            <div>
                              <p style={{color: '#444444', fontWeight: 500, marginBottom: '10px'}}> Picture/Banner<span>*</span></p>
                              <div class="upload-bootn-wrapper">
                              <button class="bootn">Upload a file</button>
                              <input onChange={this.uploadfile} type="file" name="file" />
                            </div>
                            </div>
                          </div>
                          <button type="button" className="btn btn-primary" onClick={this.sendfile}>Update</button> <button type="button" className="btn btn-danger" style={{marginLeft:'25px'}} onClick={()=>{this.setState({disp:true})}}>Cancel</button>
                        </div>
                      </div>

                    </div>
                  </form>
                }
                {/* <div style={drp_child}>
                <input type="text" style={{ width:'100%'}} value={this.state.mainhead} onChange={this.chngupdt}  className="form-control" name="mainhead"  />
                </div><input type="text" value={this.state.subhead} onChange={this.chngupdt} style={drp_child}  className="form-control" name="subhead"  />
                <input type="text" value={this.state.botthead} onChange={this.chngupdt} style={drp_child} className="form-control" name="botthead"  />
                <input type="file" style={drp_child} className="form-control" name="date"  /> */}
              </div>
            </div>
            
          </form>
        </div>
 
      </div>

    </div>


  </div>


</div>:
<div>Loading</div>
        );
    }
}
const banmain={
  display:'block',
  textAlign: 'center',
  padding:' 100px 0 0',
 
  webkitFontSmoothing: 'antialiased',


}

export default Homeedit;