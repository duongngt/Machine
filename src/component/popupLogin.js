import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {ShowPopupLogin,Login} from '../action.js';
import axios from '../../node_modules/axios';

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
  constructor(props){
    super(props);
    this.state={
      spanInf:{name:"*", password:"*"},
      formLogin:{name:"", password:""}
    }
  }
  handleClose=(e)=>{
    this.props.dispatch(ShowPopupLogin("none"));
  }
  handleChange=(e)=>{
    let copyState = this.state.formLogin;
    copyState[e.target.name] = e.target.value;
    this.setState({
      formLogin: copyState
    })
  }
  handleLogin=(e)=>{
    let copySpan = this.state.spanInf;
    let copyState = this.state.formLogin;
    axios.get("http://localhost:3001/users?nameLogin="+this.state.formLogin.name)
    .then(response=>{
      if(response.data.length>0){
        if(response.data[0].password == this.state.formLogin.password){
          this.handleClose();
          this.props.dispatch(Login(this.state.formLogin));
          localStorage.setItem("user",JSON.stringify(this.state.formLogin));
        }else{
          copySpan.password = "Mật khẩu không đúng";
          copyState.password="";
          this.setState({
            spanInf: copySpan,
            formLogin:copyState
          })
        }
      }
      else{
        copySpan.name = "Tài khoản không tồn tại!";
        this.setState({
          spanInf: copySpan
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){  
    return ( 
      <Div className="PopupLogin" style={{display:this.props.showPopup}} onClick={this.handleClose}>
        <div className="login" onClick={(e)=>{e.stopPropagation()}}>
          <h3>Thông tin đăng nhập</h3>
          <div className="loginForm">
            <div className="loginForm-user form-gr">
              <label>Tên đăng nhập &nbsp;<span>{this.state.spanInf.name}</span></label>
              <input type="text" name="name" value={this.state.formLogin.name} onChange={this.handleChange}/>
            </div>
            <div className="loginForm-password form-gr">
              <label>Password &nbsp;<span>{this.state.spanInf.password}</span></label>
              <input type="password" name="password" value={this.state.formLogin.password} onChange={this.handleChange}/>
            </div>
            <a>Quên mật khẩu</a>
          </div>
          <div className="login-btn-control">
              <button className="btn" onClick={this.handleLogin}>Login</button>
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
export default connect(null,mapDispatchToProps) (PopupLogin);