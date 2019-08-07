import {
    APP_CHANGE_ACTION,
    APP_CHANGE_ALGORITHMS,
    APP_CHANGE_LOADING,
    APP_CHANGE_SETTING,
    APP_CHANGE_TITLE
} from "./actions";

export const appReducer = (state = {
    title: 'Моя страница',
    action: null,
    loading: true,
    setting: null,
    algorithms: null,
}, action: any) => {
    switch (action.type) {
        case APP_CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case APP_CHANGE_ACTION:
            return {
                ...state,
                action: action.payload
            };
        case APP_CHANGE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case APP_CHANGE_SETTING:
            return {
                ...state,
                setting: action.payload
            };
        case APP_CHANGE_ALGORITHMS:
            return {
                ...state,
                algorithms: action.payload
            };
    }
    return state;
};