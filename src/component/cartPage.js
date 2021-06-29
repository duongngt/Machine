import React from 'react';
import axios from '../../node_modules/axios';
import Header from './header.js';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {AmountCart,AddCart} from "../action.js"


let Div=styled.div`

  .cartList{
    margin-top:50px;
    table{
      width:100%;
    }
    table,th,td{
      border:1px solid #bebebe;
      border-collapse: collapse;
      text-align:center;
      th{
        padding: 20px 30px;
      }
    th:nth-child(3){
      width:26%;
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
    //console.log(this.props.cart)
  }
  static getDerivedStateFromProps(props, state){
    return{cart:props.cart}
  }
  handleDelete=(e,obj)=>{
    var sum = 0;
    for(let i=0; i<this.state.cart.length; i++){
      if(this.state.cart[i]==obj){
        sum = this.props.amountCart - this.state.cart[i].amount;
        this.state.cart.splice(i,1);
        this.props.dispatch(AddCart(this.state.cart));
        localStorage.setItem("amountCart",sum);
        localStorage.setItem("cart",JSON.stringify(this.state.cart));
        break;
      }
    }
    this.props.dispatch(AmountCart(sum));
    this.setState({
      cart: this.state.cart
    });
  }
  render(){
    const listCart = this.state.cart.map((item,index)=>{
      return(
          <tr>
            <td>{index}</td>
            <td><img src={item.img} alt={item.name}/></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.amount}</td>
            <td>{item.amount*item.price}</td>
            <td onClick={(e)=>this.handleDelete(e,item)} ><FontAwesomeIcon icon={faTrashAlt}/></td>
          </tr>
        )
    })
    return ( 
      <Div className="CartPage">
        <Header/>
        <div className="cartList wrap">
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
    cart: state.cart
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartPage);