import React from 'react';
import Header from './component/header.js';
import HotProducts from './component/hotProducts.js';
import NewProduct from './component/newProduct.js';
import Intro from './component/intro.js'
import {connect} from 'react-redux';
import styled from 'styled-components';
import SellingProduct from './component/sellingProduct.js';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    let Div = styled.div`
      margin-top:30px;
      display:flex;
      justify-content:space-between;
      img{
        width:49%;
      }
    `
  	//console.log(this.props.categories);
    return ( 
      <div className="homePage">
      	<Header/>
        <Intro/>
      	<HotProducts/>
        <NewProduct/>
        <Div className="wrap">
          <img src="https://i.ibb.co/1K5XC9V/banner-1.png" alt=""/>
          <img src="https://i.ibb.co/pXnnWkX/banner-2.png" alt=""/>
        </Div>
        <SellingProduct/>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
	return{
		categories: state.categories
	}
}

export default connect(mapStateToProps,null) (HomePage);