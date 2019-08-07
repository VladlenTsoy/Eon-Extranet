import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {apiReducer} from "./api/reducer";
import {userReducer} from "./user/reducer";
import {appReducer} from "./app/reducer";

const rootReducer = combineReducers({
    api: apiReducer,
    user: userReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));