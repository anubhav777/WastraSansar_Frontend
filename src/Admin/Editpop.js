import React, { Component } from 'react';
import Popup from 'reactjs-popup'
class Editpop extends Component {
    render() {
        return (
            
            <Popup  trigger={<button type="button" className="btn btn-primary" >Update</button>} modal>
            {close => (
              <div style={{width:'100%',marginTop:'10px'}}>
         


    <div className="container">
    <input type="image" id="imgbtn" style={{width:'32px',height:'32px', position:'absolute',marginLeft:'-25px',zIndex: 2,marginTop: '-10px'}}  src="https://image.flaticon.com/icons/png/512/106/106830.png"  alt="Tool Tip" onClick={close}/>
    <div className="card" style={{background:'#fafafa'}}>

      <form className="form-horizontal">
        <div className="card-body">
          <h4 className="card-title" style={{float:'left',position:'absolute'}}>Update Trends</h4><br/>
         
          <div className="form-group row">
          
            <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Choose Products</label>
            <div className="col-sm-6">
                
            <select name='deltype' >
                                          <option>Select</option>
                                          <option value="Default">Default</option>
                                              <option  value="Delivery_pay">Delivery_pay</option>
                                              <option  value="Esewa">Esewa</option>
                                             
                                      </select>
                                      <div class="select-icon">
        <svg focusable="false" viewBox="0 0 104 128" width="25" height="35" class="icon">
          <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
        </svg>
      </div>
           
            </div>
          </div>

          
        </div>
        <div className="border-top">
          <div className="card-body">
            <button type="submit" className="btn btn-success" style={{float:'left'}}  >Update</button>
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

export default Editpop;