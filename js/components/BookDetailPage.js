/**
 * @author Semper
 */
import React from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import HotSimilar from '../commons/HotSimilar';
import I18n from '../i18n/i18n';
import MainDetail from '../commons/MainDetail';
import {NavigationActions, StackActions} from 'react-navigation';
import ReadBtn from '../commons/ReadBtn';
import {WIDTH} from '../utils/DimensionsUtil';
import type {Bookmarks} from '../model/Bookmark';
import {saveBookmark} from '../utils/BookmarkUtil';
import {requestBookmarks} from '../actions/bookmarks';
import {BOOKMARKS_URL} from '../constants/api';
import ToastUtil from '../utils/ToastUtil';

class BookDetailPage extends React.Component {
  static navigationOptions = ({screenProps}) => {
    return {
      headerTitle: I18n.t('detail'),
      headerStyle: {
        elevation: 0,
        backgroundColor: screenProps.appTheme.primaryColor,
      },
      headerTintColor: '#fff',
    };
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.params = this.props.navigation.state.params;
  }

  componentWillUpdate() {}

  _navToSearch = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'App'}),
          NavigationActions.navigate({routeName: 'Search'}),
        ],
      }),
    );
  };

  setBookmark = (bookmark, bookDetail) => {
    this.bookmark = bookmark;
    this.bookDetail = bookDetail;
  };

  navToReader = () => {
    let otherBookInfo = this.detailRef.getWrappedInstance().getOtherBookInfo();
    if (otherBookInfo) {
      this.props.navigation.navigate('Read', {
        articleUrlTag: otherBookInfo.articleUrlTag,
        bookName: otherBookInfo.title,
        image: otherBookInfo.img,
        siteName: otherBookInfo.siteName,
        bookId: null,
        author: otherBookInfo.author,
      });
    } else {
      ToastUtil.showShort('未找到该书源');
    }
  };

  setIsJoinBookshelf = bool => {
    this.readBtnRef.updateData(bool);
  };

  scrollToTop = () => {
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});
  };

  saveBookmark = () => {
    this.detailRef.getWrappedInstance().saveAndRereadBookmarks();
  };

  clearOtherBookInfo = () => {
    this.detailRef.getWrappedInstance().clearOtherBookInfo();
  };

  searchBook = bookName => {
    this.detailRef.getWrappedInstance().searchBook(bookName);
  };

  render() {
    const appTheme = this.props.screenProps.appTheme;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 65}}
            ref={ref => {
              this.scrollView = ref;
            }}
            showsVerticalScrollIndicator={false}>
            <View>
              <MainDetail
                ref={ref => {
                  this.detailRef = ref;
                }}
                setIsJoinBookshelf={this.setIsJoinBookshelf}
                appTheme={appTheme}
                params={this.params}
                setBookmark={this.setBookmark}
                navToSearch={this._navToSearch}
                navToReader={this.navToReader}
                setOtherBookInfo={this.setOtherBookInfo}
              />
              <HotSimilar
                searchBook={this.searchBook}
                clearOtherBookInfo={this.clearOtherBookInfo}
                scrollToTop={this.scrollToTop}
                appTheme={appTheme}
              />
            </View>
          </ScrollView>
          <ReadBtn
            ref={ref => {
              this.readBtnRef = ref;
            }}
            navToReader={this.navToReader}
            saveBookmark={this.saveBookmark}
            primaryColor={this.props.screenProps.appTheme.primaryColor}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default BookDetailPage;
