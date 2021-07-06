import React from 'react';
import axios from '../../node_modules/axios';

function Validate(formObj){
  let submit = true, spanInf={};
  //validate email
  if(formObj.email=="" || formObj.email.search("@") == -1){
    spanInf.email = "Invail email!";
    submit = false;
  }
  //check password
  if(formObj.password==""){
    spanInf.password = "The field password not empty";
    submit = false;
  }
  //check rePassword
  if(formObj['re-password']!=formObj.password){
    spanInf['re-password'] = "Re-password not match";
    submit = false;
  }
  // check name
  if(formObj.name==""){
    spanInf.name = "The field name not empty";
    submit = false;
  }
  // phone
  let phoneVal= formObj.phone.match(/\d/gi);
  if(formObj.phone==""|| phoneVal==null|| phoneVal.length< formObj.phone.length){
    spanInf.phone = "Invaild phone number";
    submit = false;
  }
  //address
  if(formObj.address==""){
    spanInf.address = "The field address not empty";
    submit = false;
  }
   //nameLogin
  if(formObj.nameLogin==""){
    spanInf.nameLogin = "The field name login not empty";
    submit = false;
  }
  //check passwordLogin
  if(formObj.passwordLogin!=formObj.password){
    spanInf.passwordLogin = "Password not match";
    submit = false;
  }
  // chhec submit
  return {submit:submit, spanInf:spanInf}
};
function GetUsercart(user, callback){
  axios.get("http://localhost:3001/carts?userId="+ user.id)
  .then(response=>{
    if(response.data.length>0){
      GetProductCart(response.data[0].cart,[],0,function(res){
        callback(res,response.data[0]);
      })
    }
    else{
      callback([],{});
    }
  })
  function GetProductCart(cart,newCart,index,callback){
    if(cart.length==0){return;}
    axios.get("http://localhost:3001/products?id="+ cart[index].productId)
    .then(response2=>{
      let obj = response2.data[0];
      obj.amount = cart[index].amount;
      newCart.push(obj);
      index++;
      if(index<cart.length){
        GetProductCart(cart,newCart,index,callback);
      }else{
        callback(newCart);
      }
    })
  }
};
function AddToCart(props,amount,callback){
  if(props.user!=null){
    let hasExist = false;
    let objCartDb = {...props.cartDb};
    let myCartDb = (objCartDb.cart==undefined)? [] : objCartDb.cart;
    let myCart = [...props.cart];
    for(var i=0; i<myCartDb.length; i++){
      if(myCartDb[i].productId ==props.objDetail.id){
        myCartDb[i].amount += amount;
        myCart[i].amount += amount;
        hasExist = true;
        break;
      }
    }
    let objCart ={
      userId: props.user.id,
      cart: myCartDb
    }
    if(!hasExist){
      myCartDb.push({
        productId: props.objDetail.id,
        amount: amount
      })
      let objPro = {...props.objDetail};
      objPro.amount = amount;
      myCart.push(objPro);
      
    }
    if(props.cartDb.cart==undefined){
      // post data----
      axios.post("http://localhost:3001/carts",objCart)
      .then(response=>{
        callback(myCart, response.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
    else{
      axios.patch("http://localhost:3001/carts/"+props.cartDb.id, objCart)
      .then(response=>{
        callback(myCart, response.data);
      })
    }
  }else{
    callback();
  }
}
function formatMoney(price){
  if(price==undefined){return;}
  let str = price.toString();
  let newPrice = [];
  if(str.length>3){
    let arrStr = str.split("").reverse();
    let j=3;
    for(var i=0; i<arrStr.length; i=i+3){
      var arrTemp = arrStr.slice(i,j);
      newPrice.push(arrTemp.reverse().join(""));
      j = j+3 ; 
    }
  }
  return (newPrice.length==0)? str: newPrice.reverse().join(".");
}


export {Validate,GetUsercart,formatMoney, AddToCart};