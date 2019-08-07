import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {apiReducer} from "./api/reducer";
import {userReducer} from "./user/reducer";

const rootReducer = combineReducers({
    api: apiReducer,
    user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));