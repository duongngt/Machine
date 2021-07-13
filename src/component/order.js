import React from 'react';
import Header from './header.js';
import axios from '../../node_modules/axios';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {formatMoney} from './globalFunc.js'
import {Link,Redirect} from 'react-router-dom'
import {Notify,AddCart} from '../action.js';

let Div = styled.div`
    .flex{
      display:flex;
      justify-content:space-between;
    }
    .overview-middle-title {
      margin-top:20px;
      padding-bottom:10px;
      border-bottom:1px solid #e1e1e1;
      font-weight:bold;
    }
    .item{
      margin-top:40px;
      align-items:center;
      .product-detail{
        display:flex;
        img{
          flex-basis:20%;
          border:1px solid #e1e1e1;
          border-radius:5px;
          margin-right:10px;
      }
      .product-detail-content{
        div:first-child{
          font-weight:500;
          color:#1b54cf;
          font-size:14px;
        }
        color:#6e6e6b;
        font-size:12px;
        div {
          margin-top:6px;
        }
        span{
          margin-left:10px;
          color:#2e2e2d;
        }
      }
    }  
    }
    .item:last-child{
      padding-bottom:40px;
      border-bottom:1px solid #e1e1e1;
    }
    .product-detail{
      flex-basis: 52%;
    }
    .price{
      flex-basis:16%;
    }
    .quantity{
      flex-basis:16%;
    }
    .subtotal{
      flex-basis:16%;
      font-weight:bold;
    }
    .table {
      margin-top:50px;
      padding:20px;
      border:1px solid #e1e1e1;
      border-radius:8px;
    }
    .order-table {
      .overview {
        flex-basis:66%;
        .overview-header {
          padding-bottom:20px;
          border-bottom:1px solid #e1e1e1;
          span{
            color:#636363;
            font-size:14px;
          }
        }
        .overview-middle{
        }
        .overview-bottom{
          .btn{
              padding:10px 14px;
              margin-top:10px;
            }
          margin-top:40px;
          .overview-bottom-note{
            flex-basis:56%;
            display:flex;
            flex-direction:column;
            div{
              text-align:right;
            }
            label{
              font-weight:bold;
              margin-bottom:20px;
            }
            textarea {
              height:100px;
            }
          }
          .overview-bottom-bill{
            flex-basis:40%;
            p{
              color:#9e9e9e;
            }
            >p{
              font-size:16px;
              font-weight:bold;
              margin-bottom:10px;
              color:#2f2e2e;
            }
            div{
              margin-top:15px;
            }
            div:last-child{
              float:right;
            }
          }
        }
      }
      .customer{
        flex-basis:24%;
        .customer-header{
          padding-bottom:20px;
          border-bottom:1px solid #e1e1e1;
        }
        .customer-middle{
          text-align:center;
          margin-top:30px;
          padding-bottom:20px;
          border-bottom:1px solid #e1e1e1;
          img{
            width:100px;
            height:100px;
            border-radius:100%;
          }
          ul{
            li{margin-top:6px;}
            li:first-child{font-weight:bold}
            li:nth-child(2){color:#1b54cf;}
          }
        }
        .customer-bottom{
          .customer-bottom-address{
            margin-top:20px;
            p{font-weight:500;font-size:14px}
            span{font-size:12px;}
          }
        }
      }
   }
`
class Order extends React.Component {
  constructor(props){
    super(props);
    this.state={
      order:{data:[]},
      url: "/order",
      noteText:"",
      redirect: false
    }
  }
  static getDerivedStateFromProps(props,state){
    if(props.order.data==undefined || state.redirect){
      return {url:'/cart'}
    }
    else{
      return {order: props.order}
    }
      
  }
  handleChange=(e)=>{
    this.setState({
      noteText: e.target.value
    })
  }
  handleOrder=()=>{
    let objSend = {
      userId: this.props.user.id,
      billCode: this.props.order.idOrder,
      subTotal: this.props.order.sumNoVAT,
      date: this.props.order.date,
      totalAmount:this.props.order.totalAmount,
      note:this.state.noteText,
      status:"Đang giao hàng"
    }
    axios.post("http://localhost:3001/orders",objSend)
    .then(response=>{
      for(let i=0; i<this.props.order.data.length;i++){
        let objDetailOrder = {
          orderId: response.data.id,
          productId: this.props.order.data[i].id,
          amount: this.props.order.data[i].amount
        }
        axios.post("http://localhost:3001/order_detail",objDetailOrder)
        .then(response=>{
          if(i==this.props.order.data.length-1){
             this.props.dispatch(Notify("block",{text:"Đặt hàng thành công",buttons:[{text:"Xem đơn hàng",link:'/managerOrder'}]}));
          }
        })
      }
    })
    let cartDb = this.props.cartDb;
    let cart = this.props.cart;
    let data = this.props.order.data;
    for(let i=0; i<data.length; i++){
      for(let j=0; j<cart.length; j++){
        if(data[i].id == cart[j].id){
          cartDb.cart.splice(j,1);
          cart.splice(j,1);
          j=j-1;
        }
      } 
    }
    axios.patch("http://localhost:3001/carts/"+cartDb.id,cartDb)
    .then(response=>{
      console.log(response.data);
      this.state.redirect = true;
      this.props.dispatch(AddCart(cart,response.data));
    }).catch(err=>{
      console.log(err)
    })
  }
  render(){
    const listOrder = this.state.order.data.map((item,index)=>{
      return (
          <div className="item flex" key={index}>
            <div className="product-detail">
                <img src={item.img} width="80" alt=""/>
                <div className="product-detail-content">
                  <div>{item.name}</div>
                  <div>item<span>189203</span></div>
                  <div>material<span>Alinium</span></div>
                  <div>color<span>Metallic,ruslty</span></div>
                </div>
             </div>
             <div className="price">{formatMoney(item.price)}</div>
             <div className="quantity">{item.amount}</div>
             <div className="subtotal">{formatMoney(item.price*item.amount)}</div>
          </div>
        )
    })
    return ( 
      <Div className="order">
        <Redirect to={this.state.url}/>
      	<Header/>
        <div className="order-table flex wrap">
          <div className="overview table">
            <div className="overview-header flex">
             <h5>Mã Đơn Hàng:<span>{this.state.order.idOrder}</span></h5>
             <p>{this.state.order.date}</p>
             </div>
             <div className="overview-middle">
               <div className="overview-middle-title flex">
                 <div className="product-detail">Sản phẩm</div>
                 <div className="price">Giá</div>
                 <div className="quantity">Số lượng</div>
                 <div className="subtotal">Thành tiền</div>
               </div>
               <div className="overview-middle-content">
                  {listOrder}           
               </div>
               <div className="overview-bottom flex">
                 <div className="overview-bottom-note">
                   <label htmlFor="">Ghi chú</label>
                   <textarea name="" id="" cols="30" rows="10" value={this.state.noteText} onChange={this.handleChange}></textarea>
                 </div>
                 <div className="overview-bottom-bill">
                    <p>Đơn hàng</p>
                   <div className="flex"><p>Tổng tiền</p><span>{formatMoney(this.props.order.sumNoVAT)}</span></div>
                   <div className="flex"><p>Vat</p><span></span>{formatMoney(this.props.order.sumNoVAT*0.1)}</div>
                   <div className="flex"><p>Thanh toán</p><span>{formatMoney(this.props.order.sumNoVAT+this.props.order.sumNoVAT*0.1)}</span></div>
                   <div><button className="btn" onClick={this.handleOrder}>Đặt hàng</button></div>
                 </div>
               </div>
             </div>
          </div>
          <div className="customer table">
              <div className="customer-header">
                <h4>Customer</h4>
              </div>
              <div className="customer-middle">
                <img src="https://i.ibb.co/8DK9zyG/download.jpg" alt="download" border="0"/>
                <ul>
                  <li>David</li>
                  <li>duongngt1@gmail.com</li>
                  <li>(84)79.5466457</li>
                </ul>
              </div>
              <div className="customer-bottom">
                <div className="customer-bottom-address">
                  <p>Address</p>
                  <span>31 Lỗ Giáng</span><br/>
                  <span>Ngũ Hành Sơn, Đà Nẵng</span>
                </div>
                <div className="customer-bottom-address">
                  <p>Address</p>
                  <span>31 Lỗ Giáng</span><br/>
                  <span>Ngũ Hành Sơn, Đà Nẵng</span>
                </div>
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
    order: state.order,
    cart: state.cart,
    cartDb:state.cartDb
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Order);