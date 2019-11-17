/**
 * @author Semper
 */
import {RECEIVE_BOOK_CACHE, REQUEST_BOOK_CACHE} from "../constants/ActionTypes";

const initialState = {
    isFetching: false
};

export default function bookCache(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BOOK_CACHE:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_BOOK_CACHE:
            return {
                ...state,
                article: action.article,
                articleUrl: action.articleUrl,
                isFetching: false
            };
        default:
            return state;
    }
}
