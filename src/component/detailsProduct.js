import React from 'react';
import Header from './header.js';
import MenuPanel from './menuPanel.js'
import {connect} from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { faCaretUp} from '@fortawesome/free-solid-svg-icons'
import {ShowPopupLogin,AmountCart,AddCart,Notify,ShowProductDetail} from "../action.js"
import {formatMoney,AddToCart} from './globalFunc.js'

const Div = styled.div`
      display: grid;
      grid-template-columns: 25% 1fr;
      margin-top: 50px;
      column-gap: 30px;
      .detailProducts-top{
        display:grid;
        grid-template-columns: 40% 1fr;
        column-gap:30px;
        .detailProducts-top-left {
          .detailProducts-left-img__main {
            width:100%;
            height:360px;
            display:flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e1e1e1;
            img{
              width:90%;
            }
          }
          .detailProducts-left-img ul {
            margin-top:20px;
            display:flex;
            justify-content:space-between;
            li img {
              width:60px;
              height:60px;
              border: 1px solid #e1e1e1;
            }
          }
        }
        .detailProducts-top-rigth {
          .detailProducts-rigth-title {
            border-bottom:1px solid #b6b6b6;
            h2 {
              font-size:24px;
              text-transform: uppercase;
            }
            .detailProducts-rigth-title-midde {
              .detailProducts-evaluate {
                display:flex;
                font-size:12px;
                margin-top:6px;
                ul{display:flex;
                  color: rgb(245, 189, 16);
                }
                p {
                  line-height: 20px;
                  padding: 0px 18px 0 10px;
                  color: #b6b6b6;
                  border-right: 2px solid #b6b6b6;
                }
                .sendCmt {
                    margin-left: 20px;
                    text-decoration:underline;
                }
              }
              .detailProducts-price {
                color:#ff0000;
                font-weight: bold;
                font-size:22px;
                margin: 6px 0;
              }
            }
          }
          .detailProducts-rigth-desc {
            h3 {font-size:14px;}
            margin-top:16px;
            border-bottom:1px solid #b6b6b6;
            p {
              margin-top:6px;
              color:#898989;
              margin-bottom:16px;
              font-size:12px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
              overflow: hidden

            }
          }
          .detailProducts-rigth-property {
            display:flex;
            padding:16px 0;
            border-bottom:1px solid #b6b6b6;
            h3{font-size:14px}
            select {
              padding:10px;
              width:194px;
              color:#b6b6b6;
              border:1px solid #b6b6b6;
              margin-top:16px;
            }
            .detailProducts-rigth-property-size {
              margin-right:30px;
            }
          }
          .detailProducts-rigth-order {
            display:flex;
            padding:20px 0;
            .order-amount {
              border:1px solid #b6b6b6;
              input {
                border:none;
                width:120px;
              }
              display:flex;
              .order-amount-control {
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                padding:8px;
                border-left:1px solid #b6b6b6;
                color:#b6b6b6;
                a{
                  line-height:14px;
                }
              }
            }
            button {
              padding:10px 26px;
              background-color:rgb(245, 189, 16);
              color:#ffffff;
              border:none;
              margin-left:10px
            }
          }
          .detailProducts-rigth-social {
            ul {
              display:flex;
              li{
                color:#ffffff;
                padding:0px 8px;
                border-radius:3px;
                font-size:14px;
                margin-right:10px;
                svg{margin-right:10px;}
              }
            }
            li:nth-child(1) {
              background-color:#5675cc;              
            }
            li:nth-child(2) {
              background-color:#1b95e0;              
            }
             li:nth-child(3) {
              background-color:#ffffff;   
              color:#db4437;
              border: 1px solid #b6b6b6;   
              svg{margin-right:0px;}        
            }
             li:nth-child(4) {
              background-color:#fe6d4c;     
              margin-right:20px;         
            }
          }
        }
      }
      .detailProducts-bottom {
        margin-top:60px;
        .detailProducts-bottom-control {
          button{
            padding:25px 42px;
            font-size:14px;
            background-color:#ffffff;
            outline:none;
            border:1px solid #e1e1e1;
            border-bottom:none;
            font-weight:700;
            text-transform:uppercase;
            &:hover{
              background:#e8e8e8;
              cursor:pointer;
            }
          }
        }
        .detailProducts-bottom-content {
          width:100%;
          min-height: 300px;
          border:1px solid #e1e1e1;
          padding:20px;
          font-size:13px;
          color:#898989;
          line-height:20px;
        }
      }
    `
class DetailsProducts extends React.Component {
  constructor(props){
    super(props);
    this.state={
      objDetail:{},
      infoArr:[{display:"block"},{display:"none"},{display:"none"}],
      controlBtn:[{background:"#252525", color:"#f5bd10"},{},{}],
      amount: 1
    }
  }
  handleInfor=(index)=>{
    let copState = this.state.infoArr;
    copState = [{display:"none"},{display:"none"},{display:"none"}];
    copState[index].display = "block";
    this.setState({
      infoArr: copState
    })
    let copStateBtn = this.state.controlBtn;
    copStateBtn = [{},{},{}];
    copStateBtn[index] = {background :"#252525", color:"#f5bd10"};
    this.setState({
      controlBtn: copStateBtn
    })
  }
  handleAmount=(num)=>{
    this.setState({
      amount:(this.state.amount==0 && num<0)? 0 : this.state.amount+num
    })
  }
  handleOrder=()=>{
    AddToCart(this.props,this.state.amount,(cart,cartDb)=>{
      if(cart!=undefined){
        this.props.dispatch(AddCart(cart, cartDb));
        this.props.dispatch(Notify("block",{text:"Đã thêm thành công",buttons:[{text:"Xem giỏ hàng"}]}));
      }else{
        this.props.dispatch(ShowPopupLogin("block"))
      }
    })
  }
  componentDidMount(){
    let objDetail = JSON.parse(localStorage.getItem("objDetail"));
    this.props.dispatch(ShowProductDetail(objDetail));
  }
  static getDerivedStateFromProps(props){
    return (props.objDetail!=null)? {objDetail:props.objDetail} : null;
    // if(props.objDetail!=null){
    //   return {objDetail:props.objDetail}
    // }
    // else{
    //   let objDetail = JSON.parse(localStorage.getItem("objDetail"));
    //   return  {objDetail:props.objDetail}
    // }
  }
  render(){
    
    return ( 
      <div>
      	 <Header/>
         <Div className="detail wrap">
             {(this.props.categories!=undefined)? <MenuPanel categories={this.props.categories}/> : null }
             <div className="detailProducts">
                <div className="detailProducts-top">
                    <div className="detailProducts-top-left">
                        <div className="detailProducts-left-img__main">                                                                           
                          <img src={this.state.objDetail.img} border="0"/>                                                    
                        </div>
                        <div className="detailProducts-left-img">
                          <ul>
                            <li> <img src="https://i.ibb.co/2hbs2DB/may-khoan-dong-luc-bosch.jpg" alt="may-khoan-dong-luc-bosch" border="0"/></li>
                            <li> <img src="https://i.ibb.co/F65Q4w8/may-khoan-dong-luc-bosch-1.jpg" alt="may-khoan-dong-luc-bosch-1" border="0"/></li>
                            <li> <img src="https://i.ibb.co/RYtTcms/may-khoan-dong-luc-bosch-2.jpg" alt="may-khoan-dong-luc-bosch-2" border="0"/></li>
                            <li> <img src="https://i.ibb.co/tBVfZFC/may-khoan-dong-luc-bosch-4.jpg" alt="may-khoan-dong-luc-bosch-4" border="0"/></li>
                            <li> <img src="https://i.ibb.co/zPxjxRC/may-khoan-dong-luc-bosch-5.jpg" alt="may-khoan-dong-luc-bosch-5" border="0"/></li>
                          </ul>
                        </div>
                    </div>
                    <div className="detailProducts-top-rigth">
                        <div className="detailProducts-rigth-title">
                            <h2>{this.state.objDetail.name}</h2>
                            <div className="detailProducts-rigth-title-midde">
                              <div className="detailProducts-evaluate">
                                <ul>
                                  <li><FontAwesomeIcon icon={faStar}/></li>
                                  <li><FontAwesomeIcon icon={faStar}/></li>
                                  <li><FontAwesomeIcon icon={faStar}/></li>
                                  <li><FontAwesomeIcon icon={faStar}/></li>
                                  <li><FontAwesomeIcon icon={faStar}/></li>
                                </ul>
                                <p>(12 đánh giá)</p>
                                <a className="sendCmt">
                                  Gửi bình luận của bạn
                                </a>
                              </div>                            
                              <div className="detailProducts-price">
                                  Giá: <span>{formatMoney(this.state.objDetail.price)}<sup>đ</sup></span>
                              </div>
                            </div>
                        </div>
                        <div className="detailProducts-rigth-desc">
                          <h3>Thông tin sản phẩm</h3>
                          <p>{this.state.objDetail.detail}</p>
                        </div>
                        <div className="detailProducts-rigth-property">
                           <div className="detailProducts-rigth-property-size">
                             <h3>Size</h3>
                             <select name="">
                               <option>--chọn size--</option>
                               <option>S</option>
                               <option>M</option>
                               <option>L</option>
                             </select>
                           </div>
                           <div className="detailProducts-rigth-property-color">
                             <h3>Màu sắc</h3>
                             <select name="">
                               <option>--chọn màu--</option>
                               <option>Đỏ</option>
                               <option>Cam</option>
                               <option>Vàng</option>
                               <option>Xanh lá</option>
                             </select>
                           </div>
                        </div>
                        <div className="detailProducts-rigth-order">
                          <div className="order-amount">
                            <input type="text" style={{textAlign:"center"}} value={this.state.amount}/>
                            <div className="order-amount-control">
                             <a onClick={(e)=>this.handleAmount(1)}>
                                <FontAwesomeIcon icon={faCaretUp}/>                             
                              </a>
                              <a onClick={(e)=>this.handleAmount(-1)}>
                                <FontAwesomeIcon icon={faCaretDown}/>                             
                              </a>                            
                            </div>
                          </div>                         
                          <button onClick={this.handleOrder}>MUA NGAY</button>
                        </div>
                        <div className="detailProducts-rigth-social">
                          <ul>
                            <li>
                               <a>
                                <FontAwesomeIcon icon={faFacebookSquare}/>Like                                
                              </a>
                            </li>
                             <li>
                               <a>
                                <FontAwesomeIcon icon={faTwitter}/>Twitter                                
                              </a>
                            </li>
                             <li>
                               <a>
                                <FontAwesomeIcon icon={faGooglePlusSquare}/> 1
                              </a>
                            </li>
                            <li>
                               <a>
                                <FontAwesomeIcon icon={faPlusSquare}/>Share
                              </a>
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
                 <div className="detailProducts-bottom">
                    <div className="detailProducts-bottom-control">
                        <button style={this.state.controlBtn[0]} onClick={(e)=>{this.handleInfor(0)}}>Thông tin sản phẩm</button>
                        <button style={this.state.controlBtn[1]} onClick={(e)=>{this.handleInfor(1)}}>Đánh giá - Nhận xét</button>
                        <button style={this.state.controlBtn[2]} onClick={(e)=>{this.handleInfor(2)}}>Thẻ Tags</button>
                    </div>
                    <div className="detailProducts-bottom-content">
                        <div style={this.state.infoArr[0]} className="detailProducts-bottom-decs">{this.state.objDetail.detail}</div>
                        <div style={this.state.infoArr[1]} className="detailProducts-bottom-evaluate">Massa exercitationem tempora impedit eveniet urna accusantium hendrerit rhoncus massa tellus culpa! Voluptates illo labore sagittis, dapibus ullamcorper! Natoque? Totam. Nesciunt class donec urna integer magnis, nemo, eleifend minus fugit inceptos donec! Imperdiet dignissim, class faucibus non voluptates, corrupti, quasi do dignissimos risus cubilia ducimus proident debitis nec arcu senectus totam itaque voluptatum commodo! Vehicula natus quas pede ullamcorper euismod, quibusdam possimus, laudantium. Cupidatat? Beatae luctus? A hymenaeos explicabo irure! Fermentum nisl, quasi. Tempus eum torquent quasi, necessitatibus ipsam ipsam. Voluptatibus aut expedita eum sint, lectus feugiat totam, imperdiet dolore feugiat inceptos</div>
                        <div style={this.state.infoArr[2]} className="detailProducts-bottom-tags">Voluptates et felis delectus tortor ut, exercitationem, ac, repudiandae, rhoncus, perspiciatis iaculis exercitationem harum molestiae, incididunt at aute repudiandae fuga dictum porro pede volutpat. Pretium voluptatem, parturient lorem eligendi, voluptas lobortis donec sodales tortor pulvinar, libero felis mauris aliqua natus massa senectus iste cillum fusce donec congue eos viverra consequat quibusdam vel placerat nisi, class ac, soluta, quia occaecati eiusmod explicabo cumque purus pariatur. Cursus fames dolorum luctus eveniet quibusdam distinctio cupidatat! Dapibus iste explicabo cupiditate consequatur dignissim viverra occaecat amet saepe dapibus ac occaecat facilisi condimentum minim, ligula culpa et! Leo eget platea dui cupidatat, id auctor, perferendis, quaerat.</div>
                    </div>                  
                </div>
             </div>
         </Div>        
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
    categories: state.categories,
    objDetail: state.objDetail,
    cart:state.cart,
    cartDb:state.cartDb
  }
}

export default connect(mapStateToProps,null)(DetailsProducts);