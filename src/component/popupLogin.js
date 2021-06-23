import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {ShowPopupLogin} from '../action.js'

let Div = styled.div`
  z-index:3;
  width:100%;
  height:100vh;
  background-color:rgba(1,1,1,0.5);
  position:fixed;
  top:0;
  left:0;
  .login{
    width:30%;
    padding:30px;
    background-color:white;
    border-radius:5px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    h3 {
      margin-bottom:20px;
      text-transform:uppercase;
    }
    .loginForm-password {
      margin-bottom:5px;
    }
    a {
      color:blue;
      font-size:12px;
      cursor:pointer;
    }
    a:hover {
      text-decoration:underline;
    }
    .login-btn-control {
      text-align:center;
      .btn {
        padding:10px 20px;
      }
    }
  }
`
class PopupLogin extends React.Component {
  handleClosePopup=(e)=>{
    this.props.dispatch(ShowPopupLogin("none"));
  }
  render(){
    return ( 
      <Div className="PopupLogin" style={{display:this.props.showPopup}} onClick={this.handleClosePopup}>
        <div className="login">
          <h3>Thông tin đăng nhập</h3>
          <div className="loginForm">
            <div className="loginForm-user form-gr">
              <label>Tên đăng nhập</label>
              <input type="text" name="nameLogin"/>
            </div>
            <div className="loginForm-password form-gr">
              <label>Password</label>
              <input type="password" name="password"/>
            </div>
            <a>Quên mật khẩu</a>
          </div>
          <div className="login-btn-control">
              <button className="btn">Login</button>
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
export default connect(null,mapDispatchToProps)(PopupLogin);