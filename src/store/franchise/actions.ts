import {Dispatch} from "redux";

export const FRANCHISES_FETCH_PAGINATION = "FRANCHISES_FETCH_PAGINATION";

export const franhisesFetchPagination = () =>
    (dispatch: Dispatch, getState: any) => {
        getState().api.user_access.get('franchises');
        dispatch({type: FRANCHISES_FETCH_PAGINATION, payload: null});
    };