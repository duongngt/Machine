import React from 'react';
import axios from '../../node_modules/axios';
import Header from './header.js';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {AmountCart,AddCart} from "../action.js"
import {formatMoney} from './globalFunc.js'

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
      amountCart:0
      
    }
  }
  componentDidMount(){
    console.log(this.props.cartDb)
  }
  static getDerivedStateFromProps(props, state){
    return{cart:props.cart}
  }
  handleDelete=(e,obj,index)=>{

   /* var sum = 0;
    for(let i=0; i<this.state.cart.length; i++){
      if(this.state.cart[i]==obj){
        sum = this.props.amountCart - this.state.cart[i].amount;
        this.state.cart.splice(i,1);
        this.props.dispatch(AddCart(this.state.cart));
        localStorage.setItem("amountCart",sum);
        localStorage.setItem("cart",JSON.stringify(this.state.cart));
        break;
      }*/
   /* }
    this.props.dispatch(AmountCart(sum));
    this.setState({
      cart: this.state.cart
    });*/
    let cartDb = {...this.props.cartDb};
    let cart = this.props.cart;
    cartDb.cart.splice(index,1);
    cart.splice(index,1);
    axios.patch("http://localhost:3001/carts/"+cartDb.id,cartDb)
    .then(response=>{
      console.log(response.data);
      this.props.dispatch(AddCart(cart,response.data));
    }).catch(err=>{
      console.log(err)
    })
  }
  render(){
    let sumPrice = 0
    let Vat = 0
    let total = 0
    this.state.cart.map((item,index)=>{
      sumPrice += item.price*item.amount;
      return sumPrice;
    })
    Vat = sumPrice*0.1;
    total = sumPrice + Vat;
    const listCart = this.state.cart.map((item,index)=>{
      return(
          <tr>
            <td>{index}</td>
            <td><img src={item.img} alt={item.name}/></td>
            <td>{item.name}</td>
            <td>{formatMoney(item.price)}<sup>đ</sup></td>
            <td>{item.amount}</td>
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
                    <th>STT</th>
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
                   <th>{formatMoney(sumPrice)}<sup>đ</sup></th>
                 </tr>
                 <tr>
                   <th>Thuế (vat):</th>
                   <th>{formatMoney(Vat)}<sup>đ</sup></th>
                 </tr>
                 <tr>
                   <th>Thanh toán:</th>
                   <th style={{color:"red"}}>{formatMoney(total)}<sup>đ</sup></th>
                 </tr>
              </table>
              <div className="btn-control">
                <button className="btn">TIẾP TỤC MUA HÀNG</button>
                <button className="btn">THANH TOÁN</button>
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