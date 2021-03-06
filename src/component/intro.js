import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlane, faRetweet,faGift, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import SlideControl from './sliderControl.js';
import {connect} from 'react-redux';
import axios from '../../node_modules/axios';

class Intro extends React.Component {
  constructor(props){
    super(props);
    this.state={
      productsSlide:[]
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/products?slide.status=show")
    .then(respones=>{
      this.setState({
        productsSlide:respones.data
      })
    })
  }
  componentDidUpdate(){
    let slides = document.getElementsByClassName("slider");
    SlideControl(slides);
  }
  render(){
    let styBoxBlack={
      display:"inline-block",
      width:"10px",
      height:"10px",
      backgroundColor:"grey",
      margin:"4px"
    }
    let styIconLi={
      color: "#f5bd10",
      paddingRight: "10px",
      fontSize: "20px"
    }
    let styTitleList ={
      textTransform:" uppercase",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "16px",
      color: "#363636"
    }
    let styTextList={
      fontSize: "13px",
      color: "#898989"
    }
    let stySlide={
      display: "none",
      gridTemplateColumns:"auto auto" ,
      gridTemplateRow: "1fr auto",
      backgroundColor:"#f5f5f5",
      padding: "8%",
      maxHeight: "100%",
      width: "84%"
    }
    var slideCollection = this.state.productsSlide.map((item,index)=>{
      if( item.slide != undefined){
        return (
            <div className="slider" id = {index} style={stySlide}>
              <div className="box-text" style={{fontFamily:'"Roboto", sans-serif'}}>
                  <p className="title" style={{
                    color: "#111111",
                    fontSize: "30px",
                    textTransform: "uppercase",
                    fontWeight: "300"
                  }}>{item.name}</p>
                  <h1 style={{
                    textTransform: "uppercase",
                    color: "#f5bd10",
                    fontWeight: "700",
                    fontSize: "72px",
                    letterSpacing: "8px"
                  }}>{item.brand}</h1>
                  <ul style={{textAlign:"left"}}>
                    <li style={{marginTop:"30px",fontSize:"16px"}}><FontAwesomeIcon icon={faCheckCircle} style={{color:"#f5bd10",marginRight:"10px"}} />{item.slide.infor[0]}</li>
                    <li style={{marginTop:"30px",fontSize:"16px"}}><FontAwesomeIcon icon={faCheckCircle} style={{color:"#f5bd10",marginRight:"10px"}} />{item.slide.infor[1]}</li>
                    <li style={{marginTop:"30px",fontSize:"16px"}}><FontAwesomeIcon icon={faCheckCircle} style={{color:"#f5bd10",marginRight:"10px"}} />{item.slide.infor[2]}</li>
                  </ul>
                  <button style={{
                    marginTop: "42px",
                    padding: "12px 20px",
                    backgroundColor: "#f5bd10",
                    border: "none",
                    color: "#ffffff",
                    fontFamily: '"Roboto", sans-serif',
                    textTransform:" uppercase",
                    fontSize: "14px",
                    textAlign:"left"
                  }}>?????t H??ng</button>
                </div>
                <img src={item.slide.img} alt="" style={{marginLeft:"50px"}} width="260"/>
                <ul style={{gridColumn:"1/3",textAlign:"center"}}>
                  <li style={styBoxBlack}></li>
                  <li style={styBoxBlack}></li>
                  <li style={styBoxBlack}></li>
                </ul>
            </div>
          )
      }
    })
    return ( 
      <div className="intro">
        <div className="wrap" style={{display:"flex", marginTop:"50px"}}>
          <div className="ground" style={{ width: "70%", position: "relative",zIndex:"1",overflow:"hidden"}}>
            {slideCollection}
          </div>
         <div className="info-list" style={{border: "1px solid #e1e1e1", width:"30%",zIndex:"2"}}>
              <div className="item" style={{display:"flex",borderBottom: "1px solid #e1e1e1"}}>
                <FontAwesomeIcon icon={faPlane} style={{color:"rgb(245, 189, 16)",padding:"52px 24px"}}/>
                <div className="text" style={{margin:"32px 0",paddingRight:"18px"}}>
                  <p className="title" style={styTitleList}>Mi???n ph?? v???n chuy???n</p>
                  <p className="text-body" style={styTextList}>Ch??ng t??i v???n chuy???n mi???n ph?? v???i c??c ????n h??ng 
                  tr??? gi?? tr??n 1000.000 ??.</p>
                </div>                
              </div>
              <div className="item" style={{display:"flex",borderBottom: "1px solid #e1e1e1"}}>
                <FontAwesomeIcon icon={faRetweet} style={{color:"rgb(245, 189, 16)",padding:"52px 24px"}}/>
                <div className="text" style={{margin:"32px 0",paddingRight:"18px"}}>
                  <p className="title" style={styTitleList}>ch??nh s??ch ?????i tr???</p>
                  <p className="text-body" style={styTextList}>N???u ph??t hi???n l???i c???a nh?? s???n xu???t, ch??ng t??i s???
                  ?????i m???i s???n ph???m trong 7 ng??y ?????u ti??n.</p>
                </div>                
              </div>
              <div className="item" style={{display:"flex",borderBottom: "1px solid #e1e1e1"}}>
                <FontAwesomeIcon icon={faGift} style={{color:"rgb(245, 189, 16)",padding:"52px 24px"}}/>
                <div className="text" style={{margin:"32px 0",paddingRight:"18px"}}>
                  <p className="title" style={styTitleList}>khuy???n m??i h??ng tu???n</p>
                  <p className="text-body" style={styTextList}>M???i th??? 7 h??ng tu???n ?????u c?? ch????ng tr??nh gi???m
                  gi?? v?? khuy???n m???i l???n.</p>
                </div>                
              </div>
              <div className="item" style={{display:"flex"}}>
                <FontAwesomeIcon icon={faThumbsUp} style={{color:"rgb(245, 189, 16)",padding:"52px 24px"}}/>
                <div className="text" style={{margin:"32px 0",paddingRight:"18px"}}>
                  <p className="title" style={styTitleList}>cam k???t h??ng ch??nh h??ng</p>
                  <p className="text-body" style={styTextList}>Ch??ng t??i cam k???t b??n h??ng ch??nh h??ng 100%
                  v???i t???t c??? c??c lo???i s???n ph???m.</p>
                </div>                
              </div>
            </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return {
    products: state.products
  }
}
export default connect(mapStateToProps, null)(Intro);
