/**
 * @author Semper
 */
import {CLEAR_ARTICLE, RECEIVE_ARTICLE, REQUEST_ARTICLE} from "../constants/ActionTypes";

export function requestArticle(articleUrl, receiveType, cacheArticle) {
    return {
        type: REQUEST_ARTICLE,
        articleUrl,
        receiveType,
        cacheArticle
    };
}

export function receiveArticle(article, articleUrl) {
    return {
        type: RECEIVE_ARTICLE,
        article,
        articleUrl
    };
}

export function clearArticle() {
    return {
        type: CLEAR_ARTICLE
    };
}