const axios = require('axios');

export const API_CHANGE_ACCESS_TOKEN = "API_CHANGE_ACCESS_TOKEN";

// const DOMAIN_API = 'http://api2.eon.uz/api';
// const DOMAIN_API = 'http://192.168.1.105:8000/api';
const DOMAIN_API = 'http://192.168.0.103:8000/api';

export const defaultApiState = {
    domain: DOMAIN_API,
    axios: axios,
    guest: axios.create({baseURL: DOMAIN_API}),
    user_general: axios.create({baseURL: DOMAIN_API + '/user'}),
    user_access: axios.create({baseURL: DOMAIN_API + '/user/admin'})
};

export const apiAction = {
    [API_CHANGE_ACCESS_TOKEN]: (state: any) => ({api: state}),
};

// export const apiReducer = (state: any, action: { type: string; payload: any }) => {
//     switch (action.type) {
//         default:
//             return state
//     }
// };
