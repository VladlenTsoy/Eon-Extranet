import {Dispatch} from "redux";

export const APP_CHANGE_TITLE = "APP_CHANGE_TITLE";
export const APP_CHANGE_ACTION = "APP_CHANGE_ACTION";
export const APP_CHANGE_LOADING = "APP_CHANGE_LOADING";
export const APP_CHANGE_SETTING = "APP_CHANGE_SETTING";
export const APP_CHANGE_ALGORITHMS = "APP_CHANGE_ALGORITHMS";

export const appChangeTitleNavbar = (title: string) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_TITLE, payload: title});


export const appChangeActionNavbar = (action: string | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_ACTION, payload: action});

// export const appChangeLoading = (action: boolean) =>
//     (dispatch: Dispatch) =>
//         dispatch({type: APP_CHANGE_LOADING, payload: action});

export const appChangeSetting = (action: object | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_SETTING, payload: action});


export const appChangeAlgorithms = (action: object | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_ALGORITHMS, payload: action});