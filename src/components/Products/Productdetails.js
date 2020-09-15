import React, { Component } from 'react';
import axios from 'axios'
import Loginpop from '../Users/Loginpop'
import Try from '../Users/Try'
import show_noty from '../Users/Notify'
class Productdetails extends Component {
    state={
        id:'',
        alldata:[],
        size:'Default',
        mainimg:'',
        review:'',
        rating:0,
        adreview:'',
        allreview:[],
        reldata:[],
        quantity:1,
        disp:false,
        avg:0,
        adm:''
    }
    componentDidMount(){
        let hre=window.location.href
        let category=hre.split('=',2)[1]
        let adm=localStorage.getItem('Usert')
        this.setState({id:category,adm:adm},()=>{
            this.getdata();this.getreview()
        })
        this.related()
        
    }
    changestaus=(e)=>{
      this.setState({[e.target.name]:e.target.value})
  }
  getreview=()=>{

    axios.get('http://127.0.0.1:8000/pages/showrev/',{
      headers:{
       
         'ids':this.state.id,
         
      }
   })
   .then(res=>{
 
     this.setState({allreview:res.data.data,avg:res.data.avg})
    
   })


  }
  related=()=>{
    axios.get('http://127.0.0.1:8000/pages/getuserfiltproduct/',{
      headers:{
       
         'brand':'Default',
         'size':'Default',
         'price':'Default',
         'category':'Default',
         'subcategory':'Default',
         'search':'Default'
         

      }
   })
   .then(res=>{
  
     let newarr=res.data.data.sort(() => Math.random() - 0.5)
     console.log(newarr)
        
     this.setState({reldata:newarr})
   })
  }
    getdata=()=>{
        axios.get('http://127.0.0.1:8000/pages/proddisc/',{
        headers:{
         
           'ids':this.state.id,
           
        }
     })
     .then(res=>{
      
       this.setState({alldata:res.data.data,mainimg:res.data.data[0].picture['1']})
       if(res.data.data[0].size !== 'all'){
        this.setState({size:res.data.data[0].size})

      }
     })

    }
    updtrev=(id)=>(e)=>{
      let token=localStorage.getItem('Token')
      e.preventDefault()
      axios.interceptors.response.use(response => {
        console.log(response)
        return response;
     }, error => {
       if (error.response.status === 401) {
        this.setState({disp:true})
       }
       return error;
     });
      let newjs={
        'review_reply':this.state.adreview,
      }
      axios.put('http://127.0.0.1:8000/pages/addreview/',newjs,{
        headers:{
          'ids':id,
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
           
        }
     })
     .then(res=>{
      this.getreview()
     })
    }
    updimg=(e)=>{
      this.setState({mainimg:e.target.name})
    }
    sendreview=(e)=>{
      let token=localStorage.getItem('Token')
      console.log(token)
      e.preventDefault()
      axios.interceptors.response.use(response => {
        console.log(response)
        return response;
     }, error => {
       if (error.response.status === 401) {
        this.setState({disp:true})
       }
       return error;
     });
     if(this.state.review === '' || this.state.rating === 0){
      show_noty('error', 'Please fill up Review and also provide Ratings')
     }
     else{
      let newjs={
        'review':this.state.review,
        'ratings':parseInt(this.state.rating),
        
        
        'product_id':this.state.id,


      }
      axios.post('http://127.0.0.1:8000/pages/addreview/',newjs,{
        headers:{
         
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
           
        }
     })
     .then(res=>{
      this.getreview()
      this.setState({review:'',rating:0})
       
     })

     }
      
    }
    
    addcart=(e)=>{
      e.preventDefault()
      axios.interceptors.response.use(response => {
        console.log(response)
        return response;
     }, error => {
       if (error.response.status === 401) {
        this.setState({disp:true})
       }
       return error;
     });
      let token=localStorage.getItem('Token')
      if(this.state.size == 'Default'){
        show_noty('error', 'Please Select Size First')
      }
      else{
        const newjs={
          'quantity':this.state.quantity,
          'status':'Cart',
          'size':this.state.size,
          'product_id':this.state.id
        }
        axios.post('http://127.0.0.1:8000/pages/addtocart/',newjs,{
          headers:{
           
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
             
          }
       })
       .then(res=>{
        // console.log(res)
        //  if(res.status == 401){
        //    console.log('hi')
        //  }
        show_noty(res.data.status, res.data.text)
         console.log(res.data)
       })

      }
     
    }
    handler = (val) => {
      this.setState({
        disp: val
      })
    }
    render() {
        return (
            this.state.alldata.length !== 0 ?
<section className="product-details spad">
{this.state.disp ? <Try open={true} handler={this.handler}/> : null}
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="product__details__pic">
          <div className="product__details__pic__left product__thumb nice-scroll">
            {this.state.alldata.length !==0 ? Object.values(this.state.alldata[0].picture).map((v,i)=>(<a className="pt active" name={v} onClick={this.updimg}>
              <img src={process.env.PUBLIC_URL + "img/pembada/"+v} alt />
            </a>)) :null}
            {/* <a className="pt active" name="product-1.jpg" onClick={this.updimg}>
              <img src={process.env.PUBLIC_URL + "img/product/details/thumb-1.jpg"} alt />
            </a>
            <a className="pt" name="product-2.jpg" onClick={this.updimg}>
              <img src={process.env.PUBLIC_URL + "img/product/details/thumb-2.jpg"} alt />
            </a>
            <a className="pt" name="product-3.jpg" onClick={this.updimg}>
              <img src={process.env.PUBLIC_URL + "img/product/details/thumb-3.jpg"} alt />
            </a>
            <a className="pt" name="product-4.jpg" onClick={this.updimg}>
              <img src={process.env.PUBLIC_URL + "img/product/details/thumb-4.jpg"} alt />
            </a> */}
          </div>
          <div className="product__details__slider__content">
            <div className="product__details__pic__slider owl-carousel owl-loaded">
              <img data-hash="product-1" style={{width:'358px',height:'451px'}} className="product__big__img" src={this.state.mainimg !== '' ?process.env.PUBLIC_URL + `img/pembada/${this.state.mainimg}` : process.env.PUBLIC_URL + `img/pembada/Notavailable.png`} alt />
             
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="product__details__text">
          <h2>{this.state.alldata[0].name} <br/><span>Brand: {this.state.alldata[0].brand}</span></h2>
          <div className="rating">
          {this.state.avg !== 0 ? <span className="starRating">
            
            <input  type="radio" checked={this.state.avg === 5 ? true : false}    defaultValue={5} />
            <label>5</label>
            <input  type="radio" checked={this.state.avg === 4 ? true : false}    defaultValue={4} />
            <label>4</label>
            <input  type="radio" checked={this.state.avg === 3 ? true : false}   defaultValue={3} />
            <label >3</label>
            <input   type="radio" checked={this.state.avg === 2 ? true : false}   defaultValue={2} />
            <label >2</label>
            <input type="radio" checked={this.state.avg === 1 ? true : false}   defaultValue={1} />
            <label >1</label>
  
          </span> :<p>No Rating For this Product</p>}
          
          </div>
          <div className="product__details__price">Rs. {((this.state.alldata[0].price-((this.state.alldata[0].discount*this.state.alldata[0].price)/100))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} <span style={this.state.alldata[0].discount === 0 ? {display:'none'} : {display:'inile'}}>{this.state.alldata[0].price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span></div>
          <div className="product__details__widget">
            <ul>
              <li>
                <span>Availability:</span>
                <div className="stock__checkbox">
                  <label htmlFor="stockin">
                    In Stock
                    <input type="checkbox" id="stockin" checked={this.state.alldata[0].status === 'Instock' ? true : false}/>
                    <span className="checkmark" />
                  </label>
                </div>
              </li>
              
              <li>
                <span>Available size:</span>
                
                    {this.state.alldata[0].size === 'all' ?
                    <div className="size__btn">
                  <label htmlFor="xs-btn" className="active">
                    <button name='small'  style={ this.state.size === 'small' ? hvbtn: sizebtn} onClick={(e)=>{ e.preventDefault();this.setState({size:e.target.name})}}>
                    S
                    </button>
                  
                  </label>
                  <label htmlFor="s-btn" >
                  <button name='medium'  style={ this.state.size === 'medium' ? hvbtn: sizebtn} onClick={(e)=>{ e.preventDefault();this.setState({size:e.target.name})}}>
                   M
                    </button>
                  </label>
                  <label htmlFor="m-btn">
                  <button name='large' style={ this.state.size === 'large' ? hvbtn: sizebtn} onClick={(e)=>{ e.preventDefault();this.setState({size:e.target.name})}}>
                    L
                    </button>
                  </label>
                  <label htmlFor="l-btn">
                  <button name='xl'  style={ this.state.size === 'xl' ? hvbtn: sizebtn}  onClick={(e)=>{ e.preventDefault();this.setState({size:e.target.name})}}>
                    XL
                    </button>
                  </label>
                  </div>
                      : this.state.alldata[0].size === 'xl' ? <div className="size__btn"> <label htmlFor="l-btn">
 <button  style={ hvbtn}  onClick={(e)=>{ e.preventDefault(); this.setState({size:e.target.name})}}>
                    XL
                    </button>
        </label></div> : <div className="size__btn"><label htmlFor="l-btn" >
        <button name={this.state.alldata[0].size}  style={ hvbtn}  onClick={(e)=>{ e.preventDefault();this.setState({size:e.target.name})}}>
        { this.state.alldata[0].size.charAt(0).toUpperCase()}
                    </button>
                     
        </label></div>}
                
              </li>
          
            </ul>
          </div>
          <div style={{borderTop: '1px solid #ebebeb',paddingTop: '35px'}} className="product__details__button">
            <div className="quantity">
              <span>Quantity:</span>
              <div className="pro-qty">
              <span className='inc qtybtn' onClick={(e)=>{
                             console.log('hihihi')
                              if(this.state.quantity >=2){
                                this.setState({quantity:(this.state.quantity-1)})
                              }
                             
                         }}>-</span>
                <input name='quantity' onChange={this.changestaus} type="number" value={this.state.quantity} defaultValue={1} />
                <span className='inc qtybtn' onClick={(e)=>{
                             console.log('hihihi')
                       
                             this.setState({quantity:(this.state.quantity+1)})
                         }}>+</span>
              </div>
            </div>
            <button className="cart-btn" disabled={this.state.alldata[0].status !== 'Instock' ? true : false} style={{borderStyle:'none'}} onClick={this.addcart}><span className="icon_bag_alt" /> Add to cart</button>

          </div>
         
        </div>
      </div>
      <div className="col-lg-12">
        <div className="product__details__tab">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Specification</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews {this.state.allreview.length}</a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              <h6 style={fn}>Description</h6>
              <p style={{fontFamily: 'Graduate',fontSize: '16px'}}>{this.state.alldata[0].discription}</p>
            </div>
            <div className="tab-pane" id="tabs-2" role="tabpanel">
              <h6 style={fn}>Specification</h6>
              {Object.values(this.state.alldata[0].specs).length !== 0 ? Object.values(this.state.alldata[0].specs).map((val,i)=>(i > 6 ? <li style={{fontFamily: 'Graduate',fontSize: '16px', marginLeft:'10px', float:"right"}}>{val}</li> :<li style={{fontFamily: 'Graduate',fontSize: '16px',float:"left",marginLeft:'10px'}}>{val}</li>)) : <p style={{fontFamily: 'Graduate',fontSize: '16px'}}>No Speciication for this product</p>}
          
            </div>
            <div className="tab-pane" id="tabs-3" role="tabpanel">
        <h6 style={fn}>Reviews {this.state.allreview.length}</h6>
        {this.state.allreview.length !== 0 ? this.state.allreview.map((v)=>(<div style={{borderBottom:' 1px solid #ebebeb',borderTop:' 1px solid #ebebeb', marginBottom:'20px'}}>
          <span className="starRating">
                  <input  type="radio" checked={v.ratings === 5 ? true : false}    defaultValue={5} />
                  <label>5</label>
                  <input  type="radio" checked={v.ratings === 4 ? true : false}    defaultValue={4} />
                  <label>4</label>
                  <input  type="radio" checked={v.ratings === 3 ? true : false}   defaultValue={3} />
                  <label >3</label>
                  <input   type="radio" checked={v.ratings === 2 ? true : false}   defaultValue={2} />
                  <label >2</label>
                  <input type="radio" checked={v.ratings === 1 ? true : false}   defaultValue={1} />
                  <label >1</label>
        
                </span>
        <p>Reviewed by : {v.user_id.userid.username}</p>
          <p style={{fontFamily: 'Graduate',fontSize: '16px'}}>{v.review}</p>
          {v.review_reply !== "" ? <p style={{fontFamily: 'Graduate',fontSize: '16px',borderBottom:' 1px solid #ebebeb',borderTop:' 1px solid #ebebeb', color:'red'}}> <p>Replied by : Admin</p>{v.review_reply}</p> : null}
          <div className="form-group row" style={{borderTop:' 1px solid #ebebeb'}}>
{this.state.adm === 'admin' ? <div className="col-sm-12">
  <textarea className="form-control" style={{width:'600px',display:'inline',marginTop:'20px'}}  name='adreview' placeholder="Please Reply to Customers Review Here" onChange={this.changestaus} value={this.state.re} defaultValue={""} />
  <button style={{ marginLeft:'20px',display:'inline',position:'absolute',marginTop:'30px'}} onClick={this.updtrev(v.id)} type="button"className="site-btn">Reply review</button>
</div>: null }

</div>
          </div>)): <p style={{fontFamily: 'Graduate',fontSize: '16px'}}>No Review Of this Product</p>}
        {/* <p style={{fontFamily: 'Graduate',fontSize: '16px'}}>{this.state.alldata[0].discription}</p>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                consequat massa quis enim.</p>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem.</p> */}
                
                <div className="form-group row" style={{borderTop:' 1px solid #ebebeb'}}>

                
                <span className="starRating">
                  <input id="rating5" type="radio" checked={this.state.rating === '5' ? true : false}  onChange={this.changestaus} name="rating" defaultValue={5} />
                  <label htmlFor="rating5">5</label>
                  <input id="rating4" type="radio" checked={this.state.rating === '4' ? true : false} onChange={this.changestaus} name="rating" defaultValue={4} />
                  <label htmlFor="rating4">4</label>
                  <input id="rating3" type="radio" checked={this.state.rating === '3' ? true : false}  onChange={this.changestaus} name="rating" defaultValue={3} />
                  <label htmlFor="rating3">3</label>
                  <input id="rating2" type="radio" checked={this.state.rating === '2' ? true : false} onChange={this.changestaus} name="rating" defaultValue={2} />
                  <label htmlFor="rating2">2</label>
                  <input id="rating1" type="radio" checked={this.state.rating === '1' ? true : false}  onChange={this.changestaus} name="rating" defaultValue={1} />
                  <label htmlFor="rating1">1</label>
                </span>
                <div className="col-sm-12">
                  <textarea className="form-control" style={{width:'600px',display:'inline',marginTop:'20px'}}  name='review' placeholder="Please Insert Your Review Here here" onChange={this.changestaus} value={this.state.review} defaultValue={""} />
                  <button style={{ marginLeft:'20px',display:'inline',position:'absolute',marginTop:'30px'}} onClick={this.sendreview} type="button"className="site-btn">Add review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row" style={{marginTop:'50px'}}>
      <div className="col-lg-12 text-center">
        <div className="related__title">
          <h5>RELATED PRODUCTS</h5>
        </div>
      </div>
      {this.state.reldata.length!==0 ?this.state.reldata.slice(0,4).map((v,i)=>(
        <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="product__item">
        <a href={`prodet?page=${v.id}`}>
          <div className="product__item__pic set-bg" style={ { backgroundImage:`url(${process.env.PUBLIC_URL+"img/pembada/"+v.picture[1]})`}}>
          <div className="label new">New</div>
                   <ul className="product__hover">
                     
                   </ul>
                 </div>
                 <div className="product__item__text">
                   <h6 style={{fontFamily: 'Graduate',
    fontSize: '16px',
    color:' #111111'}}>{v.name}</h6>
             
                   <div className="product__price"style={v.discount === 0 ? fn : rfn}>RS: {((v.price-((v.discount*v.price)/100))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span style={v.discount == 0 ? {display:'none'} : {display:'inline'}}>{v.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span></div>
                 </div>
                 </a>
               </div>
               
             </div>

      )) :null}

    </div>
  </div>
</section>
:
<div>Loading</div>

        );
    }
}
const sizebtn={
    display:'inline-block',
    textAlign: 'center',
    minWidth:'48px',
    height:'48px',
    padding: '0 5px',
    margin:'0 4px 4px 0',
    fontSize:'16px',
    backgroundColor:'#fff',
    color:'#666666',
    border:' 1px solid #e5e5e5',
    transition: 'color .3s,background-color .3s,border-color .3s,opacity .3s',
    textIndent: '.01px',
    fontFamily: 'Gotham SSm A,Gotham SSm B,Arial,sans-serif',
    borderCollapse: 'collapse'


}
const hvbtn={
    display:'inline-block',
    textAlign: 'center',
    minWidth:'48px',
    height:'48px',
    padding: '0 5px',
    margin:'0 4px 4px 0',
    fontSize:'16px',
    backgroundColor:'#37ad90',
    color:'#fff',
    borderStyle:'none',
    transition: 'color .3s,background-color .3s,border-color .3s,opacity .3s',
    textIndent: '.01px',
    fontFamily: 'Gotham SSm A,Gotham SSm B,Arial,sans-serif',
    borderCollapse: 'collapse'


}
const fn={
  fontFamily: 'Graduate',fontSize: '16px'
}

const rfn={
fontFamily: 'Graduate',fontSize: '16px',color: '#ca1515'
}

export default Productdetails;