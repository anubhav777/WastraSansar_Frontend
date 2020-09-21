import React, { Component } from 'react';
import Popup from 'reactjs-popup'
import axios from 'axios'
class Productpop extends Component {
  state={
    id:this.props.id,
    name:this.props.name,
    brand:this.props.brand,
    price:this.props.price,
    category:this.props.category,
    subcategory:this.props.subcategory,
    size:this.props.size,
    discription:this.props.discription,
    status:this.props.status,
    discount:this.props.discount,

  


}
componentDidMount(){
  this.strbreaker(this.props.specs)
}
changestaus=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
uploadfile=(e)=>{
    this.setState({[e.target.name]:e.target.files,filedisplay:e.target.files[0].name})
}
sendfile = async (e)=>{
  e.preventDefault()

let newjs={
  id:this.props.id,
  name:this.state.name,
  brand:this.state.brand,
  price:parseInt(this.state.price),
  category:this.state.category,
  subcategory:this.state.category,
  size:this.state.size,
  discription:this.state.discription,
  status:this.state.status,
  discount:parseInt(this.state.discount),
  specification:this.state.specification

}
try{
  let token=localStorage.getItem('Token')
  console.log(token)
await axios.put('http://127.0.0.1:8000/pages/addproduct/',newjs,{
   headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
   }
})
.then(res=>{

 if(res.data.stats === "sucess"){
  let fg=document.getElementById('imgbtn')
  fg.click()                               
  setTimeout(()=>{this.props.clf()},100)

}
 
})

}
catch(err){
  console.log(err)
}
}
strbreaker(obj){
  console.log( Object.values(obj))
  if(obj.length != 0){
    let gh=Object.values(obj)
    this.setState({specification:gh})
    return gh.toString()
  }
  else{
    this.setState({specification:'Enter Specs here'})
    return 'Enter Specs here'
  }
 
  

}
    render() {
        return (
            <Popup  trigger={<button style={{marginTop:'10px'}} className={"btn btn-info"} >Update</button>} modal>
            {close => (
              <div style={{width:'100%',height:'700px',marginTop:'10px',overflow:'scroll'}}>
                <a className="mclose" id='imgbtn' onClick={close}>
                  &times;
                </a>    
                <div className="mcontent">
               
        <div className="card" style={{width:'100%',height:'800px',marginTop:'10px',}}>
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
                <select name='category' onChange={this.changestaus} class="select2 form-control custom-select">
                                            <option>Select</option>
                                                <option selected={this.props.category === 'Men' ? 'selected' : null} value="Men">Men</option>
                                                <option selected={this.props.category === 'Women' ? 'selected' : null} value="Women">Women</option>
                                                <option selected={this.props.category === 'Children' ? 'selected' : null} value="Children">Children</option>
                                               
                                                

                                        </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1" className="col-sm-3 text-right control-label col-form-label">Sub Category</label>
                <div className="col-sm-9">
                <select name='subcategory' onChange={this.changestaus} class="select2 form-control custom-select">
                                            <option>Select</option>
                                                <option  selected={this.props.subcategory === 'tshirt' ? 'selected' : null} value="tshirt">Tshirt</option>
                                                <option  selected={this.props.subcategory === 'shirt' ? 'selected' : null} value="shirt">Shirt</option>
                                                <option  selected={this.props.subcategory === 'pants' ? 'selected' : null} value="pants">Pants</option>
                                                <option  selected={this.props.subcategory === 'jeans' ? 'selected' : null} value="jeans">Jeans</option>
                                                

                                        </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1"  className="col-sm-3 text-right control-label col-form-label">Size</label>
                <div className="col-sm-9">
                <select name='size' onChange={this.changestaus} class="select2 form-control custom-select">
                                            <option>Select</option>
                                                <option selected={this.props.size === 'small' ? 'selected' : null} value="small">Small</option>
                                                <option selected={this.props.size === 'medium' ? 'selected' : null} value="medium">Medium</option>
                                                <option selected={this.props.size === 'large' ? 'selected' : null} value="large">Large</option>
                                                <option selected={this.props.size === 'xl' ? 'selected' : null} value="xl">XL</option>
                                                <option selected={this.props.size === 'all' ? 'selected' : null} value="all">All</option>

                                        </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1"  className="col-sm-3 text-right control-label col-form-label">Status</label>
                <div className="col-sm-9">
                <select name='status' onChange={this.changestaus} class="select2 form-control custom-select">
                                            <option>Select</option>
                                                <option  selected={this.props.status === 'Instock' ? 'selected' : null} value="Instock">Instock</option>
                                                <option selected={this.props.status === 'outofstock' ? 'selected' : null} value="outofstock">Out Of Stock</option>
                                              
                                        </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Discount in %</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" name="discount" onChange={this.changestaus} value={this.state.discount}  placeholder="Discount Here" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1"   className="col-sm-3 text-right control-label col-form-label">Discription</label>
                <div className="col-sm-9">
                  <textarea className="form-control"  name='discription' placeholder="Provide Product discription here" onChange={this.changestaus} value={this.state.discription} defaultValue={""} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="cono1"   className="col-sm-3 text-right control-label col-form-label">Discription</label>
                <div className="col-sm-9">
                  <textarea className="form-control"  name='specification' placeholder="Provide Product discription here" onChange={this.changestaus} value={this.state.specification} defaultValue={""} />
                </div>
              </div>
             
            </div>
            <div className="border-top">
              <div className="card-body">
                <button type="button" className="btn btn-primary" onClick={this.sendfile}>Update </button>
              </div>
            </div>
          </form>
        </div>

      </div>

    </div>
                
            )}
          </Popup>
        );
    }
}

export default Productpop;