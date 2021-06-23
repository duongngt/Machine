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
                  }}>Đặt Hàng</button>
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
                  <p className="title" style={styTitleList}>Miễn phí vận chuyển</p>
                  <p className="text-body" style={styTextList}>Chúng tôi vận chuyển miễn phí với các đơn hàng 
                  trị giá trên 1000.000 Đ.</p>
                </div>                
              </div>
              <div className="item" style={{display:"flex",borderBottom: "1px solid #e1e1e1"}}>
                <FontAwesomeIcon icon={faRetweet} style={{color:"rgb(245, 189, 16)",padding:"52px 24px"}}/>
                <div className="text" style={{margin:"32px 0",paddingRight:"18px"}}>
                  <p className="title" style={styTitleList}>chính sách đổi trả</p>
                  <p className="text-body" style={styTextList}>Nếu phát hiện lỗi của nhà sản xuất, chúng tôi sẽ
                  đổi mới sản phẩm trong 7 ngày đầu tiên.</p>
                </div>                
              </div>
              <div className="item" style={{display:"flex",borderBottom: "1px solid #e1e1e1"}}>
                <FontAwesomeIcon icon={faGift} style={{color:"rgb(245, 189, 16)",padding:"52px 24px"}}/>
                <div className="text" style={{margin:"32px 0",paddingRight:"18px"}}>
                  <p className="title" style={styTitleList}>khuyến mãi hàng tuần</p>
                  <p className="text-body" style={styTextList}>Mỗi thứ 7 hàng tuần đều có chương trình giảm
                  giá và khuyến mại lớn.</p>
                </div>                
              </div>
              <div className="item" style={{display:"flex"}}>
                <FontAwesomeIcon icon={faThumbsUp} style={{color:"rgb(245, 189, 16)",padding:"52px 24px"}}/>
                <div className="text" style={{margin:"32px 0",paddingRight:"18px"}}>
                  <p className="title" style={styTitleList}>cam kết hàng chính hãng</p>
                  <p className="text-body" style={styTextList}>Chúng tôi cam kết bán hàng chính hãng 100%
                  với tất cả các loại sản phẩm.</p>
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
