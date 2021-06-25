import React from 'react';
import HomePage from './homePage.js';
import IntroPage from './component/introPage.js';
import ProductsPage from './component/productsPage.js';
import SalePage from './component/salePage.js';
import ServicePage from './component/servicePage.js';
import ContactPage from './component/contactPage.js';
import DetailsProduct from './component/detailsProduct.js'
import Register from './component/register.js';
import PopupLogin from './component/popupLogin.js'
import {connect} from 'react-redux';
import {getData} from './action.js';
import {BrowserRouter as  Router, Route} from 'react-router-dom';
import {Switch} from 'react-router';
import axios from '../node_modules/axios';
import './App.css';
import './style/styHeader.css';
import './style/styHotProduct.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      categories:[],
      showPopup:"none"
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/categories?_embed=products")
    .then(response=>{
      this.props.dispatch(getData(response.data));
    }).catch((err)=>{
      console.log(err)
    });
  }
  static getDerivedStateFromProps(props){
    return {showPopup:props.showPopup}
  }
  render(){
    return ( 
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/intro" exact component={IntroPage}/>
            <Route path="/products" exact component={ProductsPage}/>
            <Route path="/sale" exact component={SalePage}/>
            <Route path="/service" exact component={ServicePage}/>
            <Route path="/contact" exact component={ContactPage}/>
            <Route path="/detailProduct" exact component={DetailsProduct}/>
            <Route path="/register" exact component={Register}/>
          </Switch>
          <PopupLogin showPopup={this.state.showPopup}/>
        </div>
      </Router>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    showPopup:state.showPopup
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
