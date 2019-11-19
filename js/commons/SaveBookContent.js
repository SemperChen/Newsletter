/**
 * @author Semper
 */
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
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
  ZSSQ_CHARTER_BASE,
  ZSSQ_NAME,
} from '../constants/api';
import {
  CACHE_DIR_PATH,
  RECEIVE_TYPE,
  REQUEST_CACHE_FAILED,
} from '../constants/constants';
import {requestBookCache} from '../actions/bookCache';
import {WIDTH} from '../utils/DimensionsUtil';
import {getChineseText} from '../utils/LanguageUtil';
import RNFS from 'react-native-fs';
import {saveCatalog} from '../utils/BookmarkUtil';

class SaveBookContent extends React.Component {
  /**
   * 缓存书籍内容
   * @param content
   */
  cacheArticle = content => {
    try {
      let isCacheSuccess = false;
      if (content && content !== '' && content !== REQUEST_CACHE_FAILED) {
        isCacheSuccess = true;
      }
      let fileName =
        this.props.siteName.replace('_', '') +
        'pageNum' +
        this.startNum +
        '.txt';

      let relativeFilePath = this.relativeDirPath + '/' + fileName;
      let filePath = CACHE_DIR_PATH + relativeFilePath;
      // console.log('content', content, 'path', filePath, 'relativeFilePath', relativeFilePath);
      if (globalData.cacheChapterCount < this.props.catalogLength) {
        globalData.cacheChapterCount++;
      }
      //每缓存到50整倍数章节自动保存书签
      if (globalData.cacheChapterCount % 50 === 0) {
        saveCatalog(
          globalData.catalog,
          this.props.articleTag,
          globalData.cacheChapterCount,
        );
      }
      //写入缓存
      RNFS.writeFile(filePath, content, 'utf8')
        .then(success => {
          console.log('FILE WRITTEN!', success);
        })
        .catch(err => {
          isCacheSuccess = false;
          console.log('SaveBookContent cacheArticle error', err.message);
        });
      let data = globalData.catalog[this.startNum];
      data.isCacheSuccess = true;
      data.filePath = filePath;
      globalData.catalog[this.startNum] = data;
    } catch (e) {
      console.log('SaveBookContent cacheArticle func err', e.message);
    }
  };

  fetchArticlesCache = () => {
    let url = '';
    switch (this.siteName) {
      case ZSSQ_NAME:
        try {
          url =
            ZSSQ_CHARTER_BASE +
            globalData.catalog[this.startNum].link
              .replace('/', '%2F')
              .replace('?', '%3F');
        } catch (e) {
          // this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
          console.warn('ReadPage fetchArticlesCache ZSSQ_NAME', e.message);
        }
        this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.JSON));
        break;
      case EXIAOSHUO1_NAME:
        try {
          url = EXIAOSHUO1_BASE_URL + globalData.catalog[this.startNum].link;
          this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.GBKTEXT));
        } catch (e) {
          // this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
          console.warn('ReadPage fetchArticles EXIAOSHUO1_NAME', e.message);
        }
        break;
      case EXIAOSHUO2_NAME:
        try {
          url = EXIAOSHUO2_BASE_URL + globalData.catalog[this.startNum].link;
          this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.GBKTEXT));
        } catch (e) {
          // this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
          console.warn('ReadPage fetchArticles EXIAOSHUO2_NAME', e.message);
        }
        break;
      case EXIAOSHUO3_NAME:
        try {
          url = EXIAOSHUO3_BASE_URL + globalData.catalog[this.startNum].link;
          this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.GBKTEXT));
        } catch (e) {
          // this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
          console.warn('ReadPage fetchArticles EXIAOSHUO3_NAME', e.message);
        }
        break;
      case EXIAOSHUO4_NAME:
        try {
          url = EXIAOSHUO4_BASE_URL + globalData.catalog[this.startNum].link;
          this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.GBKTEXT));
        } catch (e) {
          // this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
          console.warn('ReadPage fetchArticles EXIAOSHUO4_NAME', e.message);
        }
        break;
      case EXIAOSHUO5_NAME:
        try {
          url = EXIAOSHUO5_BASE_URL + globalData.catalog[this.startNum].link;
          this.props.dispatch(requestBookCache(url, RECEIVE_TYPE.TEXT));
        } catch (e) {
          // this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
          console.warn('ReadPage fetchArticles EXIAOSHUO5_NAME', e.message);
        }
        break;
    }
    // console.log('fetchArticlesCache url', this.lastRequestUrl);
  };

  toggleShowCacheBook = () => {
    this.setState(preState => ({
      isShowCacheBook: !preState.isShowCacheBook,
    }));
  };

  constructor() {
    super();
    this.startNum = 0;
    this.state = {
      isShowCacheBook: false,
      isFastest: NovelAppConfig.isFastest,
    };
  }

  componentDidMount() {}

  setLastChapterNum = num => {
    this.lastChapterNum = num;
  };

  setCacheBookRange = () => {
    this.startNum = this.lastChapterNum;
    this.endNum = this.startNum + this.getCacheArticleCount();
  };

  getCacheArticleCount = () => {
    let chaptersLength = this.props.catalogLength;
    this.cacheCount = 150;
    if (this.startNum + this.cacheCount < chaptersLength) {
      return this.cacheCount;
    } else {
      let count = chaptersLength - this.startNum;
      if (count > 0) {
        return count;
      } else {
        return 0;
      }
    }
  };

  /* hint = () => {
        Alert.alert(
            I18n.t('reminder'),
            getChineseText('已打开极速缓存模式，极速缓存模式支持后台缓存，缓存速度能达到最大化，但不够稳定，导致有少部分手机会因缓存章节太多而闪退。'),
            [
                {
                    text: I18n.t('confirm'), onPress: () => {
                    }
                },
            ],
            {cancelable: false}
        )
    };*/

  async shouldComponentUpdate(nextProps, nextState) {
    try {
      if (
        (nextProps.article &&
          this.props.article !== nextProps.article &&
          this.startNum < this.endNum) ||
        (nextProps.article &&
          nextProps.article === REQUEST_CACHE_FAILED &&
          this.startNum < this.endNum)
      ) {
        let content = '';
        try {
          if (this.siteName === ZSSQ_NAME) {
            content = JSON.stringify(nextProps.article);
          } else {
            content = nextProps.article;
          }
        } catch (e) {
          content = '';
          console.warn(
            'SaveBookContent shouldComponentUpdate func err',
            e.message,
          );
        }
        if (nextProps.article !== REQUEST_CACHE_FAILED) {
          await this.cacheArticle(content, nextProps.articleUrl);
        }
        for (; this.startNum < this.endNum; ) {
          this.startNum++;

          if (
            globalData.catalog &&
            !globalData.catalog[this.startNum].isCacheSuccess
          )
            break;
        }

        if (this.startNum < this.endNum) {
          this.fetchArticlesCache();
        }
      }
      return (
        this.state.isShowCacheBook !== nextState.isShowCacheBook ||
        this.state.isFastest !== nextState.isFastest ||
        this.props.articleTag !== nextProps.articleTag
      );
    } catch (e) {
      console.warn('SaveBookContent shouldComponentUpdate func', e.message);
    }
  }

  _onResponderRelease = () => {
    this.toggleShowCacheBook();
  };

  render() {
    this.siteName = this.props.siteName;
    this.relativeDirPath = this.siteName + '/' + this.props.bookName;
    let dirPath = CACHE_DIR_PATH + this.relativeDirPath;
    if (RNFS.exists(dirPath)) {
      RNFS.mkdir(dirPath);
    }
    try {
      return (
        <View>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.isShowCacheBook}
            onRequestClose={() => {}}>
            <View
              style={styles.container}
              onStartShouldSetResponder={() => {
                return true;
              }}
              onResponderRelease={this._onResponderRelease}>
              <View
                style={[
                  styles.content,
                  {backgroundColor: NovelAppConfig.readerColor.contentBgColor},
                ]}>
                <View style={styles.modalHeader}>
                  <Text
                    style={[
                      styles.btnText,
                      {
                        color: NovelAppConfig.readerColor.sliderColor,
                        fontWeight: 'bold',
                      },
                    ]}>
                    共{this.props.catalogLength}章， 已
                    {getChineseText('缓存') + globalData.cacheChapterCount}章
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.setCacheBookRange();
                    this.cacheCount = 150;
                    this.fetchArticlesCache();
                    this.toggleShowCacheBook();
                  }}>
                  <Text
                    style={[
                      styles.btnText,
                      {color: NovelAppConfig.readerColor.sliderColor},
                    ]}>
                    {getChineseText('缓存后面一百五十章')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.setCacheBookRange();
                    this.endNum = this.props.catalogLength;
                    this.fetchArticlesCache();
                    this.toggleShowCacheBook();
                  }}>
                  <Text
                    style={[
                      styles.btnText,
                      {color: NovelAppConfig.readerColor.sliderColor},
                    ]}>
                    {getChineseText('缓存后面全部')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.startNum = 0;
                    this.endNum = this.props.catalogLength;
                    this.fetchArticlesCache();
                    this.toggleShowCacheBook();
                  }}>
                  <Text
                    style={[
                      styles.btnText,
                      {color: NovelAppConfig.readerColor.sliderColor},
                    ]}>
                    {getChineseText('缓存全部')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.toggleShowCacheBook();
                  }}>
                  <Text
                    style={[
                      styles.btnText,
                      {color: NovelAppConfig.readerColor.sliderColor},
                    ]}>
                    取消
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    } catch (e) {
      console.warn('ReadPage render', e.message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  content: {
    width: WIDTH - 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btn: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EEE',
  },
  btnText: {
    fontSize: 18,
    margin: 16,
  },
  modalHeader: {
    justifyContent: 'space-between',
  },
  switch: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

function mapStateToProps(state) {
  const {article, articleUrl, isFetching} = state.bookCache;
  // console.log('mapStateToProps');
  return {article, articleUrl, isFetching};
}

export default connect(
  mapStateToProps,
  null,
  null,
  {withRef: true},
)(SaveBookContent);
