import React, { Component } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Loginpop from '../Users/Loginpop';
import Try from '../Users/Try';
import show_noty from '../Users/Notify'

class Shop extends Component {
    state={
        brand:'Default',
        size:'Default',
        price:'Default',
        category:'Default',
        search:'Default',
        subcategory:'Default',
        pricstat:false,
        min:1000,
        max:2000,
        alldata:[],
        offset: 0,
      perPage: 12,
      currentPage: 0,
      disp:false,
      femsub:[],
      malsub:[],
      childsub:[]
    }
    componentDidMount(){
        let hre=window.location.href
        let srch=hre.includes("search=")
        let newcat=null
        this.updtcat()
        if(srch){
        let category=hre.split('search=',2)[1]
         newcat=category.split("/",2)
        let cat=newcat[0]
        this.setState({search:cat})
      
        }
        else{
          let category=hre.split('page=',2)[1]
           newcat=category.split("/",2)
          let cat=newcat[0]
          this.setState({category:cat})
        }
       console.log(srch)
        let strchecker=hre.includes("sub_cat_")
        let subcat='Default'
        if (strchecker){
           subcat=newcat[1].split("sub_cat_")[1]
        }
        console.log(subcat)
        this.setState({subcategory:subcat},()=>{
            this.getdata()
        })
        console.log(hre)
    }
    changestaus=(e)=>{
      this.setState({[e.target.name]:e.target.value})
 
  }
  chmginp=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>{
      this.getdata()
    })
    
  }
  addcart=(id,size)=>(e)=>{
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

      const newjs={
        'quantity':1,
        'status':'Cart',
        'size':size,
        'product_id':id
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
      if(res.data.status === 'success'){
        console.log(res.data.status)
          show_noty('alert', 'Product has been added to your cart Thank You!!')
      }
      
     })

    
   
  }
  updtcat=()=>{
    let arrcub=['Men','Women','Children']
    arrcub.map((v)=>{
      console.log(v)
      axios.get('http://127.0.0.1:8000/pages/brandat/',{
        headers:{
         
           'status':v,
        }
     })
     .then(res=>{
       console.log(res.data.data)
       if(v == 'Men'){
        this.setState({malsub:res.data.data})
       }
       else if(v == 'Women'){
        this.setState({femsub:res.data.data})
       }
       else{
        this.setState({childsub:res.data.data})
       }
       
     })
    })
  }
  addwish=(id)=>(e)=>{
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

      const newjs={

        'productid':id
      }
      axios.post('http://127.0.0.1:8000/pages/wishreq/',newjs,{
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
       console.log(res.data)
     })

  }
    getdata=()=>{
        axios.get('http://127.0.0.1:8000/pages/getuserfiltproduct/',{
        headers:{
         
           'brand':this.state.brand,
           'size':this.state.size,
           'price':this.state.price,
           'category':this.state.category,
           'subcategory':this.state.subcategory,
           'search':this.state.search
           

        }
     })
     .then(res=>{

       this.setState({alldata:res.data.data, pageCount:Math.ceil(res.data.data.length / this.state.perPage)})
     })
    }
    handler = (val) => {
      this.setState({
        disp: val
      })
    }
    
  handlePageChange=(e)=>{
    const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, );
  }
    render() {
        
        return (
            
<div>
  {this.state.disp ? <Try open={true} handler={this.handler}/> : null}
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
  <section className="shop spad">
    <div className="container" style={{maxWidth:'1324px'}}>
      <div className="row">
        <div className="col-lg-3 col-md-3">
          <div className="shop__sidebar">
            <div className="sidebar__categories">
              <div className="section-title">
                <h4>Categories</h4>
              </div>
              <div className="categories__accordion">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className={this.state.category == 'Women' ? "card-heading active" :'card-heading'}>
                      <a data-toggle="collapse" data-target="#collapseOne">Women</a>
                    </div>
                    <div id="collapseOne" className="collapse"data-parent="#accordionExample">
                      <div className="card-body">
                        <ul>
        {this.state.femsub.length !==0 ? this.state.femsub.map((v)=>(<li><a href={`/shop?page=Men/sub_cat_${v.brandname}`}>{v.brandname}</a></li>)) :<li>No Sub Category</li>}
                          {/* <li><a href="#">Coats</a></li>
                          <li><a href="#">Jackets</a></li>
                          <li><a href="#">Dresses</a></li>
                          <li><a href="#">Shirts</a></li>
                          <li><a href="#">T-shirts</a></li>
                          <li><a href="/shop?page=Women/sub_cat_pants">Jeans</a></li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className={this.state.category == 'Men' ? "card-heading active" :'card-heading'}>
                      <a data-toggle="collapse" data-target="#collapseTwo">Men</a>
                    </div>
                    <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                      <div className="card-body">
                        <ul>
                        {this.state.malsub.length !==0 ? this.state.malsub.map((v)=>(<li><a href={`/shop?page=Men/sub_cat_${v.brandname}`}>{v.brandname}</a></li>)) :<li>No Sub Category</li>}
                          {/* <label htmlFor="blues">
                  Jordan
                  <input onChange={this.chmginp} name="brand" checked={this.state.brand == 'nike' ? true : false} value="nike" type="checkbox" id="blues" />
                  <span className="checkmark" />
                </label> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className={this.state.category == 'Children' ? "card-heading active" :'card-heading'}>
                      <a data-toggle="collapse" data-target="#collapseThree">Kids</a>
                    </div>
                    <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                      <div className="card-body">
                        <ul>
                        {this.state.childsub.length !==0 ? this.state.childsub.map((v)=>(<li><a href={`/shop?page=Men/sub_cat_${v.brandname}`}>{v.brandname}</a></li>)) :<li>No Sub Category</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
 
                </div>
              </div>
            </div>
            <div className="sidebar__filter" style={{marginBottom:'20px'}}>
              <div className="section-title" style={{marginBottom:'20px'}}>
                <h4>Shop by price</h4>
              </div>
              <div className="filter-range-wrap">
             
                <input name='min'style={inp}  onChange={this.changestaus} type="number"  defaultValue={1000}/>
             
              
                <input name='max' style={{  width:'100px',
  height: '50px',
  border: '1px solid #ebebeb',
    borderRadius: '50px',
    padding: '0 20px',
    overflow: 'hidden',
    display:'inline-block',
    marginLeft:'10px'
}}  onChange={this.changestaus} type="number" defaultValue={2000} />
        
              </div>
              <button style={{marginLeft:'50px',marginTop:'20px'}} onClick={(e)=>{
                e.preventDefault()
                let newprice=`${this.state.min} - ${this.state.max}`
                this.setState({price:newprice},()=>{
                  this.getdata()
                })

              }} type="submit" class="site-btn">Filter</button>
            </div>
            <div className="sidebar__sizes">
              <div className="section-title">
                <h4>Shop by size</h4>
              </div>
              <div className="size__list">
                <label htmlFor="s">
                  s
                  <input onChange={this.chmginp} name="size" value="small" checked={this.state.size == 'small' ? true : false} type="checkbox" id="s" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="m">
                  m
                  <input onChange={this.chmginp} name="size" checked={this.state.size == 'medium' ? true : false} value="medium" type="checkbox" id="m" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="l">
                  l
                  <input onChange={this.chmginp} name="size" checked={this.state.size == 'large' ? true : false} value="large" type="checkbox" id="l" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="xl">
                  xl
                  <input onChange={this.chmginp} name="size" checked={this.state.size == 'xl' ? true : false} value="xl" type="checkbox" id="xl" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="all">
                  all
                  <input onChange={this.chmginp} name="size" checked={this.state.size == 'all' ? true : false} value="all" type="checkbox" id="all" />
                  <span className="checkmark" />
                  
                </label>
                <label htmlFor="Default">
                Default
                  <input onChange={this.chmginp} name="size" checked={this.state.size == 'Default' ? true : false} value="Default" type="checkbox" id="Default" />
                  <span className="checkmark" />
                  
                </label>
              </div>
            </div>
            <div className="sidebar__color">
              <div className="section-title">
                <h4>Shop by Brand</h4>
              </div>
              <div className="size__list color__list">
                <label htmlFor="black">
                  Nike
                  <input onChange={this.chmginp} name="brand" checked={this.state.brand == 'nike' ? true : false} value="nike" type="checkbox" id="black" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="whites">
                  Goldstar
                  <input onChange={this.chmginp} name="brand" checked={this.state.brand == 'gd' ? true : false} value="gd" type="checkbox" id="whites" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="reds">
                  Adidas
                  <input onChange={this.chmginp} name="brand" checked={this.state.brand == 'adidas' ? true : false} value="adidas" type="checkbox" id="reds" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="greys">
                  Under Armour
                  <input onChange={this.chmginp} name="brand" checked={this.state.brand == 'under' ? true : false} value="under" type="checkbox" id="greys" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="blues">
                  Jordan
                  <input onChange={this.chmginp} name="brand" checked={this.state.brand == 'nike' ? true : false} value="nike" type="checkbox" id="blues" />
                  <span className="checkmark" />
                </label>
             
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-9">
          <div className="row">
          
        
                    { this.state.alldata.length !== 0 ? this.state.alldata.slice(this.state.offset, this.state.offset + this.state.perPage).map((val,i)=>(
                            <div className="col-lg-3 col-md-5">
                            <div className="product__item">
                            {/* style={ { style={ { backgroundImage:`url(${process.env.PUBLIC_URL+ "img/categories/category-2.jpg"})`}} */}
                              <div className="product__item__pic set-bg" style={ { backgroundImage:`url(${process.env.PUBLIC_URL+"img/pembada/"+val.picture[1]})`}}>
                                {val.status === 'outofstock' ?  <div className="label stockout">out of stock</div> : val.discount != 0 ? <div className="label sale">Sale</div>:<div className="label new">New</div> }
                               
                                <ul className="product__hover">
                                  <li><a href={`prodet?page=${val.id}`} className="image-popup"><span className="arrow_expand" /></a></li>
                                  <li><div onClick={this.addwish(val.id) }><span className="icon_heart_alt" /></div></li>
                                  <li><div onClick={this.addcart(val.id,val.size) }><span className="icon_bag_alt" /></div></li>
                                </ul>
                              </div>
                              <div className="product__item__text">
                                <h6><a href="#" style={{fontFamily: 'Graduate',fontSize: '16px'}}>{val.name}</a></h6>
                             
                    <div className="product__price" style={val.discount === 0 ? fn : rfn}>RS: {((val.price-((val.discount*val.price)/100))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span style={val.discount == 0 ? {display:'none'} : {display:'inline'}}>{val.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span></div>
                              </div>
                            </div>
                          </div>
                    )): <section class="hearr">
                      <img style={{width:'100px'}} src='https://www.religiouskart.com/Cart%20Empty%20Icon.png'/>
                    <h1>No Products Avilable</h1>
                   
                </section>
                }
            <div className="col-lg-12 text-center">
            <ReactPaginate
                    previousLabel={<i className='fa fa-angle-left'/>}
                    nextLabel={<i className='fa fa-angle-right'/>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageChange}
                    containerClassName={"pagination__option"}
                    subContainerClassName={"pagination__option"}
                    activeClassName={"active"}/>
              
            </div>
          </div>
     
        </div>
      </div>
    </div>
  </section>
  </div>

  );


    }
}
const fn={
    fontFamily: 'Graduate',fontSize: '16px'
}
const rfn={
  fontFamily: 'Graduate',fontSize: '16px',color: '#ca1515'
}
const inp={
  width:'100px',
  height: '50px',
  border: '1px solid #ebebeb',
    borderRadius: '50px',
    padding: '0 20px',
    overflow: 'hidden',
    display:'inline-block',


}
export default Shop;