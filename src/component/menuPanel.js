import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import styled from 'styled-components';

class MenuPanel extends React.Component {
  render(){
    const Div = styled.div`
      ul li:nth-child(1){
        background-color: #202020;
        a {
          color: #f5bd10;
          text-transform: uppercase;
        }
      }
    `

  	const menu = this.props.categories.map((item,index)=>{
  	return(
  				<li key={index}>
  					<a>
  						<FontAwesomeIcon icon={faThLarge}/>&ensp;
  						{item.name}
  					</a>
  				</li>
  			)
  	})
    return ( 
      <Div className="MenuPanel">
      	<ul>
          <li>
            <a>
              <FontAwesomeIcon icon={faBars}/>&ensp;
              Danh mục sản phẩm
            </a>
          </li>
      		{menu}
      	</ul>
      </Div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    categories:state.categories
  }
}
export default connect(mapStateToProps,null)(MenuPanel);