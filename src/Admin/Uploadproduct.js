import React, { Component } from 'react';
import axios from 'axios'
class Uploadproduct extends Component {
    state={
        name:'',
        brand:'',
        price:'',
        category:'Default',
        subcategory:'',
        size:'',
        discription:'',
        satus:'Instock',
        discount:0,
        file:'',
        filedisplay:'',
        specification:'',
        brandat:[]


    }
    changestaus=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    uploadfile=(e)=>{
        this.setState({[e.target.name]:e.target.files,filedisplay:e.target.files[0].name})
    }
    updtdt=(e)=>{
      this.setState({[e.target.name]:e.target.value},()=>{
          this.uplbrnd()
      })
  }
    uplbrnd=()=>{
      axios.get('http://127.0.0.1:8000/pages/brandat/',{
        headers:{
         
           'status':this.state.category,
   
           
    
        }
     })
     .then(res=>{
       console.log(res.data.data)
       this.setState({brandat:res.data.data})
     })
    }
    sendfile = async (e)=>{
        e.preventDefault()
        const formdata = new FormData()
    for(const key of Object.keys(this.state.file)){
        formdata.append("file",this.state.file[key])

       
        
    }
    formdata.append('name',this.state.name)
    formdata.append('brand',this.state.brand)
    formdata.append('price',parseInt(this.state.price))
    formdata.append('category',this.state.category)
    formdata.append('subcategory',this.state.subcategory)
    formdata.append('size',this.state.size)
    formdata.append('discription',this.state.discription)
    formdata.append('status','Instock')
    formdata.append('specification',this.state.specification)
    formdata.append('discount',0)
    let token=localStorage.getItem('Token')
    let newjs={
        name:this.state.name,
        brand:this.state.brand,
        price:this.state.price,
        category:this.state.category,
        subcategory:this.state.category,
        size:this.state.size,
        discription:this.state.discription,
        status:'Instock',
        discount:'0',
        file:formdata

    }
 try{
     await axios.post('http://127.0.0.1:8000/pages/addproduct/',formdata,{
         headers:{
            'Content-Type':'multipart/form-data',
            'Authorization':`Bearer ${token}`
         }
     })
     .then(res=>{
       console.log(res.data)
       this.setState({name:'',
        brand:'',
        price:'',
        category:'',
        subcategory:'',
        size:'',
        discription:'',
        filedisplay:'',
        specification:'',
        file:null})
     })

    }
    catch(err){
        console.log(err)
    }
    }
    render() {
        return (
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
      <div className="col-md-6" style={{margin:"auto"}}>
        <div className="card">
          <form className="form-horizontal">
            <div className="card-body">
              <h4 className="card-title">Product Info</h4>
              <div className="form-group row">
                <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">Product Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" name="name" onChange={this.changestaus} value={this.state.name} placeholder="Product Name Here" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Brand</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" name="brand" onChange={this.changestaus} value={this.state.brand} placeholder="Brand Name Here" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Price</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" name="price" onChange={this.changestaus} value={this.state.price}  placeholder="Price Here" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Category</label>
                <div className="col-sm-9">
                <select name='category'  value={this.state.category} onChange={this.updtdt} class="select2 form-control custom-select">
                                            <option>Select</option>
                                                <option value="Men">Men</option>
                                                <option value="Women">Women</option>
                                                <option value="Children">Children</option>
                                               
                                                

                                        </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1"   className="col-sm-3 text-right control-label col-form-label">Sub Category</label>
                <div className="col-sm-9">
                <select name='subcategory' value={this.state.subcategory} onChange={this.changestaus} class="select2 form-control custom-select">
                  {this.state.brandat.length !== 0 ? this.state.brandat.map((v)=>(
                    
                  
                  <option value={v.brandname}>{v.brandname}</option>
                      
                        

              

                  )) : 
                  <option>Please select Category first</option>
                  
                      

              } 
              </select>           
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1"  className="col-sm-3 text-right control-label col-form-label">Size</label>
                <div className="col-sm-9">
                <select name='size'  value={this.state.size} onChange={this.changestaus} class="select2 form-control custom-select">
                                            <option>Select</option>
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="large">Large</option>
                                                <option value="xl">XL</option>
                                                <option value="all">All</option>

                                        </select>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="cono1"   className="col-sm-3 text-right control-label col-form-label">Discription</label>
                <div className="col-sm-9">
                  <textarea className="form-control"  name='discription' placeholder="Provide Product discription here" onChange={this.changestaus} value={this.state.discription} defaultValue={""} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1"   className="col-sm-3 text-right control-label col-form-label">Specifications</label>
                <div className="col-sm-9">
                  <textarea className="form-control"  name='specification' placeholder="Provide Product Specification here" onChange={this.changestaus} value={this.state.specification} defaultValue={""} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label" >Product Image</label>
                <div className="col-sm-9">
                <div class="custom-file">
                                            <input type="file" multiple name="file"  onChange={this.uploadfile} className="custom-file-input" />
                                            <label className="custom-file-label" for="validatedCustomFile">{this.state.filedisplay.length < 1 ? "Enter file here" :(this.state.filedisplay)}</label>
                                           
                                        </div>
                  {/* <input type="file" className="form-control"     placeholder="Please upload Image here" />
                  <label className="form-control" htmlFor="exampleInputFile"></label> */}
                </div>
              </div>
            </div>
            <div className="border-top">
              <div className="card-body">
                <button type="button" className="btn btn-primary" onClick={this.sendfile}>Submit</button>
              </div>
            </div>
          </form>
        </div>

      </div>

    </div>


  </div>

 

</div>


        );
    }
}

export default Uploadproduct;