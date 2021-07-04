import React from 'react';
import ProductInf from './productInf.js';

class ListProducts extends React.Component {
  render(){
  	let styListpro = {
  		display:"grid",
  		gridTemplateColumns: "auto auto auto",
      gap:"1em",
  	}
  	const list = this.props.products.map((item,index) =>{
  		return(
  				<ProductInf  key={index} objDetail={item}/>
  			)
  	})		
    return ( 
      <div className="ListProducts" style={styListpro}>
      		{list}
      </div>
    );
  }
}

export default ListProducts;