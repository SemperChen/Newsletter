/**
 * @author Semper
 */
import {storage} from "./StorageUtil";
import {BOOKMARKS} from "../constants/constants";

export function saveBookmark(bookmark) {
    try{
        if (bookmark !== null && bookmark !== undefined) {

            storage.save({
                key: BOOKMARKS,
                id: bookmark.tag.replace('_', ''),
                data: bookmark
            })
        }
    }catch(e){
        console.warn('saveBookmark func',e.message)
    }

}

export function removeBookmark(key, id) {
    try{
        storage.remove({
            key: key,
            id: id.replace('_', '')
        });
    }catch(e){
        console.warn('removeBookmark func',e.message)
    }
}

export function loadBookmarks() {
    try{
        return storage.getAllDataForKey(BOOKMARKS).then(bookmarks => {
            // 如果找到数据，则在then方法中返回
            console.log('loadBookmarks', bookmarks);
            return bookmarks;
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            console.warn('读取数据失败', err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }catch(e){
        console.warn('loadBookmarks func',e.message)
    }

}

const CATALOG = 'catalog';

export function saveCatalog(catalog, tag, cacheChapterCount) {
    try{
        if (catalog !== null && catalog !== undefined) {
            storage.save({
                key: CATALOG + tag.replace('_', ''),
                data: {catalog,cacheChapterCount}
            })
        }
    }catch(e){
        console.warn('saveCatalog func',e.message)
    }

}

export function removeCatalog(tag) {
    try{
        storage.remove({
            key: CATALOG + tag.replace('_', '')
        });
    }catch(e){
        console.warn('removeCatalog func',e.message)
    }

}

export function loadCatalog(tag) {
    try{
        return storage.load({
            key: CATALOG + tag.replace('_', ''),
        }).then(res => {
            return res
        }).catch(err => {
            console.warn('读取数据失败', err.message);
            return null
           /* switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }*/
        })
    }catch(e){
        console.warn('loadCatalog func',e.message)
    }
}

/***********************************************************************************************************************
 *书签排序
 */
export const sortBy = function (name) {
    return function (o, p) {
        let a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a > b ? -1 : 1;
            }
            return typeof a > typeof b ? -1 : 1;
        }
        else {
            throw ("BookmarkUtil sortBy error");
        }
    }
};