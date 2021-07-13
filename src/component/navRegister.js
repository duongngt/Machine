import React from 'react';
import axios from '../../node_modules/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faFacebook,faGooglePlusG,faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {ShowPopupLogin, Login, AddCart} from '../action.js'
import styled from 'styled-components';
import UserLogo from "../images/userDefault.png"
import {GetUsercart} from './globalFunc.js'

let Div =styled.div`
  .login-tab {
    li:hover{
      cursor:pointer;
    }
  }
  .user {
    position:relative;
    align-items:center;
    img {
      margin-right:6px;
    }
    a{
      font-size:12px;
      cursor:pointer;
    }
    a:hover{
      text-decoration:underline;
    }
    .popProfile{
      background:white;
      box-shadow: 2px 2px 10px #e1e1e1;
      font-size:12px;
      width:150px;
      position:absolute;
      top:80%;
      li{
        padding: 10px 10px;
        cursor:pointer;
      }
      li:hover{
        background:#555555;
        color:white;
      }
    }
  }
`

class NavRegister extends React.Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
      showUser:"none",
      loginTab:"none",
      showProfile:"none",
      GetUsercart: this.GetUsercart
    }
  }
  componentDidMount(){
    let user = localStorage.getItem("user");
    if(user!=null){
      user = JSON.parse(user);
      this.props.dispatch(Login(user));
      GetUsercart(user, function(resProducts, resCart){
        this.props.dispatch(AddCart(resProducts, resCart));
      }.bind(this))
    }
  }
  static getDerivedStateFromProps(props,state){
    if(props.user!=null){
      return {loginTab:"none", showUser:"flex",user:props.user}
    }else{
      return {loginTab:"flex", showUser:"none"}
    }
  }
  showProfilePop=(e)=>{
    e.stopPropagation();
    this.setState({
      showProfile:"block"
    })
  }
  handleClose=(e)=>{
    this.setState({
      showProfile:"none"
    })
  }
  handleLogout=(e)=>{
    this.props.dispatch(Login(null));
    this.props.dispatch(AddCart([],{}))
    localStorage.removeItem("user");
  }
  render(){
  	var styUl={
  		display: "flex",
  		justifyContent:"space-between",
  	}

    return ( 
      <Div className="NavRegister" onClick={this.handleClose} style={{borderBottom:"1px solid #e1e1e1",backgroundColor:"#f7f7f7"}} >
      <div className="wrap" style={styUl}>
       	<ul className="social-link" style={{display: "flex"}} >
    			<li><FontAwesomeIcon icon={faFacebook}/></li>
    			<li><FontAwesomeIcon icon={faGooglePlusG}/></li>
    			<li><FontAwesomeIcon icon={faInstagram}/></li>
    			<li><FontAwesomeIcon icon={faTwitter}/></li>
    		</ul>
    		<ul className="login-tab" style={{display:this.state.loginTab}}> 			
          <Link to="/register">
            <li>Đăng ký</li>
          </Link>
    			<li onClick={(e)=>this.props.dispatch(ShowPopupLogin("block"))}>Đăng nhập</li>
    		</ul>
        <div className="user" style={{display:this.state.showUser}}>
            <img src={UserLogo} height="20" alt=""/>
            <a onClick={this.showProfilePop}>Xin chào, {this.state.user.nameLogin}</a>
            <ul className="popProfile" style={{display:this.state.showProfile}}>
              <li>Profile</li>
              <Link to="/"><li onClick={this.handleLogout}>Logout</li></Link>
              <Link to="/managerOrder"><li>Đơn hàng</li></Link>
            </ul>
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
  return {
    user:state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (NavRegister);
