import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {ShowProductDetail} from "../action.js"
class ProductInf extends React.Component {
  handleOrder=(e)=>{
    var countCart = localStorage.getItem('countCart');
    countCart=(countCart==null)? 1 : (parseInt(countCart) + 1);
    this.props.changeCountCart(countCart);
  }
  viewDetail=(e,obj)=>{
    this.props.dispatch(ShowProductDetail(obj));
    localStorage.setItem("objDetail",JSON.stringify(obj));
  }
  render(){		
    //console.log(this.props.changeCountCart);
    const Div = styled.div`
        position:relative;
        text-align:center;
        box-shadow:0px 0px 5px #e1e1e1;
        overflow:hidden;
        &:hover{
          box-shadow:0px 0px 15px #e1e1e1;
        }
        &:hover img {
          transform: scale(1.2);
        }
        img {
          transition:0.3s;
        }
    `
    let styPrice = {
      color:"#ff0000",
      fontSize:"14px",
      marginBottom:"14px",
    }
    let styName = {
      fontSize:"14px",
      marginBottom:"14px",
    }
    let evaluate = {
      display:"flex",
      justifyContent: "center",
      marginBottom:"14px",
    }
    let evaluateText = {
      display:"flex",
      alignItems:"center",
      color:"#757373",
      fontSize:"12px",
    }
    let styBntGr = {
      display:"flex",
      justifyContent: "center", 
      gap:"4px",marginBottom:"14px",
    }
    let styBntProduct = {
      width: "112px",
      height: "40px",
      backgroundColor: "#252525",
      border: "none",
      color: "#ffffff",
    }
    return ( 
      <Div className="ProductInf">
        <Link to ='/detailProduct' onClick={(e)=>this.viewDetail(e,this.props.item)}>
          <img className="image" src={this.props.item.img}
          style={{margin:"30px auto 36px"}}/>
        </Link>
       
        <div className="content">
             <p class="price" style={styPrice}>
            {this.props.item.price}</p>
            <h4 class="name" style={styName}>{this.props.item.name}</h4>
            <div class="evaluate" style={evaluate}>
              <ul style={{display:"flex",color:"#f5bd10"}}>
                <li><FontAwesomeIcon icon={faStar}/></li>
                <li><FontAwesomeIcon icon={faStar}/></li>
                <li><FontAwesomeIcon icon={faStar}/></li>
                <li><FontAwesomeIcon icon={faStar}/></li>
                <li><FontAwesomeIcon icon={faStar}/></li>
              </ul>
              <p style={evaluateText}>(12 đánh giá )</p>
            </div>
            <div class="button" style={styBntGr}>
              <button class="buy" style={styBntProduct} onClick={this.handleOrder}>Add to cart</button>
              <Link to ='/detailProduct'>
                <button class="details" style={styBntProduct} onClick={(e)=>this.viewDetail(e,this.props.item)}>Xem chi tiết</button>
              </Link>             
            </div>
        </div>           
      </Div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
 }
export default connect(null,mapDispatchToProps)(ProductInf);