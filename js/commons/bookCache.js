/**
 * @author Semper
 */
import {RECEIVE_BOOK_CACHE, REQUEST_BOOK_CACHE} from '../constants/ActionTypes';

export function requestBookCache(bookCacheUrl, receiveType) {
  return {
    type: REQUEST_BOOK_CACHE,
    bookCacheUrl,
    receiveType,
  };
}

export function receiveBookCache(article, articleUrl) {
  return {
    type: RECEIVE_BOOK_CACHE,
    article,
    articleUrl,
  };
}
