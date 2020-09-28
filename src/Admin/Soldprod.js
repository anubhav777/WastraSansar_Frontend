import React, { Component } from 'react';
import DataTable,{defaultThemes} from 'react-data-table-component'
import axios from 'axios'
import Soldpop from './Soldpop'

class Soldprod extends Component {
    state={
        soldprod:[],
        deltype:'Default',
        delstatus:'Default',
        city:'Default',
        date:'Default',
        cartdat:'',
        prov:'3'

    }
    componentDidMount(){
        this.getdata()
    }
    getdata=()=>{
      let token=localStorage.getItem('Token')
        axios.get('http://127.0.0.1:8000/pages/soldprod/',{
          headers:{
            'Authorization':`Bearer ${token}`
             
          }})
        .then(res=>{
          console.log(res.data)
            this.setState({soldprod:res.data.data})
        })
    }
    changestaus=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    crtdt=(obj)=>{
        this.setState({cartdat:obj})
        
    }
    updatedata=(e)=>{
      let token=localStorage.getItem('Token')
        axios.get('http://127.0.0.1:8000/pages/filtsold/',{
            headers:{
             
               'deltype':this.state.deltype,
               'delstatus':this.state.delstatus,
               'city':this.state.city,
               'dat':this.state.date,
               'search':'Default',
               'Authorization':`Bearer ${token}`
            }
         })
         .then(res=>{
           console.log(res.data.data)
           this.setState({soldprod:res.data.data})
           
         })
        }
        updtcart=()=>{
          let token=localStorage.getItem('Token')
                  
                 .then(res=>{
                   console.log(res.data)
                   if(res.data.status === 'success'){
                    //  this.setState({redirect:true})
                   }
                 })
        }
    render() {
        const ExpanableComponent = ({ data }) => (
     
            <div className="card">
            <div className="card-header">
              <h5 className="m-0" style={wrd}>Order ID : {data.id}</h5>
            </div>
            <div className="card-body">
        {/* <h6 className="card-text" style={wrd}>Product Name : {data.product_id.name}</h6>
        <h6 className="card-text" style={wrd}>Quantity : {data.quantity}</h6>
        <h6 className="card-text" style={wrd}>Price per piece : {data.product_id.price}</h6>
        <h6 className="card-text" style={wrd}>Discounted Price ({data.product_id.discount}) : {(data.product_id.discount/100)*data.product_id.price}</h6>
        <h6 className="card-text" style={wrd}>Total Price After Discount : {(data.product_id.price * data.quantity)-(data.product_id.discount/100)*((data.product_id.price * data.quantity))}</h6>
        <h6 className="card-text" style={wrd}>Delivery Location : {data.user_id.city}</h6>
        <h6 className="card-text" style={wrd}>Username : {data.user_id.userid.username}</h6> */}
        {/* <h6 className="card-text" style={wrd}>Phone Number : {data.user_id.phone}</h6>
        
        */}
        {/* <Popup trigger={<button  type='button' className='btn btn-info' style={{marginLeft:'20px',marginBottom:'5px'}}>View</button>} modal>
            {close => (
              <div style={{width:'300px',height:'200px'}}>
                <a className="mclose" onClick={close}>
                  &times;
                </a>    
                <div className="mcontent">
                <img src={`https://greenhorse.s3.amazonaws.com/Question/${data.imageid}`} alt={data.id}/>
                </div>
            
              </div>
            )}
          </Popup> */}
            
            </div>
          </div>
        
        ); 
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
            let data=this.state.soldprod
            const columns = [ {
                name:'Delivery id',
                selector:row=><span> {row.deliverid}</span> ,
                sortable:true
                
            },
            // {
            //     name:'Total',
            //     selector:'total',
            //     sortable:true
            // },
            {
                name: <span style={{borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                fontSize:'16px',
                color:'#ECF0F1'}}>Username</span>,
                cell:row=><span>{row.user_id.userid.username}</span>,
                sortable: true,
            },
            {
                name: <span style={{borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                fontSize:'16px',
                color:'#ECF0F1'}}>Location</span>,
                cell:row=><span>{row.user_id.address}</span>,
                sortable: true,
            },
            {
              name: <span style={{borderRightStyle: 'solid',
              borderRightWidth: '1px',
              borderRightColor: defaultThemes.default.divider.default,
              fontSize:'16px',
              color:'#ECF0F1'}}>Phone</span>,
              cell:row=><span>{row.user_id.phone}</span>,
              sortable: true,
          },
            {
              name:'Delivery Status',
              selector:row=><select name='category' onChange={(e)=>{
                let token=localStorage.getItem('Token')
                this.state.soldprod.map((v)=>{
                  if(v.id === row.id){
                    v.delivery_status=e.target.value
                  }
                  return v
                })
              
                axios.put('http://127.0.0.1:8000/pages/addtocart/',this.state.cartdat,{
                    headers:{
                      'Authorization':`Bearer ${token}`,
                      'Content-Type':'application/json',
                      'id':'Ship',
                      'search':row.id,
                      'filter':e.target.value,
                      'username':row.user_id.userid.email,
                      
                       
                    }
                 })
              }} class="select2 form-control custom-select">
              <option>Select</option>
                  <option selected={row.delivery_status === 'Undelivered' ? 'selected' : null} value="Undelivered">Undelivered</option>
                  <option selected={row.delivery_status === 'Shipped' ? 'selected' : null} value="Shipped">Shipped</option>
                  <option selected={row.delivery_status === 'Delivered' ? 'selected' : null} value="Delivered">Delivered</option>
             
                 
                  

          </select>,
              sortable: true
             
            },
            {
              name:'Delivery Type',
              selector:'delivery_type',
              sortable: true 
            },
            {
                name:'Odered Date',
                selector:'odered_date',
                sortable: true 
              },

            {
              name:'',
              cell: row=> <Soldpop delvid={row.deliverid} mid={row.id} user_id={row.user_id.id} newdat={row.products} cart={this.crtdt}/>,
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
      <select style={drp_child} name='delstatus' onChange={this.changestaus} class="select2 form-control custom-select">
                                          <option>Select</option>
                                          <option value="Default">Default</option>
                                          <option value="Delivered">Delivered</option>
                                          <option  value="Shipped">Shipped</option>
                                          <option  value="Undelivered">Undelivered</option>
                                      </select>
                                      <select style={drp_child} onChange={this.changestaus} name='deltype' class="select2 form-control custom-select">
                                          <option>Select</option>
                                          <option value="Default">Default</option>
                                              <option  value="Delivery_pay">Delivery_pay</option>
                                              <option  value="Esewa">Esewa</option>
                                             
                                      </select>
                                      
                                      <select name='prov' style={drp_child} onChange={this.changestaus}   class="select2 form-control custom-select">
                  
                                            <option>Select</option>
                                                <option value="1">Province No. 1</option>
                                                <option value="2">Province No. 2</option>
                                                <option value="3">Province No. 3</option>
                                                <option value="4">Province No. 4</option>
                                                <option value="5">Province No. 5</option>
                                                <option value="6">Province No. 6</option>
                                                <option value="7">Province No. 7</option>
                                               
                                                

                                        </select>
                                        {(()=>{
                    if(this.state.prov === '1'){
                    return(
                     
                <select name='city'   class="select2 form-control custom-select" style={drp_child} onChange={this.changestaus}>
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
                       )
                }
                   else if (this.state.prov === '2'){
                    return (
                     
                <select name='city'   class="select2 form-control custom-select" style={drp_child} onChange={this.changestaus}>
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
                 
                    )
                   }
                   else if (this.state.prov === '3'){
                    return (
              
                      <select name='city'   class="select2 form-control custom-select" style={drp_child} onChange={this.changestaus}>
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
                  
                    )
                   }
                   else if (this.state.prov === '4'){
                    return (
       
                <select name='city'   class="select2 form-control custom-select" style={drp_child} onChange={this.changestaus}>
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
                    
                    )
                   }
                   else if (this.state.prov === '5'){
                    return (
                  
                <select name='city'   class="select2 form-control custom-select" style={drp_child} onChange={this.changestaus}>
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
               
                    )
                   }
                   else if (this.state.prov === '6'){
                    return (
           
                      <select name='city'   class="select2 form-control custom-select" style={drp_child} onChange={this.changestaus}>
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
                  
                    )
                   }
                   else if (this.state.prov === '7'){
                    return (
               
                      <select name='city'   class="select2 form-control custom-select" style={drp_child} onChange={this.changestaus}>
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
                
                    )
                   }
                  })()}
                                      <input type="date" style={drp_child} className="form-control" name="date" onChange={this.changestaus}  />
                                      <button type='button' className='btn btn-info' onClick={this.updatedata} style={{marginLeft:'20px',marginBottom:'5px'}} >Filter</button>
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
                      expandableRows
                     
                      
              />
            
                
                    
             
               
                
               {/* <h4 style={{ position:'absolute',display:'inline',marginLeft:'50px',fontFamily: "Courier New",fontSize:'16px',fontWeight: 700,color:'#337ab7',marginTop:'-40px'}}>Total Products:<span>{this.state.allprod.length}</span></h4> */}
      </div>
      <div style={{width:'300px',marginTop:'-45px',zIndex:9,display:'inline'}}>
                    <button type='button' className='btn btn-success' style={{marginLeft:'50px',width:'100px',zIndex:999,display:'inline-block'}} onClick={(e)=>{
                            e.preventDefault()
                            let token=localStorage.getItem('Token')
                            axios.put('http://127.0.0.1:8000/pages/soldprod/',this.state.soldprod,{
                               headers:{
                                'Content-Type':'application/json',
                                'Authorization':`Bearer ${token}`
                               }
                           })
                           .then(res=>{
                             console.log(res.data)
                             if (res.data.status === 'success'){
                               this.getdata()
                             
                              // this.setState({redirect:true})
                          }
                           })
                    }}>Update</button>
                   
        
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
const wrd={
    fontFamily:'TimesNewRoman',
    fontSize:'24px',
    fontStyle:'normal',
    fontWeight: 700

  
  }
export default Soldprod;