import axios from "axios";
import {API_CHANGE_ACCESS_TOKEN, API_DELETE_ACCESS_TOKEN} from "./actions";

const DOMAIN_API = 'http://api2.eon.uz/api';
// const DOMAIN_API = 'http://api.eon.loc/api';
// const DOMAIN_API = 'http://192.168.1.105:8000/api';
// const DOMAIN_API = 'http://192.168.0.103:8000/api';


export const apiReducer = (state = {
    token: localStorage.getItem('EON_API_TOKEN_ACCESS'),
    guest: axios.create({baseURL: DOMAIN_API}),
    user_general: axios.create({baseURL: DOMAIN_API + '/user'}),
    user_access: axios.create({baseURL: DOMAIN_API + '/user/admin'})
}, action: any) => {
    switch (action.type) {
        case API_CHANGE_ACCESS_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case API_DELETE_ACCESS_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
};