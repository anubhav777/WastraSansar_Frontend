import React, { Component } from 'react';
import DataTable,{defaultThemes} from 'react-data-table-component'
import axios from 'axios'
import Productpop from './Productpop'
import show_noty from '../components/Users/Notify'
class Allproduct extends Component {
    state={
        allprod:[],
        changeid:'',
        dis:'',
        stats:'',
        status:'Default',
        discount:'Default',
        price:'Default',
        category:'Default',
    }
    componentWillMount(){
        this.getprod()
    }
    changestaus=(e)=>{
      this.setState({[e.target.name]:e.target.value})
  }
    getprod=()=>{
        axios.get('http://127.0.0.1:8000/pages/getproduct/')
        .then(res=>{
            console.log(res)
            this.setState({allprod:res.data.data})
        })
    }
    changeval=(id)=>(e)=>{
        console.log(e.target.value,id)
        let newval=this.state.allprod.map((val)=>{
            console.log(val.id)
            if(val.id === id){
                val.discount=e.target.value
            }
            return val
        })
        this.setState({allprod:newval})

    }
    deleteproduct=(id)=>(e)=>{
      e.preventDefault()
      let token=localStorage.getItem('Token')
      axios.delete('http://127.0.0.1:8000/pages/addproduct/',{
        headers:{
           'Content-Type':'application/json',
           'id':id,
           'Authorization':`Bearer ${token}`
        }
     })
     .then(res=>{
       console.log(res.data)
       if(res.data.status === 'success'){
          this.getprod()
          show_noty('alert', 'Product has been sucesfully Deleted')
       }
     })
    }
    filtprod=(e)=>{
      e.preventDefault()
      axios.get('http://127.0.0.1:8000/pages/filtproduct/',{
        headers:{
         
           'status':this.state.status,
           'discount':this.state.discount,
           'price':this.state.price,
           'category':this.state.category,
           'search':'Default'
        }
     })
     .then(res=>{
       console.log(res.data.data)
       this.setState({allprod:res.data.data})
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
            // row=><img  style={{width:'42px',
            //     height:'42px',
            //     borderRadius:'50%',
            //     objectFit:'cover',
            //     verticalAlign:'middle'}} alt={"pagesimg"} src={row.productid.page_info.profile_photo}/>
            let data=this.state.allprod
            const columns = [ {
                name:'Profuct Name',
                selector: 'name',
                sortable:true
                
            },
            {
                name:'Categpry',
                selector:'category',
                sortable:true
            },
            {
                name: <span style={{borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                fontSize:'16px',
                color:'#ECF0F1'}}>Price</span>,
                selector:'price',
                sortable: true,
            },
            {
              name:'Status',
              selector:'status',
              sortable: true
             
            },
            {
              name:'Discount',
              selector:'discount',
              sortable: true 
            },
            {
                name:'',
                cell: row=><Productpop
                id={row.id}
                name={row.name}
                brand={row.brand}
                price={row.price}
                category={row.category}
                subcategory={row.subcategory}
                size={row.size}
                discription={row.discription}
                status={row.status}
                discount={row.discount}
                specs={row.specs}
                clf={this.getprod}
                />,
                button:true,
                
              },
            {
              name:'',
              cell: row=><button style={{marginTop:'10px'}} className="btn btn-danger" onClick={this.deleteproduct(row.id)} >Delete</button>,
              button:true,
              
            }]
        return (
            <div className="page-wrapper">

  <div className="page-breadcrumb" >
    <div className="row">
      <div className="col-12 d-flex no-block align-items-center">
        <h4 className="page-title" >Form Basic</h4>
  

        

      </div>
      <div className='col-md-12' style={{marginTop:"10px"}}>
        <select style={drp_child} name='price' onChange={this.changestaus} class="select2 form-control custom-select">
                                            <option>Price</option>
                                            <option value="Default">Default</option>
                                            <option  value="< 500">less than 500</option>
                                            <option  value="500 - 1000">500 - 1000</option>
                                            <option  value="1000 - 2000">1000 - 2000</option>
                                            <option  value="> 2000">greater than 2000</option>

                                               
                                                

                                        </select>
                                        <select style={drp_child} onChange={this.changestaus} name='category' class="select2 form-control custom-select">
                                            <option>Select</option>
                                            <option value="Default">Default</option>
                                                <option  value="Men">Men</option>
                                                <option  value="Women">Women</option>
                                                <option  value="Children">Children</option>
                                               
                                                

                                        </select>
                                        <select style={drp_child} onChange={this.changestaus} name='status' class="select2 form-control custom-select">
                                            <option>Select</option>
                                            <option value="Default">Default</option>
                                            <option   value="Instock">Instock</option>
                                              <option  value="outofstock">Out Of Stock</option>
                                               
                                                

                                        </select>
                                        <select style={drp_child} onChange={this.changestaus} name='discount' class="select2 form-control custom-select">
                                            <option>Select</option>
                                            <option value="Default">Default</option>
                                                <option  value="discount">Discounted</option>
                                                <option  value="undiscount">Undiscounted</option>
                                               
                                                

                                        </select>
                                        <button type='button' className='btn btn-success' onClick={this.filtprod} style={{marginLeft:'20px',marginBottom:'5px'}} >Update</button>
                </div>
    </div>
  </div>

  <div className="container-fluid" >

    <div className="row" >
      <div className='col-md-12'>
    <DataTable
                        
                        data={data}
                        columns={columns}
                        customStyles={customStyles}
                        noHeader={true}
                        pagination
                />
                 <h4 style={{ position:'absolute',display:'inline',marginLeft:'50px',fontFamily: "Courier New",fontSize:'16px',fontWeight: 700,color:'#337ab7',marginTop:'-40px'}}>Total Products:<span>{this.state.allprod.length}</span></h4>
        </div>
        </div>
        </div>
        </div>
        
        );
    }
}
const drp_child={
  width:'200px',display:'inline-block', marginLeft:'20px'
  }

export default Allproduct;