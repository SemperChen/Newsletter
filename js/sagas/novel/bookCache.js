/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {fetchBookContentGBKText, fetchBookContentJSON, fetchBookContentText} from "../../utils/HttpUtil";
import {receiveBookCache} from "../../actions/bookCache";
import {RECEIVE_TYPE, REQUEST_CACHE_FAILED} from "../../constants/constants";

export function* fetchBookCache(params) {
    const {bookCacheUrl, receiveType} = params;
    try {
        let article;
        switch (receiveType) {
            case RECEIVE_TYPE.JSON:
                article = yield call(fetchBookContentJSON, bookCacheUrl);
                break;
            case RECEIVE_TYPE.TEXT:
                article = yield call(fetchBookContentText, bookCacheUrl);
                break;
            case RECEIVE_TYPE.GBKTEXT:
                article = yield call(fetchBookContentGBKText, bookCacheUrl);
                break
        }
        yield put(receiveBookCache(article, bookCacheUrl))
    } catch (e) {
        yield put(receiveBookCache(REQUEST_CACHE_FAILED, bookCacheUrl));
        console.log('fetchBookCache:', e.message)
    }

}
