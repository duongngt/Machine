import React from 'react';
import axios from '../../node_modules/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {ShowProductDetail,ShowPopupLogin,AmountCart,AddCart,Notify} from "../action.js"
import {formatMoney,AddToCart} from './globalFunc.js'

class ProductInf extends React.Component {
  handleOrder=(e)=>{
    //console.log(this.props.cartDb)
    AddToCart(this.props,1,(cart, cartDb)=>{
      if(cart!=undefined){
        this.props.dispatch(AddCart(cart, cartDb));
        this.props.dispatch(Notify("block",{text:"Đã thêm thành công",buttons:[{text:"Xem giỏ hàng"}]}));
      }
      else{
        this.props.dispatch(ShowPopupLogin("block"))
      }
    });
    // if(this.props.user!=null){
    //   let hasExist = false, amount = 0;
    //   let objCartDb = {...this.props.cartDb};
    //   let myCartDb = (objCartDb.cart==undefined)? [] : objCartDb.cart;
    //   let myCart = [...this.props.cart];
    //   for(var i=0; i<myCartDb.length; i++){
    //     if(myCartDb[i].productId == this.props.item.id){
    //       myCartDb[i].amount++;
    //       myCart[i].amount++;
    //       hasExist = true;
    //       break;
    //     }
    //   }
    //   let objCart ={
    //     userId: this.props.user.id,
    //     cart: myCartDb
    //   }
    //   if(!hasExist){
    //     amount++;
    //     myCartDb.push({
    //       productId: this.props.item.id,
    //       amount: amount
    //     })
    //     let objPro = {...this.props.item};
    //     objPro.amount = amount;
    //     myCart.push(objPro);
        
    //   }
    //   if(this.props.cartDb.cart==undefined){
    //     // post data----
    //     axios.post("http://localhost:3001/carts",objCart)
    //     .then(response=>{
    //       this.props.dispatch(AddCart(myCart, response.data));
    //       this.props.dispatch(Notify("block",{text:"Đã thêm thành công",buttons:[{text:"Xem giỏ hàng"}]}));
    //     }).catch((err)=>{
    //       console.log(err);
    //     })
    //   }
    //   else{
    //     axios.patch("http://localhost:3001/carts/"+this.props.cartDb.id, objCart)
    //     .then(response=>{
    //       this.props.dispatch(AddCart(myCart, response.data));
    //       this.props.dispatch(Notify("block",{text:"Đã thêm thành công",buttons:[{name:"Xem giỏ hàng"}]}));
    //     })
    //   }
    // }else{
    //   this.props.dispatch(ShowPopupLogin("block"))
    // }
  }
  viewDetail=(e,obj)=>{
    this.props.dispatch(ShowProductDetail(obj));
    localStorage.setItem("objDetail",JSON.stringify(obj));
  }
  render(){		
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
        <Link to ='/detailProduct' onClick={(e)=>this.viewDetail(e,this.props.objDetail)}>
          <img className="image" src={this.props.objDetail.img}
          style={{margin:"30px auto 36px"}}/>
        </Link>
       
        <div className="content">
             <p class="price" style={styPrice}>
            {formatMoney(this.props.objDetail.price)}</p>
            <h4 class="name" style={styName}>{this.props.objDetail.name}</h4>
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
              <button class="buy btn" onClick={this.handleOrder}>Add to cart</button>
              <Link to ='/detailProduct'>
                <button class="details btn" onClick={(e)=>this.viewDetail(e,this.props.objDetail)}>Xem chi tiết</button>
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
const mapStateToProps=(state)=>{
  return{
    user:state.user,
    amountCart: state.amountCart,
    cart: state.cart,
    cartDb: state.cartDb
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductInf);