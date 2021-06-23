const stateDefault={categories:[],objDetail:null, showPopup:"none"}
function reducer(state=stateDefault, action){
	switch(action.type){
		case "GETDATA":
			state.categories = action.data;
			return {...state};
			break; 
		case "SHOWDETAIL":
			state.objDetail = action.data;
			return {...state};
		case "SHOWPOPUPLOGIN":
			state.showPopup = action.data;
			return {...state};
		default:
			return state;
	}
}
export default reducer;