import nav from './novel/navReducers';
import {combineReducers} from "redux";
import bookmarks from "./novel/bookmarks";
import search from "./novel/search";
import read from "./novel/read";
import catalog from "./novel/catalog";
import detail from "./novel/detail";
import spread from "./novel/spread";
import rankings from "./novel/rankings";
import hotRec from "./novel/hotRec";
import bestEnd from "./novel/bestEnd";
import editorRec from "./novel/editorRec";
import rankingDetail from "./novel/rankingDetail";
import category from "./novel/category";
import categoryDetail from "./novel/categoryDetail";
import config from "./novel/config";
import guessYouLike from "./novel/guessYouLike";
import hotSearch from "./novel/hotSearch";
import otherSearch from "./novel/otherSearch";
import hotSimilar from "./novel/hotSimilar";
import notification from "./novel/notification";
import login from "./novel/login";
import bookCache from "./novel/bookCache";
import catalog2 from "./novel/catalog2";

const AppReducer = combineReducers({
    nav,
    bookmarks,
    search,
    read,
    catalog,
    catalog2,
    detail,
    rankings,
    spread,
    hotRec,
    bestEnd,
    editorRec,
    rankingDetail,
    category,
    categoryDetail,
    config,
    guessYouLike,
    hotSearch,
    otherSearch,
    hotSimilar,
    notification,
    login,
    bookCache
});
export default AppReducer
