/**
 * @author Semper
 */
import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import {getOtherSearchBookInfo} from "../utils/ParseHtmlUtil";
import {BOOKMARKS_URL, OTHER_SEARCH_URLS} from "../constants/api";
import {requestOtherSearch} from "../actions/otherSearch";
import I18n from "../i18n/i18n";
import {Simplified} from "../utils/LanguageUtil";
import type {Bookmarks} from "../model/Bookmark";
import {saveBookmark} from "../utils/BookmarkUtil";
import {requestBookmarks} from "../actions/bookmarks";
import ToastUtil from "../utils/ToastUtil";

const _sortedUniq = require("lodash/sortedUniq");

class BookSources1 extends React.Component {

    searchBookName = '';

    constructor(props) {
        super(props);
        this.otherBookInfos = [];
        this.state = {res: '', searchBookName: ''}
        this.siteNames = [];
    }

    componentDidMount() {
        if (this.props.searchBookName) {
            this.searchBookName = this.props.searchBookName;
            this.searchBook(this.searchBookName);
        }

    }

    setSearchBookName(searchBookName) {
        this.searchBookName = searchBookName
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.siteName) {
            this.siteNames.push(nextProps.siteName);
            let siteNames = _sortedUniq(this.siteNames);
            if (siteNames.length === OTHER_SEARCH_URLS.length) {
                this.requestEnd = true;
                this.siteName = [];
            }
        }
        return this.props.searchResult !== nextProps.searchResult ||
            this.props.baseSearchUrl !== nextProps.baseSearchUrl ||
            this.props.otherSearchResult !== nextProps.otherSearchResult ||
            this.props.baseOtherSearchUrl !== nextProps.baseOtherSearchUrl ||
            this.props.siteName !== nextProps.siteName

    }

    /**
     *保存并重新读取书签
     */
    saveAndRereadBookmarks = async (articleUrlTag, bookName, image, siteName, bookId, author) => {
        //TODO saving
        await this._saveBookmark(articleUrlTag, bookName, image, siteName, bookId, author);
        //TODO saved
        await this._reReadBookmark();
    };

    _saveBookmark = (articleUrlTag, bookName, image, siteName, bookId, author) => {
        let bookmark: Bookmarks = {
            tag: articleUrlTag,
            bookName: bookName,
            bookUrl: null,
            chapterName: null,
            currentChapterNum: 1,
            pageNum: 1,
            totalPage: 0,
            image: image,
            siteName: siteName,
            id: null,
            lastReadTime: new Date().getTime(),
            author: author,
            chaptersTotalCount: 0,
            isUpdated: false
        };
        // console.log('saveBookmark', bookmark.tag);
        saveBookmark(bookmark);
    };

    /**
     *重新读取书签
     */
    _reReadBookmark = () => {
        this.props.dispatch(requestBookmarks(BOOKMARKS_URL))
    };

    componentWillUpdate() {
    }

    componentWillUnmount() {
        // this.props.dispatch(quitSearchPage(this.mainSearchRes, this.mainUrl))
    }

    searchBook = (bookName) => {
        try {
            if (bookName === undefined || bookName === '') {
                ToastUtil.showShort(I18n.t('pleaseInputText'));
            } else {
                // if (NovelAppConfig.isTraditional) {
                //     this.searchBookName = Simplified(this.searchBookName)
                // }
                this.requestEnd = false;
                this.searchBookName = Simplified(bookName);
                // console.log('this.searchBookName--',this.searchBookName,NovelAppConfig.isTraditional)
                // this.props.dispatch(requestSearch(ZSSQ_SEARCH + this.searchBookName));
                this.otherBookInfos = [];
                this.otherBookInfo = null;
                this.props.dispatch(requestOtherSearch(this.searchBookName))
            }
        } catch (e) {
            console.warn('Search _searchBook', e.message)
        }
    };

    _navToReader = (articleUrlTag, bookName, image, siteName, bookId, author) => {
        if (this.onlySaveBookmark) {
            this.saveAndRereadBookmarks(articleUrlTag, bookName, image, siteName, bookId, author);
            this.props.navigation.goBack()
        } else {
            this.props.navigation.navigate('Read', {
                articleUrlTag: articleUrlTag,
                bookName: bookName,
                image: image,
                siteName: siteName,
                bookId: bookId,
                author:author
            })
        }
    };

    clearOtherBookInfo = () => {
        this.otherBookInfo = null
    }

    render() {
        try {
            // console.log(this.props.searchResult);
            if (this.props.otherSearchResult) {
                let result = getOtherSearchBookInfo(this.props.otherSearchResult, this.props.siteName)
                // this.otherBookInfo = getSearchBookInfoByParseHtml(this.props.otherSearchResult);
                for (let i = 0; i < result.length; i++) {
                    if (result[i].title === this.searchBookName) {
                        this.otherBookInfos.push(result[i]);
                        if(!this.otherBookInfo){
                            this.otherBookInfo = result[i]
                            this.props.setOtherBookInfo(result[i])
                        }
                    }
                }
            console.warn(this.otherBookInfos)
            }

            return (
                <View/>
            )
        } catch (e) {
            console.warn('Search render', e.message)
        }
    }


}

function mapStateToProps(state) {
    const {otherSearchResult, baseOtherSearchUrl, siteName} = state.otherSearch;
    return {otherSearchResult, baseOtherSearchUrl, siteName}
}

export default connect(mapStateToProps, null, null, {withRef: true})(BookSources1)
