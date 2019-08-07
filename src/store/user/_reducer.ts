export const FETCH_CURRENT_USER_DATA = "FETCH_CURRENT_USER_DATA";
export const DELETE_CURRENT_USER_DATA = "DELETE_CURRENT_USER_DATA";

interface Guest {
    id: null
}

interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string | null,
    login: string,
    date_of_birth: string | null,
    phone: string | null,
    image: string,
    setting: object,
    hide: number | null,
    block: string | null,
    date_unblock: string | null,
    center_id: number | null,
    group_id: number | null,
    access: string,
    lang_id: number | null,
    coins: number,
}

export const defaultUserState: Guest = {
    id: null,
};

export const userAction = {
    [FETCH_CURRENT_USER_DATA]: (state: User | Guest) => ({user: state}),
    [DELETE_CURRENT_USER_DATA]: (state: Guest) => ({user: state})
};
