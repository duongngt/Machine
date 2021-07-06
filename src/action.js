export function getData (data){
	return{
		type: "GETDATA",
		data: data
	}
}
export function ShowProductDetail(res){
	return{
		type: "SHOWDETAIL",
		data: res
	}
}
export function ShowPopupLogin(data){
	return{
		type: "SHOWDPOPUPLOGIN",
		data: data
	}
}
export function Login(data){
	return{
		type: "LOGIN",
		data: data
	}
}
export function AmountCart(data){
	return{
		type: "AMOUNTCART",
		data: data
	}
}
export function AddCart(data,dataDb){
	return{
		type: "ADDCART",
		data: data,
		dataDb: dataDb
	}
}
export function Notify(data,obj){
	return{
		type: "NOTIFY",
		data: data,
		obj:obj
	}
}
export function Order(data){
	return{
		type: "ORDER",
		data: data
	}
}
