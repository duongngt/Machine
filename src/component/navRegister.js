import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faFacebook,faGooglePlusG,faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {ShowPopupLogin} from '../action.js'
import styled from 'styled-components';

let Div =styled.div`
  .user {
    li:hover{
      cursor:pointer;
    }
  }
`

class NavRegister extends React.Component {
  render(){
  	var styUl={
  		display: "flex",
  		justifyContent:"space-between",
  	}
    return ( 
      <Div className="NavRegister" style={{borderBottom:"1px solid #e1e1e1",backgroundColor:"#f7f7f7"}} >
      <div className="wrap" style={styUl}>
       	<ul className="social-link" style={{display: "flex"}} >
    			<li><FontAwesomeIcon icon={faFacebook}/></li>
    			<li><FontAwesomeIcon icon={faGooglePlusG}/></li>
    			<li><FontAwesomeIcon icon={faInstagram}/></li>
    			<li><FontAwesomeIcon icon={faTwitter}/></li>
    		</ul>
    		<ul class="user" style={{display: "flex"}}> 			
          <Link to="/register">
            <li>Đăng ký</li>
          </Link>
    			<li onClick={(e)=>this.props.dispatch(ShowPopupLogin("block"))}>Đăng nhập</li>
    		</ul>
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
export default connect(null, mapDispatchToProps)(NavRegister);
