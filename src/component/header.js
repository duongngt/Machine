import React from 'react';
import NavRegister from './navRegister.js';
import NavBran from './navBran.js';

class Header extends React.Component {
  render(){
    return ( 
      <div className="Header">
       <NavRegister/>
       <NavBran countCart={this.props.countCart}/>
      </div>
    );
  }
}

export default Header;