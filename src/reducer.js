const stateDefault={categories:[],objDetail:null,showPopup:"none",user:null,notify:"none", notifyContent:{},amountCart:0,cart:[],order:[],cartDb:{},delItem:null}
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
			state.notifyContent = action.obj
			return {...state};
		case "ORDER":
			state.order = action.data;
			return {...state};
		default:
			return state;
	}
}
export default reducer;