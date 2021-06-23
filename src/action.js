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
		type: "SHOWPOPUPLOGIN",
		data: data
	}
}