import React, {createContext, useReducer, useContext} from "react";
import {defaultUserState, userAction} from "./user/reducer";
import {defaultApiState, apiAction} from "./api/reducer";
import {defaultLanguageState, languagesAction} from "./language/reducer";

const initialState = {
    user: defaultUserState,
    api: defaultApiState,
    language: defaultLanguageState,
};

const StoreContext = createContext(initialState);

const Actions = {
    ...userAction,
    ...apiAction,
    ...languagesAction
};

const reducer = (state: any, action: { type: string, payload: any }) => {
    // @ts-ignore
    const act = Actions[action.type];
    const update = act(action.payload);
    return {...state, ...update};
};

export const StoreProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        // @ts-ignore
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const {state, dispatch}: any = useContext(StoreContext);
    return [state, dispatch];
};
