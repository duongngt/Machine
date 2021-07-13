import React from 'react';
import axios from '../../node_modules/axios';
import Header from './header.js';
import ReviewStar from './reviewStar.js';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {AmountCart,AddCart,Order} from "../action.js"
import {Link,Redirect} from 'react-router-dom'
import {formatMoney} from './globalFunc.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'

let Div=styled.div` 
  .comment{
    label{
      font-size:14px;
      font-weight:500;
      margin-bottom:6px;
      display:block;
    }
    textarea{
      width:100%;
      height:70px;
    }
  } 
  .form-review-item{
    display:flex;
    margin-top:30px;  
     .review-item-content{
        font-size:12px;
        margin-left:10px;
        .product-name{
          font-weight:500;
          color:#f5bd10;
        }
    } 
  }
  .form-review-top{
    display:flex;
    justify-content:space-between;
    padding-bottom:20px;
    border-bottom:1px solid #e1e1e1;
  }
  .form-review{
    width:40%;
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    box-shadow:0 0 15px rgba(0,0,0,0.5);
    background-color:white;
    padding:20px;
    border-radius: 5px;
    .ReviewStar{
      display: flex;
      justify-content:center;
      margin:10px 0;
      ul{
        li{
          float:left;
          font-size:30px;
        }
      }
    }
  }
  h3{
    padding:20px 0;
  }
  .btn{
        padding:6px 8px;
        border-radius:5px;       
      }
  .table{
    display:flex;
    justify-content:space-between;
    align-items:center;
    .billCode{
      flex-basis:25%;
    }
    .date{
      flex-basis:15%;
    }
    .total-amount{
      flex-basis:15%;
      text-align:center;
    }
    .total-price{
      flex-basis:20%;
      text-align:center;
    }
    .detail{
      flex-basis:10%;
    }
    .status{
      flex-basis:15%;
      button{
        margin-top:6px;
      }
    }
  }
  .ManagerOrder-table{
    background-color:#f1f0f0;
    padding:20px;
  }
  .ManagerOrder-title{
    padding:20px 30px;
    margin-top:6px;
    background-color:white;
    border-radius:5px;
    font-weight:bold;
  }
  .ManagerOrder-list-item{
    padding:20px 30px;
    margin-top:6px;
    background-color:white;
    border-radius:5px;
    &:hover{
      background-color:#e2e0e0;
    }
    .billCode{
      font-weight:500;
    }
  }
  .popup-detail {
    .flex{
      display:flex;
    }
    .product-detail{
      flex-basis:40%;
    }
    .price{
      flex-basis:10%;
    }
    .quantity{
      flex-basis:10%;
      text-align:center;
    }
    .subtotal{
      flex-basis:15%;
      text-align:center;
    }
    .vat{
      flex-basis:15%;
      text-align:center;
    }
    background-color:#7d797994;
    width:100%;
    height:100vh;
    position:fixed;
    top:0;
    left:0;
    z-index:1;
    .popup-detail-table{
      background-color:white;
      width:60%;
      border:1px solid #e1e1e1;
      border-radius:5px;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      padding:20px;
      .popup-detail-middle-title{
        padding:20px 0;
        border-bottom:1px solid #e1e1e1;
        font-weight:bold;
      }
      .popup-detail-header {
        justify-content:space-between;
        h5{
          span{color:#144dec;}
        }
        p{
          color:#888787;
          font-weight:500;
        }
      }
      .popup-detail-middle-content{
        .item{
          margin-top:20px;
          align-items:center;
          img{
            margin-right:10px;
          }
          .product-detail-content{
            font-size:12px;
            .product-name{
              color:#f5bd10;
              font-weight:500;
            }
          }
        }
      }
    }
  }
`
class ManagerOrder extends React.Component {
  constructor(props){
    super(props);
    this.state={
      orders: [],
      arrProducts:[],
      orderCurrent:{},
      showPopup:"none",
      showReview:"none",
      buttonReviews:"none",
      itemReview:{},
      showTextbox :"none",
      commentText:"",
      amountStar:0
    }
  }
  componentDidMount(){
    let user = localStorage.getItem("user");
    if(user!=null){
      user = JSON.parse(user);
      axios.get("http://localhost:3001/orders?userId="+user.id+"&_embed=order_detail")
      .then(response=>{
        this.setState({
          orders: response.data,
        })
      })
    }
  }
  showDetail=(index,status)=>{
    let orderDetails = this.state.orders[index]["order_detail"];
    let arrProducts=[]
    for(let i=0; i<orderDetails.length;i++){
      axios.get("http://localhost:3001/products?id="+orderDetails[i].productId)
      .then(response=>{
        response.data[0].amount = orderDetails[i].amount;
        arrProducts.push(response.data[0]);
        if(i==orderDetails.length-1){
          if(status!=undefined){
            let copyOrders = this.state.orders;
            copyOrders[index].status = status;
            axios.patch("http://localhost:3001/orders/"+this.state.orders[index].id,{status:"Đã nhận hàng"})
            .then(response2=>{
              this.setState({
                arrProducts:arrProducts,
                orderCurrent: this.state.orders[index],
                orders: copyOrders,
                showPopup:"block",
                buttonReviews: (status=="Đã nhận hàng")?"block" : "none"
              })
            })     
          }
          else{
            this.setState({
              arrProducts:arrProducts,
              orderCurrent: this.state.orders[index],
              showPopup:"block",
              buttonReviews: (this.state.orders[index].status=="Đã nhận hàng")?"block" : "none"
            })
          }
               
        }
      })
    }
  }
  handleChangeComment=(e)=>{
    this.setState({
      commentText:e.target.value
    })
  }
  closePopup=(e)=>{
    this.setState({
        showPopup:"none",
        showReview:"none"
    })
  }
  showPopupReview=(index)=>{
    this.setState({
      showPopup: "none",
      showReview:"block",
      itemReview:this.state.arrProducts[index],
    })
  }
  handleRateStar=(amountStar)=>{
    this.setState({
      showTextbox: "block",
      amountStar:amountStar
    })
  }
  handleReview=()=>{
    let date = new Date();
    let objReview = {
      userName:this.props.user.nameLogin,
      productId:this.state.itemReview.id,
      commentText: this.state.commentText,
      date: date.toDateString(),
      amountStar:this.state.amountStar
    }
    axios.post("http://localhost:3001/reviews",objReview)
    .then(response=>{
      console.log(response.data)
      this.setState({
        showReview:"none",
        commentText:""
      })
    }).catch(err=>{
      console.log(err);
    })
  }
  render(){
    let listOrders = this.state.orders.map((item,index)=>{
      return(
        <div className="ManagerOrder-list">
          <div className="ManagerOrder-list-item table">
            <div className="billCode">{item.billCode}</div>
            <div className="date">{item.date}</div>
            <div className="total-amount">{item.totalAmount}</div>
            <div className="total-price">{formatMoney((item.subTotal)+(item.subTotal*0.1))}</div>
            <div className="detail"><button className="btn" onClick={(e)=>this.showDetail(index)}>Xem</button></div>
            {(item.status=="Đang giao hàng")?<div className="status"><p>{item.status}</p><button className="btn" onClick={(e)=>this.showDetail(index,"Đã nhận hàng")}>Đã nhận hàng</button></div>:<div className="status"><p>{item.status}</p></div>}
          </div>      
        </div>
      )
    })
    let listDetail = this.state.arrProducts.map((item,index)=>{
      return(
        <div className="item flex" key={index}>
          <div className="product-detail flex">
              <img src={item.img} width="80" alt=""/>
              <div className="product-detail-content">
                <div className="product-name">{item.name}</div>
                <div>item<span>189203</span></div>
                <div>material<span>Alinium</span></div>
                <div>color<span>Metallic,ruslty</span></div>
              </div>
           </div>
           <div className="price">{formatMoney(item.price)}</div>
           <div className="quantity">{item.amount}</div>
           <div className="vat">{formatMoney(item.price*item.amount*0.1)}</div>
           <div className="subtotal">{formatMoney((item.price*item.amount) + (item.price*item.amount)*0.1)}</div>
           <div className="reviews"><button style={{display:this.state.buttonReviews}} onClick={()=>this.showPopupReview(index)}>Đánh giá</button></div>
        </div>
      )
    })
    return ( 
      <Div className="ManagerOrder">
        <Header/>
        <div className="wrap">
          <h3>Đơn hàng</h3>
          <div className="ManagerOrder-table">
            <div className="ManagerOrder-title table">
              <div className="billCode">Mã đơn hàng</div>
              <div className="date">Ngày đặt hàng</div>
              <div className="total-amount">Số sản phẩm</div>
              <div className="total-price">Tổng tiền</div>
              <div className="detail">Chi tiết</div>
              <div className="status">Trạng thái</div>
            </div>
            {listOrders}  
          </div>    
        </div>
        <div className="popup-detail" style={{display:this.state.showPopup}} onClick={this.closePopup}>
          <div className="popup-detail-table" onClick={(e)=>{e.stopPropagation()}}>
            <div className="popup-detail-header flex">
               <h5>Mã Đơn Hàng:<span style={{marginLeft:"10px"}}>{this.state.orderCurrent.billCode}</span></h5>
               <div className="flex">
                  <p style={{marginRight:"20px"}}>{this.state.orderCurrent.date}</p>
                  <FontAwesomeIcon className="iconClose" icon={faTimesCircle} color="#f5bd10" onClick={this.closePopup}/>        
               </div>               
            </div>
             <div className="popup-detail-middle">
              <div className="popup-detail-middle-title flex">
                <div className="product-detail">Sản phẩm</div>
                <div className="price">Giá</div>
                <div className="quantity">Số lượng</div>
                <div className="vat">Thuế VAT</div>
                <div className="subtotal">Thành tiền</div>
              </div>
              <div className="popup-detail-middle-content">
                {listDetail}           
              </div>
            </div>
          </div>
        </div>
        <div className="form-review" style={{display:this.state.showReview}}>
          <div className="form-review-top">
            <h5>Đánh giá sản phẩm</h5>
            <FontAwesomeIcon className="iconClose" icon={faTimesCircle} color="#f5bd10" onClick={this.closePopup}/>
          </div>          
          <div className="form-review-item">
              <img src={this.state.itemReview.img} width="80" alt=""/>
              <div className="review-item-content">
                <div className="product-name">{this.state.itemReview.name}</div>
                <div>item<span>189203</span></div>
                <div>material<span>Alinium</span></div>
                <div>color<span>Metallic,ruslty</span></div>
              </div>
          </div>
          <ReviewStar handleRateStar={this.handleRateStar}/>
          <div className="comment" style={{display:this.state.showTextbox}}>
            <label>Viết đánh giá của bạn</label>
            <textarea name="" id="" cols="30" rows="10" value={this.state.commentText} onChange={this.handleChangeComment}></textarea>
            <div className="review-btn" style={{textAlign:"center",marginTop:"20px"}}>
              <button className="btn" onClick={this.handleReview}>Gửi</button>
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
export default connect(mapStateToProps,mapDispatchToProps) (ManagerOrder);