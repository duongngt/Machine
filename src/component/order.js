import React from 'react';
import Header from './header.js';
import axios from '../../node_modules/axios';
import styled from 'styled-components';
import {connect} from 'react-redux';

class Order extends React.Component {

  render(){
    console.log(this.props.order)
    return ( 
      <div className="order">
      	<Header/>
        <div className="order-table wrap">
          
        </div>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
const mapStateToProps=(state)=>{
  return{
    user: state.user,
    order: state.order
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Order);