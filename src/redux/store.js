import {createStore,applyMiddleware} from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./rootReducer";



const store = createStore(rootReducer, applyMiddleware(reduxThunk,logger));

export default store;