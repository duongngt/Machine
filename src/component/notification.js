import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle,faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {Link,Redirect} from 'react-router-dom'
import styled from 'styled-components'
import {connect} from 'react-redux';
import {Notify} from '../action.js';

let Div = styled.div`
  width:100%;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  background-color:rgba(1,1,1,0.5);
  z-index:3;
  .Notification-box {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width: 300px;
    height: 200px;
    background-color:white;
    box-shadow:0px 0px 10px black;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-radius: 5px;
    h3{
      font-size:18px;
    }
    .btn{
      padding:8px;
      margin-top:20px;
      border-radius:4px;
    }
  }
  .iconClose{
    position:absolute;
    top:15px;
    right:15px;
    font-size:20px;
  }
  .icon-check{
    margin-top:20px;
    font-size:72px;
    color:green;
  }
`
class Notification extends React.Component {
  constructor(props){
    super(props);
    this.state={
      notify:"none",
      notifyContent:{
        text:"",
        buttons:[]
      }
      
    }
  }
  handleClose=()=>{
    this.props.dispatch(Notify("none"));   
  }
  static getDerivedStateFromProps(props){
      if(props.notify=="none"){
        return {notify:props.notify}
      }
      else{
        setTimeout(function(){props.dispatch(Notify("none"))}, 2000);
        return{
          notify:props.notify,
          notifyContent: props.notifyContent
        }
      }
   }
  render(){	
    let btns = null;
    if(this.state.notifyContent.buttons!=undefined){
      btns = this.state.notifyContent.buttons.map((item,index)=>{
        return(
          <Link to={item.link}><button onClick={()=>this.props.dispatch(Notify("none"))} className="btn">{item.text}</button></Link>
        )
      })
    }
    return ( 
      <Div className="Notification" onClick={()=>this.props.dispatch(Notify("none"))} style={{display:this.state.notify}}>
        <div className="Notification-box">
          <Link to="/"><FontAwesomeIcon className="iconClose" icon={faTimesCircle} color="#f5bd10" onClick={this.handleClose}/></Link>
      		<h3>{this.state.notifyContent.text}</h3>
          <div><FontAwesomeIcon className="icon-check" icon={faCheckCircle} color="#f5bd10"/></div>
          <div>
            {btns}
          </div>
        </div>
      </Div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    notify:state.notify,
    notifyContent:state.notifyContent
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    dispatch
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Notification);