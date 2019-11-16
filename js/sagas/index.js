import {all} from "redux-saga/effects";
import {REQUEST_BOOKMARKS} from "../constants/ActionTypes";
import {takeLatestFetch} from "../utils/takeLatestFetch";
import {fetchBookmarks} from "./bookmarks";

const rootSaga = function* root() {
    yield all([
        takeLatestFetch(REQUEST_BOOKMARKS,fetchBookmarks)
    ])
};
export default rootSaga;
