import { combineReducers } from "redux";
import accountReducers from "./reducer/account";


const rootReducer = combineReducers({
 account: accountReducers,

});

export default rootReducer;