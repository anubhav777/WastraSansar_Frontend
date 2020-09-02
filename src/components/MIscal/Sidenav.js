import React, { Component } from 'react';

class Sidenav extends Component {
    render() {
        return (
            <div>

  <div id="preloder">
    <div className="loader" />
  </div>
  {/* Offcanvas Menu Begin */}
  <div className="offcanvas-menu-overlay active" />
  <div className="offcanvas-menu-wrapper active">
    <div className="offcanvas__close">+</div>
    <ul className="offcanvas__widget">
      <li><span className="icon_search search-switch" /></li>
      <li><a href="#"><span className="icon_heart_alt" />
          <div className="tip">2</div>
        </a></li>
      <li><a href="#"><span className="icon_bag_alt" />
          <div className="tip">2</div>
        </a></li>
    </ul>
    <div className="offcanvas__logo">
      <a href="./index.html"><img src="img/logo.png" alt /></a>
    </div>
    <div id="mobile-menu-wrap" />
    <div className="offcanvas__auth">
      <a href="#">Login</a>
      <a href="#">Register</a>
    </div>
  </div>
</div>

           
        );
    }
}

export default Sidenav;