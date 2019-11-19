import React from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BOOK_DETAIL_BASE, BOOKMARKS_URL, ZSSQ_IMG_URL, ZSSQ_NAME} from "../../constants/api";
import I18n from "../../i18n/i18n";
import {WIDTH} from "../../utils/DimensionsUtil";
import {connect} from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {clearDetail, requestDetail} from "../../actions/detail";
import {requestBookmarks} from "../../actions/bookmarks";
import {saveBookmark} from "../../utils/BookmarkUtil";
import {getChineseText} from "../../utils/LanguageUtil";
import BookSources1 from "../../components/novel/BookSources1";
import type {Bookmarks} from "../../model/Bookmark";
import ToastUtil from "../../utils/ToastUtil";
import FastImage from "react-native-fast-image/src/index";

class MainDetail extends React.PureComponent {

    componentDidMount() {
        if (this.props.params) {
            let bookId = this.props.params.bookId;
            this.bookDetailUrl = BOOK_DETAIL_BASE + bookId;
            this.props.dispatch(requestDetail(this.bookDetailUrl))
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearDetail())
    }

    /**
     *保存并重新读取书签
     */
    saveAndRereadBookmarks = async () => {
        if(this.otherBookInfo){
            //TODO saving
            await this.saveBookmark();
            //TODO saved
            await this._reReadBookmark();
        }else {
            ToastUtil.showShort("未找到该书源")
        }

    };

    /**
     *重新读取书签
     */
    _reReadBookmark = () => {
        this.props.dispatch(requestBookmarks())
    };

    saveBookmark = () => {
        if(this.otherBookInfo){
            let bookmark: Bookmarks = {
                tag: this.otherBookInfo.articleUrlTag,
                bookName: this.otherBookInfo.title,
                bookUrl: null,
                chapterName: null,
                currentChapterNum: 1,
                pageNum: 1,
                totalPage: 0,
                image: this.otherBookInfo.img,
                siteName: this.otherBookInfo.siteName,
                id: null,
                lastReadTime: new Date().getTime(),
                author: this.otherBookInfo.author,
                chaptersTotalCount: 0,
                isUpdated: false
            };
            saveBookmark(bookmark);
        }
    };

    navToReader = () => {
        if(this.otherBookInfo){
            this.props.navigation.navigate('Read', {
                articleUrlTag: this.otherBookInfo.articleUrlTag,
                bookName: this.otherBookInfo.title,
                image: this.otherBookInfo.img,
                siteName: this.otherBookInfo.siteName,
                bookId: null,
                author:this.otherBookInfo.author
            })
        }
    };

    clearOtherBookInfo = () => {
        this.otherBookInfo = null
    }

    setOtherBookInfo = (otherBookInfo) => {
        // this.props.setOtherBookInfo(otherBookInfo)
        this.otherBookInfo = otherBookInfo
    }

    searchBook = (bookName) => {
        this.bookSourceRef.getWrappedInstance().searchBook(bookName)
    }

    getOtherBookInfo = () => {
        return this.otherBookInfo
    }

    render() {
        const appTheme = this.props.appTheme;
        if (this.props.bookDetail) {
            try {
                this._id = this.props.bookDetail._id;
                this.tags = this.props.bookDetail.tags;
                this.score = this.props.bookDetail.rating.score;
            } catch (e) {
                console.warn('BookDetailPage render', e.message)
            }
            if (this.props.bookmarks) {
                const _findIndex = require('lodash/findIndex');
                let index = _findIndex(this.props.bookmarks, (item) => {
                    return item.bookName === this.props.bookDetail.title&&item.author === this.props.bookDetail.author;
                });
                this.bookmark = this.props.bookmarks[index];
                // console.log('this.bookmark',this.bookmark)
                this.props.setBookmark(this.bookmark,this.props.bookDetail);
                if(this.bookmark){
                    this.props.setIsJoinBookshelf(true)
                }else {
                    this.props.setIsJoinBookshelf(false)
                }
            }
        }
        return (
            <View style={{}}>
                {this.props.bookDetail && this._id
                    ?
                    <View>
                        {this.props.isFetchingDetail
                            ?
                            <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}
                            >
                                <ActivityIndicator
                                    animating={true}
                                    color={appTheme.primaryColor}
                                    size="small"
                                />
                                <Text style={{color: appTheme.primaryColor}}>加载中，请稍等</Text>
                            </View>

                            : null
                        }

                        {this._renderInfo(appTheme.primaryColor)}
                        {this._renderReadButton(appTheme.primaryColor)}
                        {this._renderLastChapter()}
                        {this._renderChapterCatalog()}
                        {/*{this._serializeWordCount()}*/}
                        <BookSources1
                            ref={(ref)=>{this.bookSourceRef = ref}}
                            searchBookName={this.props.bookDetail.title}
                            setOtherBookInfo={this.setOtherBookInfo}/>
                    </View>
                    :
                    null
                }


            </View>
        )
    }

    _renderInfo = (color) => {
        return (
            <View style={styles.bookInfo}>
                <FastImage source={{uri: ZSSQ_IMG_URL + this.props.bookDetail.cover}}
                       style={styles.bookImage}/>
                <View style={{justifyContent: 'space-around', marginLeft: 12}}>
                    <Text style={styles.bookTitle}>{getChineseText(this.props.bookDetail.title)}</Text>
                    <View style={styles.bookAuthor}>
                        <Text style={{color:color}}>{getChineseText(this.props.bookDetail.majorCate)}</Text>

                        <Text> | {getChineseText(this.props.bookDetail.author)}</Text>
                    </View>
                    <Text style={{color:'#292929'}}>{getChineseText(this.props.bookDetail.latelyFollower)}人在追</Text>
                    <Text style={{color:'#292929'}}>字数：{getChineseText(this.props.bookDetail.wordCount)}</Text>

                    <Text style={{color: '#292929'}}>状态：{this.props.bookDetail.isSerial ? I18n.t('serial') : I18n.t('over')}</Text>
                </View>
            </View>
        )
    };

    _renderReadButton = (color) => {
        return (
            <View style={styles.margin}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{height: 18, width: 4, backgroundColor: this.props.appTheme.primaryColor, marginRight: 4}}/>
                    <Text style={{marginVertical:15,fontSize:18,fontWeight: 'bold'}}>详情</Text>
                </View>

                <Text style={{ marginBottom: 0}}>
                    {getChineseText(this.props.bookDetail.longIntro)}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 10
                }}>
                    {this.tags ? this.tags.map((tag, index) => {
                        return (
                            <Text style={[styles.tag, {color: color, borderColor: color}]}
                                  key={index}>{getChineseText(tag)}</Text>)
                    }) : null}
                </View>

            </View>
        )
    };

    _renderLastChapter = () => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.props.navToReader(this.bookmark,this.props.bookDetail,true)
                }}
                style={[styles.margin, styles.chapterCatalog,{marginTop:0}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={styles.catalog}>
                        <MaterialIcons name="access-time" size={18}/>
                        <Text style={{marginLeft: 5}}>最新 | </Text>
                    </View>
                    <Text numberOfLines={1}> {getChineseText(this.props.bookDetail.lastChapter)}</Text>
                </View>

                <MaterialIcons name="keyboard-arrow-right" size={24}/>

            </TouchableOpacity>
        )
    }

    _renderChapterCatalog = () => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    // this.props.navToCatalog2(this.props.bookDetail._id)
                }}
                style={[styles.margin, styles.chapterCatalog,{marginTop:0}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={styles.catalog}>
                        <MaterialIcons name="format-list-bulleted" size={18}/>
                        <Text style={{marginLeft: 5}}>{I18n.t('catalog')} | </Text>
                    </View>
                    <Text numberOfLines={1}>共{this.props.bookDetail.chaptersCount}章</Text>
                </View>

                <MaterialIcons name="keyboard-arrow-right" size={24}/>

            </TouchableOpacity>
        )
    }
}

export const IMG_WIDTH = WIDTH / 9 * 2.5;
export const IMG_HEIGHT = IMG_WIDTH / 3 * 4;
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    readButton: {
        borderRadius: 2,
        borderWidth: StyleSheet.hairlineWidth,
    },
    margin: {
        marginTop: 15,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20
    },
    bookImage: {
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        backgroundColor:"#eee"
    },
    bookInfo: {
        flexDirection: 'row',
        padding:20,
        backgroundColor:'#fff'
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#292929'
    },
    bookAuthor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bookStar: {
        color: '#f0ad4e',
        marginRight: 5
    },
    chapterCatalog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        paddingTop: 16,
        paddingBottom: 16
    },
    catalog: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    tag: {
        marginTop: 10,
        // marginBottom: 10,
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 1,
        paddingBottom: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgreen',
        borderRadius: 1,
        color: 'lightgreen',
        fontSize: 12,
        marginRight: 5
    },
    serializeWordCount: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    }
});

function mapStateToProps(state) {
    const {bookDetail, isFetchingDetail} = state.detail;
    const {items: bookmarks} = state.bookmarks;
    return {bookDetail, bookmarks, isFetchingDetail}
}

export default connect(mapStateToProps, null, null, {withRef: true})(MainDetail)
