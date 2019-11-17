/**
 * @author Semper
 */
import {CLEAR_CATALOG2, RECEIVE_CATALOG2, REQUEST_CATALOG2} from "../constants/ActionTypes";

export function requestCatalog2(url, receiveType) {
    return {
        type: REQUEST_CATALOG2,
        url,
        receiveType
    };
}

export function receiveCatalog2(url, catalogData) {
    return {
        type: RECEIVE_CATALOG2,
        url,
        catalogData
    };
}

export function clearCatalog2() {
    return {
        type: CLEAR_CATALOG2
    };
}
