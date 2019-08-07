import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {apiReducer} from "./api/reducer";
import {userReducer} from "./user/reducer";
import {appReducer} from "./app/reducer";
import {franchiseReducer} from "./franchise/reducer";

const rootReducer = combineReducers({
    api: apiReducer,
    user: userReducer,
    app: appReducer,
    franchise: franchiseReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));