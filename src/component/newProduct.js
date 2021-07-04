import React from 'react';
import MenuMini from "./menuMini.js";
import axios from '../../node_modules/axios';
import ProductInf from "./productInf";


class NewProduct extends React.Component {
  constructor(props){
    super(props);
    this.state={
    	products:[]
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/products?status=new")
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
  		gridTemplateColumns: "repeat(3,1fr)",
  		gridColumnGap:"20px"
  	}
  	const listProduct = this.state.products.map((item,index)=>{
  		return(
  			<ProductInf key={index} objDetail={item}/>
  		)
  	})
    return ( 
      <div className="newProduct wrap">
      	<MenuMini/>
      	<div style={styProduct} >{listProduct}</div>
      </div>
    );
  }
}

export default (NewProduct);