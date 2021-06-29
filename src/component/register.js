import React from 'react';
import Header from './header.js';
import styled from 'styled-components';
import {Validate} from './globalFunc.js';
import axios from '../../node_modules/axios';
import {connect} from 'react-redux';
import {Notify,Login} from '../action.js';

let Div = styled.div`
  h3 {
    margin-top:20px;
  }
  .register-infor{
    display: flex;
    flex-wrap : wrap;
    justify-content: space-between;
    margin-top: 20px;
  }
  .form-gr{
    flex-basis: 45%;
    display:flex;
    flex-direction:column;
    margin-bottom:20px;
    label{
      margin-bottom:10px;
      font-weight:500;
      span{
        color:red;
        font-size:12px;
        font-style:italic;
      }
    }
    input{
      height:50px;
      font-size:20px;
      padding-left: 10px;
    }
  }
  .register-infor-login {
      display: flex;
      flex-wrap : wrap;
      justify-content: space-between;
    }
  .register-btn-control {
    margin-top: 30px;
    button:nth-child(2){
      margin-left:10px;
    }
  }
`
class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={
      form:{name:"",email:"",password:"","re-password":"",address:"",phone:"",nameLogin:"",passwordLogin:""},
      validateSpans:{}
    }
  }
  handleChange=(e)=>{
    let copyState = this.state.form;
    copyState[e.target.name] = e.target.value;
    this.setState({
      form: copyState
    })
  }
  handleValidate=(e)=>{
    let copyState = this.state.form;
    let res = Validate(copyState);
    if(res.submit){
      axios.get("http://localhost:3001/users?nameLogin="+this.state.form.nameLogin)
      .then(response1=>{
        if(response1.data.length>0){
          res.spanInf.nameLogin = "Name has exist, please enter other name!";
          copyState.nameLogin = "";
          this.setState({
            form : copyState,
            validateSpans: res.spanInf
          })
        }
        else{
          axios.post("http://localhost:3001/users",this.state.form)
          .then(response=>{
            console.log(response.data);
            this.props.dispatch(Notify("block"));
            this.props.dispatch(Login(response.data));
          }).catch((err)=>{
            console.log(err);
          })
          this.setState({
            validateSpans: {},
            form:{name:"",email:"",password:"","re-password":"",address:"",phone:"",nameLogin:"",passwordLogin:""}
          })
        }
      })
      
    }
    else{
      this.setState({
        form : copyState,
        validateSpans: res.spanInf
      })
    }
  }
  render(){
    return ( 
      <Div className="Register">
          <Header/>
          <div className="wrap">
            <h3>Thông tin đăng ký</h3>
            <div className="register-infor">
              <div className="register-infor-name form-gr">
                  <label>Họ tên <span>{(this.state.validateSpans.name==undefined)?"*":this.state.validateSpans.name}</span></label>
                  <input type="text" value={this.state.form.name} name="name" onChange={this.handleChange}/>
              </div>
              <div className="register-infor-email form-gr">
                  <label>Email <span>{(this.state.validateSpans.email==undefined)?"*":this.state.validateSpans.email}</span></label>
                  <input type="email" value={this.state.form.email} name="email" onChange={this.handleChange}/>
              </div>
              <div className="register-infor-phone form-gr">
                  <label>Số điện thoại <span>{(this.state.validateSpans.phone==undefined)?"*":this.state.validateSpans.phone}</span></label>
                  <input type="text" value={this.state.form.phone} name="phone" onChange={this.handleChange}/>
              </div>
              <div className="register-infor-address form-gr">
                  <label>Địa chỉ <span>{(this.state.validateSpans.address==undefined)?"*":this.state.validateSpans.address}</span></label>
                  <input type="text" value={this.state.form.address} name="address" onChange={this.handleChange}/>
              </div>
              <div className="register-infor-pass form-gr">
                  <label>Password <span>{(this.state.validateSpans.password==undefined)?"*":this.state.validateSpans.password}</span></label>
                  <input type="password" value={this.state.form.password} name="password" onChange={this.handleChange}/>
              </div>
              <div className="register-infor-pass form-gr">
                  <label>Nhập lại Password <span>{(this.state.validateSpans['re-password']==undefined)?"*":this.state.validateSpans['re-password']}</span></label>
                  <input type="password" value={this.state.form['re-password']} name="re-password" onChange={this.handleChange}/>
              </div>
            </div>
            <div className="resever-mail">
              <input type="checkbox"/>
              <label>Đăng ký nhận tin <span>*</span></label>
            </div>
            <h3>Thông tin đăng nhập</h3>
            <div className="register-infor-login">
                <div className="register-infor-name form-gr">
                    <label>Tên đăng nhập <span>{(this.state.validateSpans.nameLogin==undefined)?"*":this.state.validateSpans.nameLogin}</span></label>
                    <input type="text" name="nameLogin" value={this.state.form.nameLogin} onChange={this.handleChange}/>
                </div>
                <div className="register-infor-pass form-gr">
                    <label>Password <span>{(this.state.validateSpans.passwordLogin==undefined)?"*":this.state.validateSpans.passwordLogin}</span></label>
                    <input type="password" name="passwordLogin" value={this.state.form.passwordLogin} onChange={this.handleChange}/>
                </div>
            </div>
            <div className="register-btn-control">
              <button className="btn">Quay lại</button>
              <button className="btn" onClick = {this.handleValidate}>Đăng ký</button>
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

export default connect(null,mapDispatchToProps) (Register);