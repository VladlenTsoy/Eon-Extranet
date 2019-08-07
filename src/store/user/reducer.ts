import {DELETE_CURRENT_USER_DATA, FETCH_CURRENT_USER_DATA, SET_CURRENT_USER_DATA} from "./actions";

export const userReducer = (state: User | Guest = {
    id: null,
}, action: { type: any; payload: any; }): any => {
    switch (action.type) {
        case FETCH_CURRENT_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        case DELETE_CURRENT_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
    }
    return state;
};

interface Guest {
    id: null
}

export default interface User {
    // common
    id: number;
    login: string | null;
    email: string | null;
    email_verified_at: string | null;
    first_name: string;
    last_name: string;
    date_of_birth: string | null;
    phone: string | null;
    image: string;
    setting: object;
    access: 'student' | 'teacher';
    delete_id: number | null;
    delete_at: string | null;
    lang_id: string;
    entrance_at: string;
    last_activity: string;
    created_at: string;
    updated_at: string | null;

    // student
    group_id: number | null;
    coins: number;

    // teacher
    method_ids: any | null;
    center_id: number | null;
}