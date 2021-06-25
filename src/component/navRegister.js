import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faFacebook,faGooglePlusG,faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {ShowPopupLogin, Login} from '../action.js'
import styled from 'styled-components';
import UserLogo from "../images/userDefault.png"

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
      showProfile:"none"
    }
  }
  componentDidMount(){
    let user = localStorage.getItem("user");
    if(user!=null){
      this.props.dispatch(Login(JSON.parse(user)));
      return null;
    }
  }
  static getDerivedStateFromProps(props){
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
    		<ul class="login-tab" style={{display:this.state.loginTab}}> 			
          <Link to="/register">
            <li>Đăng ký</li>
          </Link>
    			<li onClick={(e)=>this.props.dispatch(ShowPopupLogin("block"))}>Đăng nhập</li>
    		</ul>
        <div className="user" style={{display:this.state.showUser}}>
            <img src={UserLogo} height="20" alt=""/>
            <a onClick={this.showProfilePop}>Xin chào, {this.state.user.name}</a>
            <ul className="popProfile" style={{display:this.state.showProfile}}>
              <li>Profile</li>
              <li>Logout</li>
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
