/**
 * @author Semper
 */
import React from "react";
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    Button,
    InteractionManager,
    PanResponder,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import {connect} from "react-redux";
import {clearArticle, receiveArticle, requestArticle} from "../actions/read";
import {getBookContentEXIAOSHUO1, getCatalog1, getCatalogEXIAOSHUO1, getContent1,} from "../utils/ParseHtmlUtil";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import ToastUtil from "../utils/ToastUtil";
import {NavigationActions, StackActions} from "react-navigation";
import ReaderMenuHeader from "../commons/ReaderMenuHeader";
import ReaderMenuFooter from "../commons/ReaderMenuFooter";
import ReaderMenuProgress from "../commons/ReaderMenuProgress";
import CustomFlatList from "../commons/CustomFlatList";
import {Article} from "../model/Article";
import {
    EXIAOSHUO1_BASE_URL,
    EXIAOSHUO1_NAME,
    EXIAOSHUO2_BASE_URL,
    EXIAOSHUO2_NAME,
    EXIAOSHUO3_BASE_URL,
    EXIAOSHUO3_NAME,
    EXIAOSHUO4_BASE_URL,
    EXIAOSHUO4_NAME,
    EXIAOSHUO5_BASE_URL,
    EXIAOSHUO5_NAME,
    ZSSQ_CATALOG_BASE,
    ZSSQ_CHARTER_BASE,
    ZSSQ_NAME
} from "../constants/api";
import {Bookmark} from "../model/Bookmark";
import {requestBookmarks} from "../actions/bookmarks";
import {loadCatalog, removeCatalog, saveBookmark, saveCatalog} from "../utils/BookmarkUtil";
import {clearCatalog, requestCatalog} from "../actions/catalog";
import {CACHE_DIR_PATH, RECEIVE_TYPE, REQUEST_ARTICLE_FAILED, REQUEST_CATALOG_FAILED} from "../constants/constants";
import {saveAppConfig} from "../utils/ConfigUtil";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";
import Loading from "../commons/Loading";
import SaveBookContent from "../commons/SaveBookContent";
import RNFS from "react-native-fs";
// import VoicePlayback from "../commons/VoicePlayback";
import KeepAwake from "react-native-keep-awake";
import MenuSet, {menuBgClr} from "../commons/MenuSet";
import {MAXH, reservedH} from "../commons/MeasureText";

const _drop = require('lodash/drop');

class ReadPage extends React.Component {
    static navigationOptions = {
        header: null
    };
    currentArticle: Article;
    prevArticle: Article;
    bookmark: Bookmark;

    constructor(props) {
        super(props);
        this.isFetching = false;//是否正在网路请求数据
        this.lastChapterNum = 0;
        this.articles = [];//文章数据数组
        this.isOpenMenu = false;//是否已经打开阅读菜单
        this.isFirstOpenReader = true;
        this.isFirstGetCatalog = false;//是否第一次获取目录
        this.articleTag = '';//唯一tag
        this.bookName = '';
        this.articleData = [];
        this.currentIndex = 0;
        this.bookImageUrl = '';
        this.size = NovelAppConfig.readConfig.fontSize;//字体大小
        this.isNightMode = false;//是否是夜间模式
        this.isShowAd = false;//是否展示广告
        this.isOffline = false;//是否离线阅读
        this.isReadCahce = false;//是否读取缓存
        this.isTurn2NextPage = true;//是否跳转到下一页
        this.isChangeBookSource = false;
        globalData.cacheChapterCount = 0;
        globalData.catalog = [];
    }

    componentWillMount() {
        StatusBar.setHidden(true);
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('ReadBackPress', this.onBackAndroid);
        }
        this.setIsShowAd();
        //手势功能
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.dx===0&&gestureState.dy===0){
                    this._onResponderRelease(evt)
                }else {
                    if(gestureState.dx<0){
                        this.turnToNextPage(true)
                    }else {
                        this.turnToPrePage(true)
                    }
                }
            }

        })
    }

    //设置是否显示广告
    setIsShowAd = () => {
        let date = new Date().getTime();
        //一天86400000毫秒
        let showAdInterval = 6000;
        if (NovelAppConfig.showAdInterval > 0) {
            showAdInterval = NovelAppConfig.showAdInterval;
        }
        if (date - showAdInterval > NovelAppConfig.lastShowAdTime) {
            this.isShowAd = NovelAppConfig.isShowAd && NovelAppConfig.VIPExperienceDays < 1 && NovelAppConfig.isShowBannerAd;
            NovelAppConfig.lastShowAdTime = date;
            saveAppConfig(NovelAppConfig)
        } else {
            this.isShowAd = false
        }

    };

    /**
     * 设置当前章节currentArticle
     * @param article
     */
    setCurrentArticle = (article) => {
        try {
            this.currentArticle = article;
            this.readerProgress._setCurrentArticle(this.currentArticle);
            globalData.globalCurrentChapterNum = this.currentArticle.currentChapterNum;
            globalData.globalPageNum = this.currentArticle.pageNum;
            if(NovelAppConfig.isOpenVoice){
                this.player.setVoiceText(this.currentArticle.chapterContent,this.isTurn2NextPage);
            }
        } catch (e) {
            console.warn('ReadPage setCurrentArticle', e.message)
        }

    };


    /**
     * 安卓返回按钮
     * @returns {boolean}
     */
    onBackAndroid = () => {
        this._showIsSaveBookcase();
        return true
    };

    /**
     * 设置当前index位置，this.articles[this.currentIndex]为当前阅读内容
     * @param index
     */
    setCurrentIndex = (index) => {
        this.currentIndex = index
    };

    /**
     * 离线阅读
     */
    offlineReading = () => {
        this.isOffline = true;
        loadCatalog(this.articleTag).then((res) => {
            // console.warn('offlineReading catalogData',res);
            if (res) {
                globalData.catalog = res.catalog;
                globalData.cacheChapterCount = res.cacheChapterCount;
                this.fetchArticles()
            } else {
                ToastUtil.showShort(I18n.t('notOfflineData'))
            }

        });

    };

    /**
     * 保存书籍目录
     * @private
     */
    _saveCatalog = () => {
        if(globalData.cacheChapterCount!==0){
            saveCatalog(globalData.catalog, this.articleTag, globalData.cacheChapterCount)
        }
    };

    changeBookSource = (articleUrlTag, title, img, siteName,bookId,author) => {
        this.articleTag=articleUrlTag;
        this.bookId = bookId;
        this.bookName = title;
        this.bookImageUrl = img;
        this.author=author;
        this.siteName=siteName;

        this.isFirstGetCatalog = false;
        globalData.catalog = null;
        globalData.cacheChapterCount = 0;
        this.articles = [];
        this.currentIndex = 0;
        this.lastChapterNum=this.currentArticle?this.currentArticle.currentChapterNum-1:this.lastChapterNum-2;
        this.currentArticle = null;
        this.prevArticle = null;
        // this.isFirstOpenReader = true;
        this.articleData = [];
        this.isChangeBookSource = true;
        InteractionManager.runAfterInteractions(() => {
            this.fetchCatalogData()
        });


    }

    shouldComponentUpdate(nextProps) {
        //如果发起网络请求目录失败，弹出提示信息
        if (nextProps.catalogData === REQUEST_CATALOG_FAILED) {
            if (this.props.isCatalogFetching) {
                ToastUtil.showShort(I18n.t('netError'));
            }
            return true
        }

        //如果发起网络请求章节内容失败，弹出提示信息
        if (nextProps.article === REQUEST_ARTICLE_FAILED && this.props.isFetching) {
            ToastUtil.showShort(I18n.t('netError2'));
        }

        //首次获取目录返回false不渲染，并根据目录请求章节内容
        if (!this.isFirstGetCatalog && nextProps.catalogData && !this.isChangeBookSource) {
            this.isFirstGetCatalog = true;
            let catalogData = this.handleCatalog(nextProps.catalogData);
            if(globalData.catalog&&globalData.catalog.length>0){
                globalData.catalog = globalData.catalog.concat(_drop(catalogData,globalData.catalog.length));
            }else {
                globalData.catalog = catalogData
            }
            console.log('globalData.catalog',globalData.catalog)
            this._saveCatalog();
            if(this.openLastChapter){
                this.currentIndex = 0;
                this.lastChapterNum = globalData.catalog.length-1
            }
            this.fetchArticles();
            return false
        } else {
            return this.props.article !== nextProps.article || this.props.isFetching !== nextProps.isFetching ||
                this.props.isCatalogFetching !== nextProps.isCatalogFetching
        }
    }

    handleCatalog = (catalogData) => {
        getCatalog1(catalogData)
        switch (this.siteName) {
            default:
                return getCatalogEXIAOSHUO1(catalogData);
        }
    };

    /**
     * 请求目录数据
     */
    fetchCatalogData = () => {
        try {
            switch (this.siteName) {
                case ZSSQ_NAME:
                    this.props.dispatch(requestCatalog(ZSSQ_CATALOG_BASE + this.bookId, RECEIVE_TYPE.JSON));
                    break;
                case EXIAOSHUO5_NAME:
                    this.props.dispatch(requestCatalog(this.articleTag, RECEIVE_TYPE.TEXT));
                    break;
                default:
                    this.props.dispatch(requestCatalog(this.articleTag, RECEIVE_TYPE.GBKTEXT))
            }
        } catch (e) {
            console.warn('ReadPage fetchCatalogData error', e.message)
        }

    };

    /**
     * 通过点击目录请求章节
     * @param num
     */
    fetchArticleByCatalog = (num) => {
        this.articles = [];
        this.currentArticle = null;
        this.prevArticle = null;
        this.currentIndex = 0;
        this.lastChapterNum = num;
        this.fetchArticles();
        /*InteractionManager.runAfterInteractions(() => {
            this.fetchArticles();
        });*/
    };

    /**
     * 通过点击进度条请求章节
     * @param num
     */
    fetchArticleByProgress = (num) => {
        this.articles = [];
        this.currentArticle = null;
        this.prevArticle = null;
        this.currentIndex = 0;
        this.lastChapterNum = num;
        InteractionManager.runAfterInteractions(() => {
            this.fetchArticles();
        });
    };

    //拿到目录后请求文章内容
    fetchArticles = () => {
        //章节大于10，自动保存书签
        if (this.currentArticle !== null &&
            this.currentArticle !== undefined &&
            this.lastChapterNum > 10 &&
            this.lastChapterNum % 1 === 0) {
            this.saveAndRereadBookmarks().then();
        }

        //设置章节长度
        if (this.props.catalogData && this.props.catalogData !== REQUEST_CATALOG_FAILED) {
            let chapterCount = 0;
            switch (this.siteName) {
                case ZSSQ_NAME:
                    try {
                        chapterCount = this.props.catalogData.mixToc.chapters.length
                    } catch (e) {
                        chapterCount = 0;
                        console.warn('ReadPage fetchArticles func error:', e.message)
                    }
                    break;
                default:
                    if (globalData.catalog&&globalData.catalog.length > 0) {
                        chapterCount = globalData.catalog.length
                    } else {
                        chapterCount = 0
                    }
            }

            if (this.lastChapterNum === chapterCount) {
                return
            }
        }

        this.prevArticle = this.currentArticle;
        this.lastChapterNum++;
        if (this.lastChapterNum < 1) {
            this.lastChapterNum = 1
        }

        let url = '';
        switch (this.siteName) {
            case ZSSQ_NAME:

                try {
                    url = ZSSQ_CHARTER_BASE + globalData.catalog[this.lastChapterNum - 1].link
                        .replace('/', '%2F').replace('?', '%3F');
                    this.lastRequestUrl = url;
                    this.chapterName = globalData.catalog[this.lastChapterNum - 1].title;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles ZSSQ_NAME', e.message)
                }
                break;
            case EXIAOSHUO1_NAME:

                try {
                    url = (EXIAOSHUO1_BASE_URL + globalData.catalog[this.lastChapterNum - 1].link);
                    this.lastRequestUrl = url;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles EXIAOSHUO1_NAME', e.message)
                }
                break;
            case EXIAOSHUO2_NAME:

                try {
                    url = (EXIAOSHUO2_BASE_URL + globalData.catalog[this.lastChapterNum - 1].link);
                    this.lastRequestUrl = url;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles EXIAOSHUO2_NAME', e.message)
                }
                break;
            case EXIAOSHUO3_NAME:

                try {
                    url = (EXIAOSHUO3_BASE_URL + globalData.catalog[this.lastChapterNum - 1].link);
                    this.lastRequestUrl = url;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles EXIAOSHUO3_NAME', e.message)
                }
                break;
            case EXIAOSHUO4_NAME:
                try {
                    url = (EXIAOSHUO4_BASE_URL + globalData.catalog[this.lastChapterNum - 1].link);
                    this.lastRequestUrl = url;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles EXIAOSHUO3_NAME', e.message)
                }
                break;
            case EXIAOSHUO5_NAME:
                try {
                    url = (EXIAOSHUO5_BASE_URL + globalData.catalog[this.lastChapterNum - 1].link);
                    this.lastRequestUrl = url;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles EXIAOSHUO3_NAME', e.message)
                }
                break;
            default:
                try {
                    url = (this.articleTag + globalData.catalog[this.lastChapterNum - 1].link);
                    this.lastRequestUrl = url;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles default', e.message)
                }
                break;
        }

        if(!url) return;

        try {
            //从缓存中文章数组里查找对应章节
            if(globalData.catalog&&globalData.catalog.length>0){
                const articleCache = globalData.catalog[this.lastChapterNum - 1];
                //如果找到对应章节articleCache，读取对应章节内容缓存文件
                if (articleCache && articleCache.isCacheSuccess) {
                    this.isReadCahce = true;
                    RNFS.readFile(articleCache.filePath,'utf8').then((res)=>{
                        // console.log('res',res)
                        // if(this.siteName===BQG2_NAME){
                        //     this.fetchArticlesByCache(url, res)
                        // }else{
                        //     this.fetchArticlesByCache(url, JSON.parse())
                        // }
                        this.fetchArticlesByCache(url, res)
                    }).catch((err) => {
                        console.log(err.message);
                        //读取缓存失败发起网路请求章节内容
                        this.fetchArticlesByNet(url)
                    });
                    // this.props.dispatch(receiveArticle(JSON.parse(articleCache.content), articleCache.articleUrl))
                } else {
                    this.isReadCahce=false;
                    //读取缓存失败发起网路请求章节内容
                    this.fetchArticlesByNet(url)
                }
            }else {
                this.fetchArticlesByNet(url)
            }

            // console.log('articleCache----------,articleCache',articleCache)
        } catch (e) {
            this.fetchArticlesByNet(url);
            console.warn('ReadPage fetchArticles 2', e.message)
        }

    };

    /**
     * 通过网络请求章节
     * @param url
     */
    fetchArticlesByNet = (url) => {
        InteractionManager.runAfterInteractions(() => {
            try{
                switch (this.siteName) {
                    case ZSSQ_NAME:
                        this.props.dispatch(requestArticle(url, RECEIVE_TYPE.JSON));//utf-8 json
                        // this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.JSON));
                        break;
                    case EXIAOSHUO5_NAME:
                        this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                        break;
                    default:
                        this.props.dispatch(requestArticle(url, RECEIVE_TYPE.GBKTEXT));//gbk
                        break;
                }
            }catch(e){
                console.warn('ReadPage fetchArticlesByNet',e.message)
            }
        });

    };

    /**
     * 通过缓存请求章节
     * @param url
     * @param cacheArticle
     */
    fetchArticlesByCache = (url, cacheArticle) => {
        switch (this.siteName) {
            case ZSSQ_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.JSON, cacheArticle));
                // this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.JSON));
                break;
            case EXIAOSHUO5_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT, cacheArticle));
                break;
            default:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.GBKTEXT, cacheArticle));
                break;
        }
    };

    _reFetchArticle = (url = this.lastRequestUrl) => {
        if(!url) return;
        switch (this.siteName) {
            case ZSSQ_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.JSON));
                break;
            case EXIAOSHUO5_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                break;
            default:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.GBKTEXT));
                break;
        }
    };

    /**
     * 清除本书缓存
     */
    clearBookCache = () => {
        removeCatalog(this.articleTag);
        globalData.cacheChapterCount=0;
        globalData.catalog = this.handleCatalog(this.props.catalogData);
        this.relativeDirPath = this.siteName+ '/'+this.bookName;
        let dirPath = CACHE_DIR_PATH + this.relativeDirPath;
        RNFS.unlink(dirPath);
        ToastUtil.showShort(I18n.t('clearBookCacheSuccess'))
    };

    /**
     * 通过书签跳转到阅读位置
     * @private
     */
    _scrollIndexByBookmark = () => {
        this.isTurn2NextPage = false;
        if (this.isFirstOpenReader && this.articles.length > 0) {
            this.isFirstOpenReader = false;
            if (this.currentArticle.totalPage < this.currentIndex) {
                this.currentIndex = 0
            }
            this._scrollToIndex();
        }
    };

    /**
     * 跳转到对应章节内容位置
     * @param animated
     * @private
     */
    _scrollToIndex = (animated=false) => {
        try {
            this._flatRef.scrollToIndex({
                animated: animated,
                index: this.currentIndex
            });
        } catch (e) {
            console.warn('ReadPage scrollToIndex err:', e.message)
        }
    };

    /**
     * 跳转到下一页
     * @param animated
     */
    turnToNextPage = (animated) => {
        this.isTurn2NextPage = true;
        if (this.currentIndex < this.articles.length - 1) {
            this.currentIndex++;
            this._scrollToIndex(animated);
        } else {
            // ToastUtil.showShort('正在加载下一页数据')
        }
    };

    /**
     * 跳转到上一页
     * @param animated
     */
    turnToPrePage = (animated) => {
        this.isTurn2NextPage = false;
        if (this.currentIndex < this.articles.length && this.currentIndex > 0) {
            this.currentIndex--;
            this._scrollToIndex(animated);
        } else {
            ToastUtil.showShort(I18n.t('onTop'))
        }
    };

    /**
     * 手势成功后执行以下方法
     * @param e
     * @private
     */
    _onResponderRelease = (e) => {
        if (this.menuFooter.getIsOpenReaderSet()) {
            this.menuFooter.closeMenuSet();
            this.menuFooter.setIsOpenReaderSet(false);
            return
        } else if (this.menuFooter.getIsOpenMenuProgress()) {
            this.menuFooter.closeMenuProgress();
            this.menuFooter.setIsOpenMenuProgress(false);
            return
        } else if (this.isOpenMenu) {
            this.menuHeader.closeMenuHeader();
            this.menuFooter.closeMenuFooter();
            this.isOpenMenu = false;
            return
        }
        let pageY = e.nativeEvent.pageY;
        let pageX = e.nativeEvent.pageX;
        if (pageY < HEIGHT / 5 * 2) {
            this.turnToPrePage()
        } else if (pageY > HEIGHT / 5 * 3) {
            this.turnToNextPage()
        } else {
            if (pageX < WIDTH / 3) {
                this.turnToNextPage()
            } else if (pageX > WIDTH / 3 * 2) {
                this.turnToNextPage()
            } else if (!this.isOpenMenu) {
                this.menuHeader.openMenuHeader();
                this.menuFooter.openMenuFooter();
                this.isOpenMenu = true
            }
        }
    }

    /**
     * 打开阅读器菜单
     * @private
     */
    _openMenuSet = () => {
        this.readerSet.open()
    };
    /**
     * 关闭阅读器菜单
     * @private
     */
    _closeMenuSet = () => {
        this.readerSet.close()
    };
    /**
     * 打开阅读器进度条
     * @private
     */
    _openMenuProgress = () => {
        this.readerProgress.open()
    };
    /**
     * 关闭阅读器进度条
     * @private
     */
    _closeMenuProgress = () => {
        this.readerProgress.close()
    };
    /**
     * 打开书签
     * @private
     */
    _openBookCatalog = () => {
        try {
            this.props.navigation.navigate('Catalog', {
                siteName: this.siteName,
                currentChapterNum: this.currentArticle ? this.currentArticle.currentChapterNum + 1 : this.lastChapterNum + 1,
                fetchArticleByCatalog: this.fetchArticleByCatalog,
                bookName:this.bookName,
                catalogLength:this._getBookCatalogLength()
            })
        } catch (e) {
            console.warn('ReadPage _openBookCatalog', e.message)
        }
    };

    /**
     * 更换皮肤
     * @param skinColor
     * @private
     */
    _changeSkin = (skinColor = '#fff',fontColor) => {
        this.readerContainer.setNativeProps({
            style: {
                backgroundColor: skinColor
            }
        });
        this.savePrevFontColorAndBgColor(fontColor, skinColor);
        this._flatRef.setFontColor(fontColor)
    };

    /**
     * 白天夜间模式开关
     */
    toggleLightAndDark = () => {
        this._flatRef.setFontColor('#999999')
    };

    /**
     * 零时保存上一次皮肤和字体颜色
     * @param prevFontColor
     * @param prevBgColor
     */
    savePrevFontColorAndBgColor = (prevFontColor, prevBgColor) => {
        this.prevFontColor = prevFontColor;
        this.prevBgColor = prevBgColor
    };

    /**
     * 改变字体大小
     * @param fontSize
     * @private
     */
    changeFontSize = (fontSize = this.size) => {
        try {
            if (this.bookmark) {
                this.saveAndRereadBookmarks().then();
            }
            this.size = fontSize;
            this._flatRef.setFontSize(fontSize);
            this.articles = [];
            this.currentIndex = 0;
            this.lastChapterNum = this.currentArticle ?
                this.currentArticle.currentChapterNum - 1 : this.lastChapterNum - 1;
            this.currentArticle = null;
            this.prevArticle = null;
            InteractionManager.runAfterInteractions(() => {
                this.fetchArticles();
            });
            NovelAppConfig.readConfig.fontSize = fontSize;
            saveAppConfig(NovelAppConfig)
        } catch (e) {
            console.warn('ReadPage changeFontSize', e.message)
        }
    };

    /**
     * 导航返回
     * @private
     */
    _navBack = () => {
        this.saveAndRereadBookmarks().then();
        this.props.navigation.goBack(null)
    };

    _navToSearch = () => {
        globalData.globalBookNameParam = this.bookName;
        globalData.currentSiteName = this.siteName;
        this.props.navigation.navigate('BookSources',{changeBookSource:this.changeBookSource})

    };

    /**
     * 重制导航
     * @private
     */
    _resetNav = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'App'})
            ]
        }))
    };

    //导航到网页阅读
    _navToWebReadPage = () => {
        try {
            if (this.currentArticle) {
                if (this.siteName === ZSSQ_NAME) {
                    this.props.navigation.navigate('WebRead', {url: 'http://www.biqiuge.com/', siteName: '笔趣阁'})
                } else {
                    this.props.navigation.navigate('WebRead', {
                        url: this.currentArticle.bookUrl,
                        siteName: this.siteName
                    })
                }
            }
        } catch (e) {
            console.warn('ReadPage _navToWebReadPage', e.message)
        }

    };

    //保存并重新读取书签
    saveAndRereadBookmarks = async () => {
        //TODO saving
        await this._saveBookmark();
        //TODO saved
        await this._reReadBookmark();
    };

    _saveBookmark = () => {
        try {
            if (this.lastChapterNum < 1) {
                return
            }
            if (this.currentArticle !== null && this.currentArticle !== undefined) {
                let bookmark = {
                    tag:this.articleTag,
                    bookName:this.currentArticle.bookName,
                    bookUrl:null,
                    chapterName:this.currentArticle.chapterName,
                    currentChapterNum:this.currentArticle.currentChapterNum,
                    pageNum:this.currentArticle.pageNum,
                    totalPage:this.currentArticle.totalPage,
                    image:this.bookImageUrl,
                    siteName:this.siteName,
                    id:this.bookId,
                    lastReadTime:new Date().getTime(),
                    author:this.author
                };
                // console.log('saveBookmark', bookmark.tag);
                saveBookmark(bookmark);
            }
        } catch (e) {
            console.warn('ReadPage _saveBookmark', e.message)
        }
    };

    _reReadBookmark = () => {
        this.props.dispatch(requestBookmarks())
    };

    //请求目录错误时，渲染错误信息
    _renderError = () => {
        return (
            <View style={styles.getCatalogFailedContainer}>
                {
                    this.props.isCatalogFetching
                        ?
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.failedText}>{getChineseText('获取资源中')}</Text>
                            <ActivityIndicator
                                style={{marginTop: 3}}
                                animating={true}
                                color="#aa3300"
                                size="small"
                            />
                        </View>
                        :
                        <Text style={styles.failedText}>{getChineseText('请求资源失败')}</Text>
                }

                <View style={styles.failedView}>
                    <Button
                        title={I18n.t('reFetch')}
                        color='deeppink'
                        onPress={() => {
                            this.fetchCatalogData()
                        }}
                    />
                    <Button
                        title={I18n.t('changeBookOrigin')}
                        color='deeppink'
                        onPress={() => {
                            this._navToSearch()
                        }}
                    />
                    <Button
                        title={I18n.t('exit')}
                        color='deeppink'
                        onPress={() => {
                            this.props.navigation.goBack(null)
                        }}
                    />
                    <Button
                        title={getChineseText('离线阅读')}
                        color='deeppink'
                        onPress={() => {
                            this.tintReader();
                            this.offlineReading()
                        }}
                    />
                </View>
            </View>
        )
    };

    //请求章节错误时，渲染错误信息
    _renderArticleError = () => {
        return (
            <View style={styles.getCatalogFailedContainer}>
                {
                    this.props.isFetching
                        ?
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.failedText}>{getChineseText('获取资源中')}</Text>
                            <ActivityIndicator
                                style={{marginTop: 3}}
                                animating={true}
                                color="#aa3300"
                                size="small"
                            />
                        </View>
                        :
                        <Text style={styles.failedText}>{getChineseText('请求资源失败')}</Text>
                }

                <View style={styles.failedView}>
                    <Button
                        title={I18n.t('reFetch')}
                        color='deeppink'
                        onPress={() => {
                            this._reFetchArticle()
                        }}
                    />
                    <Button
                        title={I18n.t('changeBookOrigin')}
                        color='deeppink'
                        onPress={() => {
                            this._navToSearch()
                        }}
                    />
                    <Button
                        title={I18n.t('exit')}
                        color='deeppink'
                        onPress={() => {
                            this.props.navigation.goBack(null)
                        }}
                    />
                    <Button
                        title={getChineseText('离线阅读')}
                        color='deeppink'
                        onPress={() => {
                            this.tintReader();
                            this.offlineReading()
                        }}
                    />
                </View>
            </View>
        )
    };

    //初始化背景颜色
    initializeBg = () => {
        if (NovelAppConfig.readConfig.isNightMode) {
            return NovelAppConfig.readConfig.darkBgColor
        } else {
            return NovelAppConfig.readerColor.contentBgColor
        }
    };

    //设置夜间模式字体颜色
    setNightModeFontColor = () => {
        this._flatRef.setFontColor(NovelAppConfig.readConfig.darkFontColor)
    };

    //获取书籍目录长度
    _getBookCatalogLength = () => {
        if (globalData.catalog && globalData.catalog !== REQUEST_CATALOG_FAILED) {
            try {
                return globalData.catalog.length;
            } catch (e) {
                console.warn('ReadPage _getBookCatalogLength func error:', e.message);
                return 0
            }
        } else {
            return 0
        }
    };

    //提示是否保存到书架
    _showIsSaveBookcase = () => {
        if (!this.bookmark && this.currentArticle) {
            Alert.alert(
                I18n.t('reminder'),
                I18n.t('isSaveBook'),
                [
                    {
                        text: I18n.t('cancel'), style: 'cancel', onPress: () => {
                            this.props.navigation.goBack(null)
                        }
                    },
                    {
                        text: I18n.t('saveBookmark'), onPress: () => {
                            this._navBack()
                        }
                    },
                ],
            )
        } else {
            this._navBack()
        }
    };

    componentDidMount() {
        StatusBar.setHidden(true);
        try {
            let params = this.props.navigation.state.params;
            const {bookId,articleUrlTag,bookName,image,index,author} = params;
            this.siteName = params.siteName;
            switch (this.siteName) {
                case ZSSQ_NAME:
                    this.bookId = bookId;
                    this.articleTag = this.bookId;
                    this.bookName = bookName;
                    this.bookImageUrl = image;
                    if(index){
                        this.lastChapterNum = index
                    }
                    break;
                default:
                    this.articleTag = articleUrlTag;
                    this.bookName = bookName;
                    this.bookImageUrl = image;
                    break;
            }
            this.author=author;

            this.bookmark = params.bookmark;
            this.openLastChapter = params.openLastChapter;
            if (this.bookmark) {
                this.siteName = this.bookmark.siteName;
                this.bookName = this.bookmark.bookName;
                this.bookImageUrl = this.bookmark.image;
                this.lastChapterNum = this.bookmark.currentChapterNum - 1;
                this.currentIndex = this.bookmark.pageNum - 1;
                this.author = this.bookmark.author;
                if (globalData.globalCurrentChapterNum) {
                    this.lastChapterNum = globalData.globalCurrentChapterNum - 1;
                }
                if (globalData.globalPageNum) {
                    this.currentIndex = globalData.globalPageNum - 1;
                }
                switch (this.siteName) {
                    case ZSSQ_NAME:
                        this.bookId = this.bookmark.id;
                        this.articleTag = this.bookId;
                        break;
                    default:
                        this.articleTag = this.bookmark.tag;
                        break;
                }

            }
        } catch (e) {
            console.warn('ReadPage componentDidMount', e.message)
        }

        if(this.siteName===ZSSQ_NAME){
            this._navToSearch();
        }

       /* findCacheBook(this.articleTag.replace('_','')).then((res) => {
            this.articlesCache = res;
            this.fetchCatalogData();
        })*/

        loadCatalog(this.articleTag).then((res)=>{
            if(res){
                globalData.catalog = res.catalog;
                globalData.cacheChapterCount = res.cacheChapterCount;
            }

            this.fetchCatalogData();
        })
    }

    /**
     * 展示缓存功能开关
     * @private
     */
    _toggleShowCacheBook = () => {
        try {
            if (this.currentArticle) {
                this.saveBookContent.getWrappedInstance().setLastChapterNum(this.currentArticle.currentChapterNum);
            }
            this.saveBookContent.getWrappedInstance().toggleShowCacheBook()
        } catch (e) {
            console.warn('ReadPage _toggleShowCacheBook', e.message)
        }
    };

    componentWillUnmount() {

        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('ReadBackPress', this.onBackAndroid);
        }
        StatusBar.setHidden(false);
        this.props.dispatch(clearCatalog());
        this.props.dispatch(clearArticle());
        this._saveCatalog();
        globalData.globalCurrentChapterNum = null;
        globalData.globalPageNum = null;
    }

    tintReader = () => {
        Alert.alert(
            I18n.t('reminder'),
            I18n.t('offlineTint'),
            [
                {
                    text: I18n.t('confirm'), onPress: () => {
                    }
                },
            ],
        )
    };

    render() {
        //请求目录失败，渲染以下UI
        if (this.props.catalogData === REQUEST_CATALOG_FAILED && !this.isOffline) {
            return this._renderError()
        }

        //请求章节内容失败，渲染以下UI
        if (this.props.article === REQUEST_ARTICLE_FAILED && this.articles.length === 0 && !this.isOffline) {
            return this._renderArticleError()
        }

        // console.log('render',this.props.article);
        this.isFetching = this.props.isFetching;
        if (this.props.article && !this.isFetching && this.props.article !== REQUEST_ARTICLE_FAILED&&!this.isChangeBookSource) {

            let articles = [];
            switch (this.siteName) {
                default:
                    getContent1(this.props.article)
                    articles = getBookContentEXIAOSHUO1(this.props.article, this.props.articleUrl,
                        this.bookName, this.lastChapterNum, this.size);
                    this.articles = this.articles.concat(articles);
                    break;
            }

            if (this.articleData.length < 2) {
                this.articleData.shift()
            }
            this.articleData.push({url: this.props.articleUrl, data: this.props.article})
        }else {
            this.isChangeBookSource = false;
        }

        return (

            <View
                style={[styles.container, {backgroundColor: this.initializeBg()}]}
                ref={(ref) => {
                    this.readerContainer = ref
                }}
            >
                <View
                    style={{height: MAXH, width: WIDTH, flex: 1,marginVertical: reservedH/2}}
                    {...this._panResponder.panHandlers}>
                    {
                        this.articles.length > 0 ?
                            <CustomFlatList
                                ref={(ref) => {
                                    this._flatRef = ref
                                }}
                                articles={this.articles}
                                isFetching={this.isFetching}
                                setCurrentArticle={this.setCurrentArticle}
                                prevArticle={this.prevArticle}
                                scrollIndexByBookmark={this._scrollIndexByBookmark}
                                fetchArticles={this.fetchArticles}
                                reFetchArticle={this._reFetchArticle}
                                catalogDataLength={this._getBookCatalogLength()}
                                setCurrentIndex={this.setCurrentIndex}
                                isFirstOpenReader={this.isFirstOpenReader}
                            />
                            :
                            <View style={styles.loading}>
                                <Loading animating={true}/>
                            </View>
                    }


                </View>
                <ReaderMenuHeader
                    ref={(ref) => {
                        this.menuHeader = ref
                    }}
                    style={[styles.menu]}
                    showIsSaveBookcase={this._showIsSaveBookcase}
                    navToSearch={this._navToSearch}
                />
                {/*<ReaderMenuSet
                    ref={(ref) => {
                        this.readerSet = ref
                    }}
                    styles={styles}
                    changeSkin={this._changeSkin}
                    changeFontSize={this.changeFontSize}
                    navToWebReadPage={this._navToWebReadPage}
                    reFetchArticle={this._reFetchArticle}
                    clearBookCache={this.clearBookCache}
                />*/}
                <ReaderMenuProgress
                    ref={(ref) => {
                        this.readerProgress = ref
                    }}
                    styles={styles}
                    catalogDataLength={this._getBookCatalogLength()}
                    fetchArticleByProgress={this.fetchArticleByProgress}
                />
                <ReaderMenuFooter
                    changeSkin={this._changeSkin}
                    ref={(ref) => {
                        this.menuFooter = ref
                    }} styles={styles}
                    openMenuSet={this._openMenuSet}
                    closeMenuSet={this._closeMenuSet}
                    openMenuProgress={this._openMenuProgress}
                    closeMenuProgress={this._closeMenuProgress}
                    toggleShowCacheBook={this._toggleShowCacheBook}
                    openBookCatalog={this._openBookCatalog}
                    toggleLightAndDark={this.toggleLightAndDark}
                    setNightModeFontColor={this.setNightModeFontColor}
                />
                <SaveBookContent
                    ref={(ref) => {
                        this.saveBookContent = ref
                    }}
                    articleTag={this.articleTag}
                    catalog={globalData.catalog}
                    siteName={this.siteName}
                    lastChapterNum={this.lastChapterNum}
                    catalogLength={this._getBookCatalogLength()}
                    bookName = {this.bookName}
                    cacheChapterCount={globalData.cacheChapterCount}
                />
                {/*{NovelAppConfig.isOpenVoice?
                    <VoicePlayback
                        turnToNextPage={this.turnToNextPage}
                        ref={(ref) => {
                            this.player = ref
                        }}/>:
                    null
                }*/}
                {NovelAppConfig.isKeepAwake? <KeepAwake />:null}
                <MenuSet
                    ref={(ref) => {
                        this.readerSet = ref
                    }}
                    changeFontSize={this.changeFontSize}
                    changeSkin={this._changeSkin}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        width: WIDTH,
        height: 55,
        backgroundColor: menuBgClr,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    menuItem: {
        height: 55,
        width: WIDTH / 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    readerSet: {
        width: WIDTH,
        backgroundColor: menuBgClr,
        alignItems: 'center',
        paddingVertical: 25
    },
    readerSetItem: {
        width: WIDTH/1.5,
        // height: 55,
        borderBottomColor: 'rgba(255,255,255,.1)',
        // borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    readerModeButton: {
        width: WIDTH / 10 * 4,
        height: WIDTH / 12,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    readerSkinButton: {
        width: WIDTH / 6,
        height: WIDTH / 12,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    menuIcon: {
        color: '#fff',
    },
    slider: {
        flex: 1,
    },
    catalogContainer: {
        position: 'absolute',
        height: HEIGHT,
        width: WIDTH,
        left: this.animatedValue,
        zIndex: 1000,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    getCatalogFailedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    },
    failedText: {
        fontSize: 20,
        marginRight: 5
    },
    failedView: {
        flexDirection: 'row',
        marginTop: 20,
        width: WIDTH / 3 * 2,
        justifyContent: 'space-around'
    },
    loading: {
        alignSelf: 'center',
        height: HEIGHT,
        width: WIDTH,
        zIndex: -100
    }
});

function mapStateToProps(state) {
    const {article, articleUrl, isFetching} = state.read;
    const {catalogData, isCatalogFetching} = state.catalog;
    // console.log('mapStateToProps');
    return {article, articleUrl, isFetching, catalogData, isCatalogFetching}
}

export default connect(mapStateToProps)(ReadPage)
