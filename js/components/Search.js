/**
 * @author Semper
 */
import React from 'react';
import {
  ActivityIndicator,
  Button,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {BOOKMARK_HEIGHT, BOOKMARK_WIDTH, WIDTH} from '../utils/DimensionsUtil';
import {connect} from 'react-redux';
import {requestSearch} from '../actions/search';
import {getOtherSearchBookInfo, getSearchBook} from '../utils/ParseHtmlUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {OTHER_SEARCH_URLS, ZSSQ_SEARCH} from '../constants/api';
import {requestOtherSearch} from '../actions/otherSearch';
import I18n from '../i18n/i18n';
import {getChineseText, Simplified} from '../utils/LanguageUtil';
import ToastUtil from '../utils/ToastUtil';
import FastImage from 'react-native-fast-image';

const _uniq = require('lodash/uniq');
class Search extends React.Component {
  static navigationOptions = ({screenProps}) => {
    return {
      headerTitle: I18n.t('search'),
      headerStyle: {
        elevation: 0,
        backgroundColor: screenProps.appTheme.primaryColor,
      },
      headerTintColor: '#fff',
    };
  };

  searchBookName = '';

  constructor(props) {
    super(props);
    this.otherBookInfos = [];
    this.state = {res: '', searchBookName: ''};
    this.siteNames = [];
    this.isSearched = false;
  }

  componentDidMount() {
    if (globalData.globalBookNameParam) {
      this.searchBookName = globalData.globalBookNameParam;
      this._searchBook();
      globalData.globalBookNameParam = null;
    }
  }

  setSearchBookName(searchBookName) {
    this.searchBookName = searchBookName;
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.siteName) {
      this.siteNames.push(nextProps.siteName);
      let siteNames = _uniq(this.siteNames);
      if (siteNames.length === OTHER_SEARCH_URLS.length) {
        this.requestEnd = true;
        this.siteNames = [];
        // return true
      }
    }
    return (
      this.props.searchResult !== nextProps.searchResult ||
      this.props.baseSearchUrl !== nextProps.baseSearchUrl ||
      this.props.otherSearchResult !== nextProps.otherSearchResult ||
      this.props.baseOtherSearchUrl !== nextProps.baseOtherSearchUrl ||
      this.props.siteName !== nextProps.siteName
    );
  }

  _searchBook = () => {
    try {
      if (this.searchBookName === undefined || this.searchBookName === '') {
        ToastUtil.showShort(I18n.t('pleaseInputText'));
      } else {
        // if (NovelAppConfig.isTraditional) {
        //     this.searchBookName = Simplified(this.searchBookName)
        // }
        this.requestEnd = false;
        this.siteName = [];
        this.isSearched = true;
        this.searchBookName = Simplified(this.searchBookName);
        // console.log('this.searchBookName--',this.searchBookName,NovelAppConfig.isTraditional)
        this.props.dispatch(requestSearch(ZSSQ_SEARCH + this.searchBookName));
        this.otherBookInfos = [];
        this.props.dispatch(requestOtherSearch(this.searchBookName));
      }
    } catch (e) {
      console.warn('Search _searchBook', e.message);
    }
  };

  _navToReader = (articleUrlTag, bookName, image, siteName, bookId, author) => {
    this.props.navigation.navigate('Read', {
      articleUrlTag: articleUrlTag,
      bookName: bookName,
      image: image,
      siteName: siteName,
      bookId: bookId,
      author: author,
    });
  };

  render() {
    try {
      const appTheme = this.props.screenProps.appTheme;
      // console.log(this.props.searchResult);
      if (this.props.otherSearchResult) {
        let r = getSearchBook(this.props.otherSearchResult);
        let result = getOtherSearchBookInfo(
          this.props.otherSearchResult,
          this.props.siteName,
        );
        // this.otherBookInfo = getSearchBookInfoByParseHtml(this.props.otherSearchResult);
        // console.log("r",r)
        // console.log("result",result)

        if (result && result.length > 0) {
          this.otherBookInfos.push(...result);
        }
      }

      return (
        <ScrollView>
          {this._renderSearchInput(appTheme.primaryColor)}
          {this.otherBookInfos.length > 0 ? (
            this._renderOtherSearch(appTheme)
          ) : this.requestEnd ? (
            <Text style={{alignSelf: 'center', marginTop: 20}}>未找到该书</Text>
          ) : this.isSearched ? (
            <View
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                animating={true}
                color={appTheme.primaryColor}
                size="small"
              />
              <Text style={{color: appTheme.primaryColor}}>搜索中，请稍等</Text>
            </View>
          ) : null}
        </ScrollView>
      );
    } catch (e) {
      console.warn('Search render', e.message);
    }
  }

  formatText = text => {
    return getChineseText(text);
  };

  _renderSearchInput = color => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          // autoFocus={true}
          style={{
            width: WIDTH * 0.8,
            height: 40,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            paddingLeft: 5,
          }}
          placeholder={I18n.t('bookName')}
          placeholderTextColor="#ddd"
          clearTextOnFocus={true}
          clearButtonMode="while-editing"
          returnKeyType="search"
          onSubmitEditing={() => {
            if (
              this.searchBookName &&
              this.searchBookName !== '' &&
              this.searchBookName !== undefined
            ) {
              this._searchBook();
            }
          }}
          onChangeText={searchBookName =>
            this.setSearchBookName(searchBookName)
          }
        />
        <Button
          title={I18n.t('search')}
          color={color}
          onPress={this._searchBook}
        />
      </View>
    );
  };

  _renderOtherSearch = appTheme => {
    return (
      <View style={styles.otherSearchItem}>
        {this.otherBookInfos.map((item, index) => {
          return (
            <TouchableHighlight
              key={index}
              underlayColor="#fff"
              onPress={() => {
                this._navToReader(
                  item.articleUrlTag,
                  item.title,
                  item.img,
                  item.siteName,
                  null,
                  item.author,
                );
              }}>
              <View>
                <View style={styles.itemContent}>
                  <FastImage
                    source={{uri: item.img}}
                    style={styles.bookImage}
                  />
                  <View style={styles.itemText}>
                    <Text style={styles.bookTitle}>
                      {getChineseText(item.title)}
                    </Text>
                    <View style={styles.bookAuthor}>
                      <MaterialIcons
                        name="account-circle"
                        size={16}
                        style={styles.itemIcon}
                      />
                      <Text>{getChineseText(item.author)}</Text>
                    </View>
                    <View>
                      <Text numberOfLines={1}>
                        {this.formatText('时间：' + item.date)}
                      </Text>
                    </View>
                    <View>
                      <Text numberOfLines={1}>
                        {this.formatText('最新：' + item.lastChapter)}
                      </Text>
                    </View>
                    <Text>
                      {getChineseText('来源：')}{' '}
                      <Text style={{color: 'cornflowerblue'}}>
                        {getChineseText(item.siteName)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };
}

const pr = PixelRatio.get();

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
    borderColor: '#ccc',
  },
  margin: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  bookImage: {
    width: BOOKMARK_WIDTH,
    height: BOOKMARK_HEIGHT,
  },
  bookInfo: {
    flexDirection: 'row',
    marginLeft: 18 * pr,
    marginTop: 18 * pr,
    marginBottom: 18 * pr,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookStar: {
    color: '#f0ad4e',
    marginRight: 5,
  },
  chapterCatalog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    paddingTop: 16,
    paddingBottom: 16,
  },
  catalog: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherSearchItem: {
    marginTop: 1,
    backgroundColor: '#fff',
  },
  itemHeaderText: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    color: '#bbb',
  },
  itemContent: {
    flexDirection: 'row',
    padding: 20,
  },
  itemText: {
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 12,
  },
  itemIcon: {
    color: '#ddd',
    marginRight: 5,
  },
});

function mapStateToProps(state) {
  const {otherSearchResult, baseOtherSearchUrl, siteName} = state.otherSearch;
  return {otherSearchResult, baseOtherSearchUrl, siteName};
}

export default connect(mapStateToProps)(Search);
