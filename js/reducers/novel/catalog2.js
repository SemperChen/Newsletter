/**
 * @author Semper
 */

import {
    CLEAR_CATALOG, CLEAR_CATALOG2,
    RECEIVE_CATALOG,
    RECEIVE_CATALOG2,
    REQUEST_CATALOG,
    REQUEST_CATALOG2
} from "../../constants/ActionTypes";

const initialState = {
    isCatalogFetching: false
};
export default function catalog2(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CATALOG2:
            return {
                ...state,
                isCatalogFetching: true
            };
        case RECEIVE_CATALOG2:
            return {
                ...state,
                url: action.url,
                catalogData: action.catalogData,
                isCatalogFetching: false
            };
        case CLEAR_CATALOG2:
            return {
                ...state,
                url: undefined,
                catalogData: undefined,
                isCatalogFetching: false
            };
        default:
            return state;
    }
}
