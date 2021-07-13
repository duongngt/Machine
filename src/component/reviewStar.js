import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'

class ReviewStar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      arrRated: [farStar,farStar,farStar,farStar,farStar]
    }
  }
  
  handleRate=(index)=>{
    let copyState = [farStar,farStar,farStar,farStar,farStar];
    for(var i=0; i<=index; i++){
      copyState[i] = faStar
    }
    this.props.handleRateStar(index+1);
    this.state.arrShowStar = copyState;
    this.setState({
      arrRated: copyState
    })
  }
  render(){
    const stars = this.state.arrRated.map((item,index)=>{
      return(
        <li onClick={(e)=>this.handleRate(index)}><FontAwesomeIcon icon={item} color="#f5bd10"/></li>
      )
    })
    return ( 
      <div className="ReviewStar">
      	<ul>
          {stars}
        </ul>
      </div>
    );
  }
}

export default ReviewStar;