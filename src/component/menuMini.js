import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft,faCaretRight,faThLarge} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

class MenuMini extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    let menuMini = {
      display: "flex",
      margin:"50px 0",
      justifyContent:"space-between",
      alignItems:"center"
    }
    let styTitle = {
      display:"flex",
      justifyContent: "space-between"
    }
    let menu = {
      display:"flex",
      alignItems:"center"
    }
    let styButton = {
      padding:"6px 10px",
      border:"1px solid grey"
    }
    let styUl = {
      display:"flex"
    }
    let Li = styled.li`
      padding: 6px 10px;
      border:1px solid grey;
      margin-right:20px;
      font-size:13px;
      color:grey;
      &:hover{
        background: #f5bd10;
        border:1px solid #f5bd10;
        color: white;
      }
    `
    return ( 
      <div className="menuMini" style={menuMini}>
          <div style={styTitle}>
            <h3 style={{fontWeight: "normal"}}><FontAwesomeIcon icon={faThLarge} style={{color:"#f5bd10"}} /> SẢN PHẨM MỚI </h3>
          </div>
          <div style={menu}>
            	<ul className="menu" style={styUl}>
                <Li>Máy khoan</Li>
                <Li>Máy in 3D</Li>
                <Li>Máy CNC</Li>
                <Li>Máy Tiện</Li>
                <Li>Máy Khác</Li>
              </ul>
              <div style={{width:"60px",display:"flex",justifyContent:"space-between"}}>
                <FontAwesomeIcon icon={faCaretLeft} style={styButton} />
                <FontAwesomeIcon icon={faCaretRight} style={styButton} />
              </div>   
          </div>
      </div>
    );
  }
}

export default (MenuMini);