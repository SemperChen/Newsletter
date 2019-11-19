/**
 * @author Semper
 */
import React from 'react';
import {
  Animated,
  FlatList,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createAnimation} from '../utils/AnimatedUtil';
import {HEIGHT, WIDTH} from '../utils/DimensionsUtil';
import {getChineseText} from '../utils/LanguageUtil';
import Loading from '../commons/Loading';

const itemHeight = 52;
class CatalogPage1 extends React.Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(-WIDTH);
  }

  open() {
    createAnimation(this.animatedValue, 0).start();
  }

  close = () => {
    createAnimation(this.animatedValue, -WIDTH).start();
  };

  componentWillMount() {
    this.fetchArticleByCatalog = this.props.fetchArticleByCatalog;
    this.siteName = this.props.siteName;
  }

  _captureRef = ref => {
    this._flatRef = ref;
  };

  render() {
    console.log('this.props.currentChapterNum', this.props.currentChapterNum);

    return (
      <Animated.View
        style={[
          styles.catalogContainer,
          {position: 'absolute', left: this.animatedValue},
        ]}>
        {globalData.catalog ? (
          <FlatList
            ref={this._captureRef}
            data={globalData.catalog}
            renderItem={this._renderItem}
            onViewableItemsChanged={this._onViewableItemsChanged}
            getItemLayout={this._getItemLayout}
            keyExtractor={this._keyExtractor}
          />
        ) : (
          <Loading animating={true} />
        )}
      </Animated.View>
    );
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          InteractionManager.runAfterInteractions(() => {
            this.fetchArticleByCatalog(index);
          });
          this.close();
          this.props.setIsOpenCatalog(false);
          // this.props.navigation.goBack(null)
        }}
        style={styles.btn}>
        <View style={{flexDirection: 'row'}}>
          {item.isCacheSuccess ? (
            <Text style={styles.cacheText}>• </Text>
          ) : (
            <Text style={styles.noCacheText}>• </Text>
          )}
          <Text
            style={
              this.props.currentChapterNum - 2 === index
                ? {
                    fontWeight: 'bold',
                    color: 'red',
                  }
                : {
                    fontWeight: 'normal',
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
      this.props.currentChapterNum &&
      globalData.catalog.length > 0 &&
      !this.isFetched
    ) {
      this.isFetched = true;
      try {
        this._flatRef.scrollToIndex({
          animated: false,
          viewPosition: 0.5,
          index: this.props.currentChapterNum - 2,
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
    return item + index;
  };
}

const styles = StyleSheet.create({
  catalogContainer: {
    height: HEIGHT,
    width: (WIDTH / 3) * 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: itemHeight,
    width: (WIDTH / 3) * 2,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: 'rgb(200, 199, 204)',
    paddingLeft: 10,
  },
  cacheText: {
    color: '#4e4',
  },
  noCacheText: {
    color: '#eee',
  },
});

export default CatalogPage1;
