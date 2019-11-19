/**
 * @author Semper
 */
import React from 'react';
import {
  InteractionManager,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {requestCategory} from '../actions/category';
import {CATEGORY_LV2_URL} from '../constants/api';
import {HEIGHT, WIDTH} from '../utils/DimensionsUtil';
import I18n from '../i18n/i18n';
import {TAB_ICON_SIZE} from '../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getChineseText} from '../utils/LanguageUtil';
import FastImage from 'react-native-fast-image';

const leftView = WIDTH / 6;
const categoryItemMargin = WIDTH / 10;
const categoryItemWidth = (WIDTH - leftView - categoryItemMargin) / 2;
const categoryItemHeight = categoryItemWidth / 2.3;
const searchContainer = HEIGHT / 7;
const IMAGES = {
  male: [
    require('../../data/img/1.jpg'),
    require('../../data/img/2.jpg'),
    require('../../data/img/3.jpg'),
    require('../../data/img/4.jpg'),
    require('../../data/img/5.jpg'),
    require('../../data/img/6.jpg'),
    require('../../data/img/7.jpg'),
    require('../../data/img/8.jpg'),
    require('../../data/img/9.jpg'),
    require('../../data/img/10.jpg'),
    require('../../data/img/11.jpg'),
    require('../../data/img/12.jpg'),
    require('../../data/img/13.jpg'),
    require('../../data/img/14.jpg'),
  ],
  female: [
    require('../../data/img/15.jpg'),
    require('../../data/img/16.jpg'),
    require('../../data/img/17.jpg'),
    require('../../data/img/18.jpg'),
    require('../../data/img/19.jpg'),
    require('../../data/img/20.jpg'),
    require('../../data/img/21.jpg'),
    require('../../data/img/22.jpg'),
    require('../../data/img/23.jpg'),
    require('../../data/img/24.jpg'),
    require('../../data/img/25.jpg'),
    require('../../data/img/26.jpg'),
  ],
};
class CategoryPage extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    tabBarLabel: ({focused}) => (
      <Text
        style={[
          {
            color: screenProps.appTheme.darkColor,
            fontSize: 12,
            marginBottom: 5,
          },
          focused
            ? {color: screenProps.appTheme.darkColor}
            : {color: screenProps.appTheme.lightColor},
        ]}>
        {I18n.t('category')}
      </Text>
    ),
    tabBarIcon: ({focused}) => (
      <MaterialIcons
        name="apps"
        size={TAB_ICON_SIZE}
        style={
          focused
            ? {color: screenProps.appTheme.darkColor}
            : {color: screenProps.appTheme.lightColor}
        }
      />
    ),
  });

  constructor() {
    super();
    this.state = {
      isMale: true,
    };
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(requestCategory(CATEGORY_LV2_URL));
    });
  }

  navToCategoryDetail = (item, gender) => {
    this.props.navigation.navigate('CategoryDetail', {
      item: item,
      gender: gender,
    });
  };

  render() {
    if (this.props.categoryData) {
      this.male = this.props.categoryData.male;
      this.female = this.props.categoryData.female;
    }
    const appTheme = this.props.screenProps.appTheme;
    return this.props.categoryData ? (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Search');
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: searchContainer,
            justifyContent: 'center',
          }}>
          <View
            style={[
              {
                marginVertical: 20,
                marginHorizontal: 20,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: 'rgb(240,240,240)',
                borderRadius: 5,
              },
            ]}>
            <MaterialIcons
              name="search"
              size={24}
              color={this.props.screenProps.appTheme.primaryColor}
            />
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: '100%',
              width: leftView,
              backgroundColor: '#fff',
              alignItems: 'center',
              // marginTop: searchContainer
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isMale: true,
                });
                this.scrollRef.scrollTo({x: 0, y: 0, animated: true});
              }}
              style={[
                {
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',

                  flexDirection: 'row',
                },
                this.state.isMale
                  ? {backgroundColor: '#eee'}
                  : {backgroundColor: '#fff'},
              ]}>
              {this.state.isMale ? (
                <Text
                  style={{
                    height: '100%',
                    width: 5,
                    position: 'absolute',
                    left: 0,
                    backgroundColor: this.props.screenProps.appTheme
                      .primaryColor,
                    marginRight: 4,
                  }}
                />
              ) : null}
              <Text style={{padding: 20}}>男生</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isMale: false,
                });
                this.scrollRef.scrollToEnd();
              }}
              style={[
                {
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',

                  flexDirection: 'row',
                },
                !this.state.isMale
                  ? {backgroundColor: '#eee'}
                  : {backgroundColor: '#fff'},
              ]}>
              {!this.state.isMale ? (
                <Text
                  style={{
                    height: '100%',
                    width: 5,
                    position: 'absolute',
                    left: 0,
                    backgroundColor: this.props.screenProps.appTheme
                      .primaryColor,
                    marginRight: 4,
                  }}
                />
              ) : null}
              <Text style={{padding: 20}}>女生</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: '100%'}}>
            <ScrollView
              ref={ref => {
                this.scrollRef = ref;
              }}
              contentContainerStyle={{
                backgroundColor: '#EEE',
                width: WIDTH - leftView,
                paddingBottom: searchContainer,
                // marginTop: searchContainer,
                // marginLeft: leftView,
              }}>
              <StatusBar
                animated={true}
                backgroundColor={appTheme.darkColor}
                barStyle="light-content"
              />

              <View>
                <View style={{}}>
                  <Text style={{paddingLeft: 30, marginVertical: 10}}>
                    男生小说
                  </Text>

                  <View style={styles.categoryContent}>
                    {this.male.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.navToCategoryDetail(item, 'male');
                          }}
                          key={index}
                          style={[
                            styles.catItem,
                            {
                              backgroundColor: '#fff',
                              // borderWidth: 1,
                              paddingVertical: 5,
                              width: '50%',
                              height: categoryItemHeight,
                            },
                          ]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <FastImage
                              style={{
                                width: (((categoryItemHeight / 4) * 3) / 3) * 2,
                                height: (categoryItemHeight / 3) * 2,
                                borderRadius: 5,
                              }}
                              source={IMAGES.male[index]}
                            />
                            <Text style={{marginLeft: 10}}>
                              {getChineseText(item.major)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <Text style={{paddingLeft: 30, marginVertical: 10}}>
                    女生小说
                  </Text>

                  <View style={styles.categoryContent}>
                    {this.female.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.navToCategoryDetail(item, 'female');
                          }}
                          key={index}
                          style={[
                            styles.catItem,
                            {
                              backgroundColor: '#fff',
                              // borderWidth: 1,
                              paddingVertical: 5,
                              width: '50%',
                              height: categoryItemHeight,
                            },
                          ]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <FastImage
                              style={{
                                width: (((categoryItemHeight / 4) * 3) / 3) * 2,
                                height: (categoryItemHeight / 3) * 2,
                                borderRadius: 5,
                              }}
                              source={IMAGES.female[index]}
                            />
                            <Text style={{marginLeft: 10}}>
                              {getChineseText(item.major)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  rankTag: {
    color: '#999',
    // backgroundColor: '#F8F8F8',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  categoryContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  catItem: {
    width: categoryItemWidth,
    height: categoryItemHeight,
    // margin: categoryItemMargin,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 20,
    borderRadius: 3,
  },
});

function mapStateToProps(state) {
  const {categoryData} = state.category;
  return {categoryData};
}

export default connect(mapStateToProps)(CategoryPage);
