const stateDefault={categories:[],objDetail:null,showPopup:"none",user:null,notify:"none",amountCart:0,cart:[],cartDb:{},delItem:null}
function reducer(state=stateDefault, action){
	switch(action.type){
		case "GETDATA":
			state.categories = action.data;
			return {...state};
			break; 
		case "SHOWDETAIL":
			state.objDetail = action.data;
			return {...state};
		case "SHOWDPOPUPLOGIN":
			state.showPopup = action.data;
			return {...state};
		case "LOGIN":
			state.user = action.data;
			return {...state};
		case "AMOUNTCART":
			state.amountCart = action.data;
			localStorage.setItem("amountCart",state.amountCart)
			return {...state};
		case "ADDCART":
			let sumAmount = 0;
			for(var i=0;i<action.data.length; i++){
				sumAmount += action.data[i].amount;
			}
			state.cart = action.data;
			state.amountCart = sumAmount;
			state.cartDb = action.dataDb;
			return {...state};
		case "NOTIFY":
			state.notify = action.data;
			return {...state};
		default:
			return state;
	}
}
export default reducer;