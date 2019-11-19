/**
 * @author Semper
 */
import React from 'react';
import {
  BackHandler,
  FlatList,
  InteractionManager,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HEIGHT, WIDTH} from '../utils/DimensionsUtil';
import Loading from '../commons/Loading';
import {getChineseText} from '../utils/LanguageUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const itemHeight = 52;
const headerLength = WIDTH / 4.5;

class CatalogPage extends React.Component {
  static navigationOptions = {
    header: null,
    // headerStyle:{elevation: 0}
  };

  constructor() {
    super();
    // this.itemHeight = 52;
    this.state = {
      isInverted: false,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('CatalogBackPress', this.onBackAndroid);
    }
    let params = this.props.navigation.state.params;
    this.fetchArticleByCatalog = params.fetchArticleByCatalog;
    this.currentChapterNum = params.currentChapterNum;
    this.siteName = params.siteName;
    this.bookName = params.bookName;
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('CatalogBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    const appTheme = this.props.screenProps.appTheme;
    return (
      <View
        style={[
          styles.catalogContainer,
          {backgroundColor: NovelAppConfig.readerColor.contentBgColor},
        ]}
        onStartShouldSetResponder={() => {
          return true;
        }}
        onResponderRelease={() => {
          this.props.navigation.goBack();
        }}>
        <StatusBar
          animated={true}
          backgroundColor={appTheme.darkColor}
          barStyle="light-content"
        />

        {globalData.catalog ? (
          <View
            style={{
              backgroundColor: NovelAppConfig.readerColor.contentBgColor,
              elevation: 5,
              marginRight: 10,
              shadowOffset: {width: 3, height: 3},
              shadowColor: 'black',
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <View
              style={{
                width: (WIDTH / 5) * 4,
                height: headerLength,
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: NovelAppConfig.readerColor.sliderColor,
                  fontSize: 20,
                  marginBottom: 10,
                }}>
                {this.bookName}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: NovelAppConfig.readerColor.sliderColor}}>
                  共{globalData.catalog.length}章
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this._flatRef.scrollToEnd({offset: 0, animated: false});
                    }}>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={25}
                      style={{
                        marginRight: 10,
                        color: NovelAppConfig.readerColor.sliderColor,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this._flatRef.scrollToOffset({
                        offset: 0,
                        animated: false,
                      });
                    }}>
                    <MaterialIcons
                      name="keyboard-arrow-up"
                      size={25}
                      style={{color: NovelAppConfig.readerColor.sliderColor}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <FlatList
              inverted={this.state.isInverted}
              contentContainerStyle={{
                width: (WIDTH / 5) * 4,
                justifyContent: 'flex-start',
              }}
              ref={this._captureRef}
              data={globalData.catalog}
              renderItem={this._renderItem}
              onViewableItemsChanged={this._onViewableItemsChanged}
              getItemLayout={this._getItemLayout}
              keyExtractor={this._keyExtractor}
            />
          </View>
        ) : (
          <Loading animating={true} />
        )}
      </View>
    );
  }

  _captureRef = ref => {
    this._flatRef = ref;
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          InteractionManager.runAfterInteractions(() => {
            this.fetchArticleByCatalog(index);
          });
          this.props.navigation.goBack(null);
        }}
        style={[
          styles.btn,
          {
            backgroundColor: NovelAppConfig.readerColor.contentBgColor,
            borderColor: NovelAppConfig.readerColor.sliderColor2,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          {item.isCacheSuccess ? (
            <Text style={styles.cacheText}>• </Text>
          ) : (
            <Text style={styles.noCacheText}>• </Text>
          )}
          <Text
            style={
              this.currentChapterNum - 2 === index
                ? {
                    fontWeight: 'bold',
                    color: NovelAppConfig.readerColor.sliderColor,
                    // fontSize:20
                  }
                : {
                    fontWeight: 'normal',
                    color: NovelAppConfig.readerColor.sliderColor,
                  }
            }>
            {getChineseText(item.title)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  _onViewableItemsChanged = () => {
    if (
      this.currentChapterNum &&
      globalData.catalog.length > 0 &&
      !this.isFetched
    ) {
      this.isFetched = true;
      try {
        this._flatRef.scrollToIndex({
          animated: false,
          viewPosition: 0.5,
          index: this.currentChapterNum - 2,
        });
      } catch (e) {
        console.warn('CatalogPage scrollToIndex err:', e.message);
      }
    }
  };
  _getItemLayout = (data, index) => {
    return {length: itemHeight, offset: itemHeight * index, index};
  };
  _keyExtractor = (item, index) => {
    return index;
  };
}

const styles = StyleSheet.create({
  catalogContainer: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btn: {
    height: itemHeight,
    width: (WIDTH / 5) * 4,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingLeft: 10,
  },
  cacheText: {
    color: '#4e4',
  },
  noCacheText: {
    color: '#eee',
  },
});

export default CatalogPage;
