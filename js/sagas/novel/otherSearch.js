/**
 * @author Semper
 */
import {call, fork, put} from "redux-saga/effects";
import {fetchOtherSearch, searchBook} from "../../utils/HttpUtil";
import {OTHER_SEARCH_URLS} from "../../constants/api";
import {receiveOtherSearch} from "../../actions/otherSearch";

function* fetchOtherSearchResult(searchData, bookName) {
    try {
        let otherSearchResult = yield call(fetchOtherSearch, searchData.searchUrl + bookName, searchData.unicodeName);
        yield put(receiveOtherSearch(otherSearchResult, searchData.searchUrl, searchData.siteName))
    } catch (error) {
        console.log('fetchSearchResult:', error.message);
        // yield put(receiveSearch(null))
    }
};

export function* watchEverySearch(params) {
    for (let i = 0; i < OTHER_SEARCH_URLS.length; i++) {

        yield fork(fetchOtherSearchResult, OTHER_SEARCH_URLS[i], params.bookName)
    }
}
