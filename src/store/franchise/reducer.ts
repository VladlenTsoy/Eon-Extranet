import {FRANCHISES_FETCH_PAGINATION} from "./actions";

export interface Franchise {
    title: string,
    description: string,
    image: string,
    url_image: string,
    director_id: number,
    price: any,
}

export const franchiseReducer = (state = {
    franchises: [],
}, action: any) => {
    switch (action.type) {
        case FRANCHISES_FETCH_PAGINATION:
            return {
                ...state,
                franchises: action.payload
            };
        default:
            return state;
    }
};