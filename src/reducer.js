const stateDefault={categories:[],objDetail:null,showPopup:"none",user:null}
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
		default:
			return state;
	}
}
export default reducer;