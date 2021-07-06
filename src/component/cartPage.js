import React from 'react';
import axios from '../../node_modules/axios';
import Header from './header.js';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {AmountCart,AddCart,Order} from "../action.js"
import {formatMoney} from './globalFunc.js'
import {Link} from 'react-router-dom'

let Div=styled.div`

  .cart-table{
    margin-top:50px;
    .cart-table-products 
    {
      width:100%;
    }
    svg {
      opacity:0.5;
      transition:0.2s;
    }
    svg:hover{
      opacity:1;
      font-size:18px;
    }
    table,th,td{
      border:1px solid #bebebe;
      border-collapse: collapse;
      text-align:center;
      th{
        padding: 20px 30px;
      }
      th:nth-child(2){
        width:20%;
      }
      th:nth-child(3){
        width:26%;
      }
      th:nth-child(4){
        width:16%;
      }
      .group-btn{
        display:inline-flex;
        justify-content:center;
        border: 1px solid #e1e1e1;
        button{
          width:24px;
          border:none;
          outline:none;
          font-size:22px;
        }
        input{
          width:30px;
          text-align:center;
          border:none;
        }
      }
    }
    .total-price {
      margin-top:30px;
      float:right;
      tr th{
        width:150px;
      }
      .btn-control{
        margin:30px 0;
        text-align:right;
        .btn:last-child {
          margin-left:10px;
        }
      }
    }
  }
`
class CartPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
      cart:[],
      sumNoVAT:0,
      sum:0,
      vat:0,
      amountCart:0,
      itemsSelected:[],
      calculatePrice:(arr)=>{
        let sum=0;
        arr.forEach((item,index)=>{
          sum += item.price*item.amount;
        })
        return {sum:sum,vat:sum*0.1}
      }
      
    }
  }
  componentDidMount(){
    //console.log(this.props.cartDb)
  }
  static getDerivedStateFromProps(props,state){
    let sumPrice = state.calculatePrice(state.itemsSelected);
    return {cart:props.cart, sum:sumPrice.sum+sumPrice.vat, vat:sumPrice.vat, sumNoVAT:sumPrice.sum}
  }
  handleDelete=(e,obj,index,num)=>{
    let cartDb = {...this.props.cartDb};
    let cart = this.props.cart;
    if(num!=undefined){
      if(obj.amount>1 || num>0){
        cartDb.cart[index].amount += num;
        cart[index].amount += num;
      }
    }
    else{
      cartDb.cart.splice(index,1);
      cart.splice(index,1);
    }
    axios.patch("http://localhost:3001/carts/"+cartDb.id,cartDb)
    .then(response=>{
      console.log(response.data);
      this.props.dispatch(AddCart(cart,response.data));
    }).catch(err=>{
      console.log(err)
    })
  }
  handleAmount=(num,obj,index)=>{
    this.handleDelete(null,obj,index,num);
  }
  handleCheck=(e,item)=>{
    let copyItems =this.state.itemsSelected;
    if(e.target.checked){
      copyItems.push(item);

    }
    else{
      copyItems.forEach((item2,index)=>{
        if(item2==item){
          copyItems.splice(index,1);
        }
      })
    }
    let sumPrice = this.state.calculatePrice(copyItems);
    this.setState({
      itemsSelected: copyItems,
      sumNoVAT: sumPrice.sum,
      vat:sumPrice.vat,
      sum:sumPrice.sum+sumPrice.vat
    })
  }
  handleOrder=()=>{
    this.props.dispatch(Order(this.state.itemsSelected));
  }
  render(){
    const listCart = this.state.cart.map((item,index)=>{
      return(
          <tr>
            <td><input onClick={(e)=>{this.handleCheck(e,item)}} type="checkbox"/></td>
            <td><img height="140" src={item.img} alt={item.name}/></td>
            <td>{item.name}</td>
            <td>{formatMoney(item.price)}<sup>đ</sup></td>
            <td><div className="group-btn"><button onClick={(e)=>this.handleAmount(-1,item,index)}>-</button><input type="text" value={item.amount}/><button onClick={(e)=>this.handleAmount(1,item,index)}>+</button></div></td>
            <td>{formatMoney(item.amount*item.price)}<sup>đ</sup></td>
            <td onClick={(e)=>this.handleDelete(e,item,index)} ><FontAwesomeIcon icon={faTrashAlt}/></td>
          </tr>
        )
    })
    return ( 
      <Div className="CartPage">
        <Header/>
        <div className="cart-table wrap">
          <div className="cart-table-products">
             <table>
                <thead>
                  <tr>
                    <th>CHỌN</th>
                    <th>SẢN PHẨM</th>
                    <th>THÔNG TIN</th>
                    <th>ĐƠN GIÁ</th>
                    <th>SỐ LƯỢNG</th>
                    <th>THÀNH TIỀN</th>
                    <th>XÓA</th>
                  </tr>
                </thead>
                <tbody>
                  {listCart}
                </tbody>
             </table>
          </div>
          <div className="total-price">
              <table>
                 <tr>
                   <th>Tổng tiền:</th>
                   <th>{formatMoney(this.state.sumNoVAT)}<sup>đ</sup></th>
                 </tr>
                 <tr>
                   <th>Thuế (vat):</th>
                   <th>{formatMoney(this.state.vat)}<sup>đ</sup></th>
                 </tr>
                 <tr>
                   <th>Thanh toán:</th>
                   <th style={{color:"red"}}>{formatMoney(this.state.sum)}<sup>đ</sup></th>
                 </tr>
              </table>
              <div className="btn-control">
                <Link to="/"><button className="btn">TIẾP TỤC MUA HÀNG</button></Link>
                <Link to="/order"><button className="btn" onClick={this.handleOrder}>MUA HÀNG</button></Link>
              </div>
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
    user: state.user,
    amountCart:state.amountCart,
    cart: state.cart,
    cartDb:state.cartDb
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartPage);