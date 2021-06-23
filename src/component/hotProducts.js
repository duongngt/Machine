import React from 'react';
import ListProducts from './listProducts.js';
import MenuPanel from './menuPanel.js'
import axios from '../../node_modules/axios';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge,faCaretLeft,faCaretRight } from '@fortawesome/free-solid-svg-icons'

class HotProducts extends React.Component {
	constructor(props){
		super(props);
		this.state={
			products:[]
		}
	}
	componentDidMount(){
    axios.get("http://localhost:3001/products?status=hot")
    .then(response=>{
      this.setState({
        products:response.data
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){
  	//console.log(this.props.styStatus);
  	let styHotPro = {
  		display: "grid",
  		gridTemplateColumns: "25% 1fr",
      marginTop:"50px",
      gridColumnGap:"20px"      
  	}
    let styTitle = {
      gridColumn :"1/3",
      gridRow:"1",
      marginBottom:"50px",
      display:"flex",
      justifyContent: "space-between"
    }
    let styButton = {
      padding:"6px 10px",
      border:"1px solid grey"
    }
    return ( 
      <div className="ShowProducts wrap" style={styHotPro}>
        <div style={styTitle}>
          <h3 style={{fontWeight: "normal"}}><FontAwesomeIcon icon={faThLarge} style={{color:"#f5bd10"}} /> SẢN PHẨM NỔI BẬT </h3>
          <div style={{width:"60px",display:"flex",justifyContent:"space-between"}}>
            <FontAwesomeIcon icon={faCaretLeft} style={styButton} />
            <FontAwesomeIcon icon={faCaretRight} style={styButton} />
          </div>
        </div>
      	{(this.props.categories!=undefined)? <MenuPanel categories={this.props.categories}/> : null }
      	<ListProducts products={this.state.products}
          changeCountCart={this.props.changeCountCart}
          />
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
	//console.log(state.categories);
	return{
    categories:state.categories
	}
}
export default connect(mapStateToProps,null)(HotProducts);