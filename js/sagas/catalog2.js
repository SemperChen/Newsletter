/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {fetchBookContentGBKText, fetchHtml, fetchJSON} from "../utils/HttpUtil";
import {RECEIVE_TYPE, REQUEST_CATALOG_FAILED} from "../constants/constants";
import {receiveCatalog2} from "../actions/catalog2";

export function* fetchCatalog2(params) {
    const {url, receiveType} = params;
    try {
        let catalogData;
        switch (receiveType) {
            case RECEIVE_TYPE.JSON:
                catalogData = yield call(fetchJSON, url);
                break;
            case RECEIVE_TYPE.TEXT:
                catalogData = yield call(fetchHtml, url);
                break;
            case RECEIVE_TYPE.GBKTEXT:
                catalogData = yield call(fetchBookContentGBKText, url);
                break
        }
        yield put(receiveCatalog2(url, catalogData))
    } catch (e) {
        yield put(receiveCatalog2(url, REQUEST_CATALOG_FAILED));
        console.log('fetchCatalog func:' + e.message)
    }

}
