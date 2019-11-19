import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WIDTH} from '../utils/DimensionsUtil';
import {Article} from '../model/Article';
import I18n from '../i18n/i18n';
import {getChineseText, Traditionalized} from '../utils/LanguageUtil';

const VIEWABILITY_CONFIG = {
  viewAreaCoveragePercentThreshold: 80, //item80%部分可见才视为可见
};

class CustomFlatList extends React.Component {
  currentArticle: Article;

  constructor() {
    super();
    this.fontColor = '#000';
    this.prevFontColor = '#000';
    this.prevBgColor = '#fff';
    this.state = this.initializeData();
    this._getTime();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.fontSize !== nextState.fontSize ||
      this.state.color !== nextState.color ||
      this.props.articles !== nextProps.articles ||
      this.props.isFetching !== nextProps.isFetching ||
      this.props.prevArticle !== nextProps.prevArticle ||
      this.props.catalogDataLength !== nextProps.catalogDataLength
    );
  }

  /**
   * 初始化数据
   *
   * @returns {{fontSize: number, color: string}}
   */
  initializeData = () => {
    let state = {
      fontSize: NovelAppConfig.readConfig.fontSize,
      color: NovelAppConfig.readerColor.sliderColor,
    };
    if (NovelAppConfig.readConfig.isNightMode) {
      state.color = NovelAppConfig.readConfig.darkFontColor;
    }
    return state;
  };

  /**
   * 设置阅读字体大小
   * @param fontSize
   */
  setFontSize = fontSize => {
    this.setState({
      fontSize: fontSize,
    });
  };

  /**
   * 设置阅读字体颜色
   * @param color
   */
  setFontColor = color => {
    this.setState({
      color: color,
    });
  };

  scrollToIndex(params: {
    animated?: ?boolean,
    index: number,
    viewOffset?: number,
    viewPosition?: number,
  }) {
    this._flatRef.scrollToIndex(params);
  }

  /**
   * 简繁体转换
   *
   * @param text
   * @returns {*}
   */
  toggleChineseText = text => {
    if (NovelAppConfig.isTraditional) {
      return Traditionalized(text);
    } else {
      return text;
    }
  };

  /**
   * 可见项目发生改变事件
   * @param info
   * info: {viewableItems: Array<ViewToken>,changed: Array<ViewToken>}
   *
   * ViewToken: {item: any,key: string,index: ?number,isViewable: boolean,section?: any}
   *
   * @private
   */
  _onViewableItemsChanged = info => {
    let itemsLength = info.viewableItems.length;
    if (itemsLength === 1) {
      this.currentArticle = info.viewableItems[itemsLength - 1].item;
      this.props.setCurrentArticle(this.currentArticle);
      if (!this.props.isFirstOpenReader) {
        this.props.setCurrentIndex(info.viewableItems[0].index);
      }
      if (!this.props.prevArticle) {
        this.props.fetchArticles();
      }
      try {
        if (
          this.props.prevArticle &&
          this.currentArticle &&
          this.currentArticle.currentChapterNum !==
            this.props.prevArticle.currentChapterNum &&
          this.currentArticle.currentChapterNum >
            this.props.prevArticle.currentChapterNum &&
          !this.props.isFetching
        ) {
          this.props.fetchArticles();
        }
      } catch (e) {
        console.warn('CustomFlatList _onViewableItemsChanged', e.message);
      }

      this.props.scrollIndexByBookmark();
    }
  };
  _getItemLayout = (data, index) => ({
    length: WIDTH,
    offset: WIDTH * index,
    index,
  });

  getLineHeight = () => {
    return this.state.fontSize + NovelAppConfig.readConfig.lineHeight;
  };

  /**
   * 获取当前时间
   * @returns {string}
   * @private
   */
  _getTime = () => {
    let date = new Date();
    this.hour = date.getHours();

    this.min = date.getMinutes();
    if (this.min < 10) {
      this.min = '0' + this.min;
    }
    return '';
  };

  _renderItem = (info: {item: Article, index: number}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={[{color: this.state.color}, styles.itemTitle]}>
          {this._getTime() +
            this.toggleChineseText(
              this.hour + ':' + this.min + '   ' + info.item.chapterName,
            )}
        </Text>

        <Text
          allowFontScaling={false}
          style={[
            {
              color: this.state.color,
              fontSize: this.state.fontSize,
              lineHeight: this.getLineHeight(),
              textAlign: 'center',
              // borderWidth:1,
              // paddingTop:8,
            },
            styles.articleText,
          ]}>
          {this.toggleChineseText(info.item.chapterContent)}
        </Text>
        {this.props.catalogDataLength === info.item.currentChapterNum &&
        info.index === this.props.articles.length - 1 ? (
          <Text style={[styles.noMoreChapter, {color: this.state.color}]}>
            {getChineseText('没有更多章节了')}
          </Text>
        ) : (
          <View style={styles.reFetchContainer}>
            {info.index === this.props.articles.length - 1 ? (
              <TouchableOpacity
                style={styles.reFetchButton}
                onPress={() => {
                  this.props.reFetchArticle();
                }}>
                {this.props.isFetching ? (
                  <View style={styles.loadingNextPage}>
                    <Text style={styles.reFetchText}>
                      {I18n.t('loadingNextPage')}
                    </Text>
                    <ActivityIndicator
                      animating={true}
                      color="#fff"
                      size="small"
                    />
                  </View>
                ) : (
                  <Text style={styles.reFetchText}>
                    {I18n.t('loadNextPage')}
                  </Text>
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        horizontal={true}
        pagingEnabled={false}
        ref={ref => {
          this._flatRef = ref;
        }}
        data={this.props.articles}
        extraData={[this.props.prevAricle]}
        getItemLayout={this._getItemLayout}
        renderItem={this._renderItem}
        onViewableItemsChanged={this._onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  _keyExtractor = (item, index) => {
    return index;
  };
}

const styles = StyleSheet.create({
  itemContainer: {
    // height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 10,
    position: 'absolute',
    top: 0,
    left: 10,
  },
  articleText: {
    alignSelf: 'center',
    textAlign: 'justify',
    textAlignVertical: 'center',
    includeFontPadding: false,
    // paddingTop: 5
  },
  reFetchContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  reFetchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'deeppink',
    // width: WIDTH/10*8,
    alignSelf: 'center',
    borderRadius: 20,
  },
  reFetchText: {
    fontSize: 16,
    margin: 2,
    color: 'deeppink',
  },
  noMoreChapter: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    alignSelf: 'center',
  },
  loadingNextPage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomFlatList;
