import {fetchBookmarks} from "./novel/bookmarks";
import {fetchSearchResult} from "./novel/search";
import {fetchCatalog} from "./novel/catalog";
import {fetchBookDetail} from "./novel/detail";
import {fetchSpread} from "./novel/spread";
import {fetchRankings} from "./novel/rankings";
import {fetchHotRec} from "./novel/hotRec";
import {fetchBestEnd} from "./novel/bestEnd";
import {fetchEditorRec} from "./novel/editorRec";
import {fetchRankingDetail} from "./novel/rankingDetail";
import {fetchCategory} from "./novel/category";
import {fetchBookContent} from "./novel/read";
import {fetchCategoryDetail} from "./novel/categoryDetail";
import {fetchConfig} from "./novel/config";
import {fetchGuessYouLike} from "./novel/gussYouLike";
import {fetchHotSearch} from "./novel/hotSearch";
import {watchEverySearch} from "./novel/otherSearch";
import {fetchHotSimilar} from "./novel/hotSimilar";
import {fetchNotification} from "./novel/notification";
import {login} from "./novel/login";
import {
    REQUEST_APP_CONFIG,
    REQUEST_ARTICLE,
    REQUEST_BEST_END,
    REQUEST_BOOK_CACHE,
    REQUEST_BOOKMARKS,
    REQUEST_CATALOG, REQUEST_CATALOG2,
    REQUEST_CATEGORY,
    REQUEST_CATEGORY_DETAIL,
    REQUEST_DETAIL,
    REQUEST_EDITOR_REC,
    REQUEST_GUESS_YOU_LIKE,
    REQUEST_HOT_REC,
    REQUEST_HOT_SEARCH,
    REQUEST_HOT_SIMILAR,
    REQUEST_LOGIN,
    REQUEST_NOTIFICATION,
    REQUEST_OTHER_SEARCH,
    REQUEST_RANKING_DETAIL,
    REQUEST_RANKINGS,
    REQUEST_SEARCH,
    REQUEST_SPREAD
} from '../constants/ActionTypes';
import {takeLatestFetch} from '../utils/takeLatestFetch';
import {all} from "redux-saga/effects";
import {fetchBookCache} from "./novel/bookCache";
import {fetchCatalog2} from "./novel/catalog2";

const rootSaga = function* root() {
    yield all([
        takeLatestFetch(REQUEST_BOOKMARKS,fetchBookmarks),
        takeLatestFetch(REQUEST_SEARCH,fetchSearchResult),
        takeLatestFetch(REQUEST_ARTICLE,fetchBookContent),
        takeLatestFetch(REQUEST_CATALOG,fetchCatalog),
        takeLatestFetch(REQUEST_CATALOG2,fetchCatalog2),
        takeLatestFetch(REQUEST_DETAIL,fetchBookDetail),
        takeLatestFetch(REQUEST_RANKINGS,fetchRankings),
        takeLatestFetch(REQUEST_SPREAD,fetchSpread),
        takeLatestFetch(REQUEST_HOT_REC,fetchHotRec),
        takeLatestFetch(REQUEST_BEST_END,fetchBestEnd),
        takeLatestFetch(REQUEST_EDITOR_REC,fetchEditorRec),
        takeLatestFetch(REQUEST_RANKING_DETAIL,fetchRankingDetail),
        takeLatestFetch(REQUEST_CATEGORY,fetchCategory),
        takeLatestFetch(REQUEST_CATEGORY_DETAIL,fetchCategoryDetail),
        takeLatestFetch(REQUEST_APP_CONFIG,fetchConfig),
        takeLatestFetch(REQUEST_GUESS_YOU_LIKE,fetchGuessYouLike),
        takeLatestFetch(REQUEST_HOT_SEARCH,fetchHotSearch),
        takeLatestFetch(REQUEST_OTHER_SEARCH,watchEverySearch),
        takeLatestFetch(REQUEST_HOT_SIMILAR,fetchHotSimilar),
        takeLatestFetch(REQUEST_NOTIFICATION,fetchNotification),
        takeLatestFetch(REQUEST_LOGIN,login),
        takeLatestFetch(REQUEST_BOOK_CACHE,fetchBookCache)
    ])
};
export default rootSaga;
