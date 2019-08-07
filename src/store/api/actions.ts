import {Dispatch} from "redux";

export const API_CHANGE_ACCESS_TOKEN = "API_CHANGE_ACCESS_TOKEN";
export const API_DELETE_ACCESS_TOKEN = "API_DELETE_ACCESS_TOKEN";

export const apiChangeAccessToken = (token?: string) =>
    async (dispatch: Dispatch, getState: any) => {
        if (token)
            localStorage.setItem("EON_API_TOKEN_ACCESS", token);

        if (localStorage.getItem("EON_API_TOKEN_ACCESS") !== null) {
            getState().api.user_general.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("EON_API_TOKEN_ACCESS");
            dispatch({type: API_CHANGE_ACCESS_TOKEN, payload: localStorage.getItem("EON_API_TOKEN_ACCESS")});
        }
    };

export const apiDeleteAccessToken = () =>
    (dispatch: Dispatch) => {
        localStorage.removeItem("EON_API_TOKEN_ACCESS");
        dispatch({type: API_DELETE_ACCESS_TOKEN, payload: null});
    };