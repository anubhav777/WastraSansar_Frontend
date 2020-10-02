import React, { Component } from 'react';
import axios from 'axios'
import DataTable,{defaultThemes} from 'react-data-table-component'
import show_noty from '../components/Users/Notify'
class Uploadbrand extends Component {
    state={
        category:'',
        brand:'',
        status:'Default',
        alldata:[]

    }
    componentDidMount(){
        this.getdata()
    }
    changestaus=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    updtdt=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            this.getdata()
        })
    }
    upldbrnd=(e)=>{
        e.preventDefault()
        let token=localStorage.getItem('Token')
        const jsdata={
            'category':this.state.category,
            'brandname':this.state.brand
        }
       axios.post('http://127.0.0.1:8000/pages/brandat/',jsdata,{
            headers:{
               'Content-Type':'application/json',
               'Authorization':`Bearer ${token}`
            }
        })
        .then(res=>{
          
          if(res.data.status === 'sucess'){
            console.log('fck')
            this.setState({brand:'',category:''})
          }
          this.getdata()
          
        })
   
    }
    getdata=()=>{
      axios.get('http://127.0.0.1:8000/pages/brandat/',{
        headers:{
         
           'status':this.state.status,
        }
     })
     .then(res=>{
       console.log(res.data.data)
       this.setState({alldata:res.data.data})
     })
    }
    deleteproduct=(id)=>(e)=>{
        e.preventDefault()
        let token=localStorage.getItem('Token')
        axios.delete('http://127.0.0.1:8000/pages/brandat/',{
          headers:{
             'Content-Type':'application/json',
             'id':id,
             'Authorization':`Bearer ${token}`
          }
       })
       .then(res=>{
         console.log(res.data)
          if(res.data.status === 'success'){
            show_noty('alert', 'Category has been sucesfully Deleted')
          }
            this.getdata()
         
       })
      }
    render() {
        const customStyles = {
            header: {
                style: {
                  minHeight: '56px',
                },
              },
              headRow: {
                style: {
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px',
                  borderTopColor: defaultThemes.default.divider.default,
                  background:'rgba(52,73,94,0.94)',
                  color:'#ECF0F1',
                  fontFamily:"Helvetica Neue, Roboto, Arial, Droid Sans, sans-serif"
                },
              },
              headCells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px',
                    color:'#ECF0F1',
                    fontFamily: "Helvetica Neue, Roboto, Arial, Droid Sans, sans-serif"
                    
                  },
                },
              },
              cells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px'
                    
                    
                  },
                },
              },
            };
            let data=this.state.alldata
            const columns = [ {
                name:'Sub Category',
                selector:'brandname',
                sortable:true
                
            },
            {
              name:'Category',
              selector:'category',
              sortable: true 
            },
            {
            name:'',
              cell: row=><button style={{marginTop:'10px'}} className="btn btn-danger" onClick={this.deleteproduct(row.id)} >Delete</button>,
              button:true,
              
              },

         ]

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
                <div className="col-md-6" >
                  <div className="card">
                    <form className="form-horizontal">
                      <div className="card-body">
                        <h4 className="card-title">Product Info</h4>
            
                        <div className="form-group row">
                          <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Category</label>
                          <div className="col-sm-9">
                          <select name='category' value={this.state.category}   onChange={this.changestaus} class="select2 form-control custom-select">
                                                      <option>Select</option>
                                                          <option value="Men">Men</option>
                                                          <option value="Women">Women</option>
                                                          <option value="Children">Children</option>
                                                         
                                                          
          
                                                  </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">Sub Category</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" value={this.state.brand} name="brand" onChange={this.changestaus}  placeholder="Brand Here" />
                          </div>
                        </div>

                      </div>
                      <div className="border-top">
                        <div className="card-body">
                          <button type="button" className="btn btn-primary" onClick={this.upldbrnd}>Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
          
                </div>
                <div className="col-md-6" >
                  <div className="card">
                  <select style={drp_child} name='status' onChange={this.updtdt} class="select2 form-control custom-select">
                  <option>Select</option>
                                                          <option value="Men">Men</option>
                                                          <option value="Women">Women</option>
                                                          <option value="Children">Children</option>
                                      </select>
                                      <div className='col-md-12' style={{marginTop:'20px'}}>
                                      <DataTable
                      
                      data={data}
                      columns={columns}
                      customStyles={customStyles}
                      noHeader={true}
                      pagination
                   
                     
                      
              />
              </div>
                  </div>
          
                </div>
          
              </div>
          
          
            </div>
          

          
          </div>
        );
    }
}
const drp_child={
    width:'200px',display:'inline-block', marginLeft:'20px',marginTop:'20px'
    }

export default Uploadbrand;