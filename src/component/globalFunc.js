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
      if(response.data.length>0 && response.data[0].cart.length>0){
        GetProductCart(response.data[0].cart,[],0,function(res){
          callback(res,response.data[0]);
        })
      }
    })
    function GetProductCart(cart,newCart,index,callback){
      axios.get("http://localhost:3001/products?id="+ cart[index].productId)
      .then(response2=>{
        let obj = response2.data[0];
        obj.amount = cart[index].amount;
        newCart.push(obj);
        index++;
        if(index < cart.length){
          GetProductCart(cart,newCart,index,callback);
        }else{
          callback(newCart);
        }
      })
    }
  }
export {Validate,GetUsercart};