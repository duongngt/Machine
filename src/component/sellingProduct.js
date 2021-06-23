import React from 'react';
import MenuMini from "./menuMini.js";
import axios from '../../node_modules/axios';
import ProductInf from "./productInf";
import styled from 'styled-components';

class SellingProduct extends React.Component {
  constructor(props){
    super(props);
    this.state={
    	products:[]
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/products?status=selling")
    .then(response=>{
      this.setState({
        products:response.data
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){
  	let styProduct = {
  		display:'grid',
  		gridTemplateColumns: "repeat(4,1fr)",
      gridTemplateRow:"2",
  		gridGap:"20px"
  	}
    let Div = styled.div`
      div:nth-child(1){
        grid-column: 1;
        grid-row: 1;
      }
      div:nth-child(2){
        grid-column: 4;
        grid-row: 1;
      }
      div:nth-child(3){
        grid-column: 2/4;
        grid-row: 1/3;
      }
      div:nth-child(4){
        grid-column: 1;
        grid-row: 2;
      }
      div:nth-child(5){
        grid-column: 4;
        grid-row: 2;
      }
    `
  	const listProduct = this.state.products.map((item,index)=>{
  		return(
  			<ProductInf key={index} item={item}/>
  		)
  	})
    return ( 
      <div className="sellingProduct wrap">
      	<MenuMini/>
      	<Div style={styProduct} >{listProduct}</Div>
      </div>
    );
  }
}

export default (SellingProduct);