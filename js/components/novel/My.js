/**
 * @author Semper
 */
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CACHE_DIR_PATH, READER_SEX, TAB_ICON_SIZE} from "../../constants/constants";
import {DeviceEventEmitter, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import I18n from "../../i18n/i18n";
import {getChineseText} from "../../utils/LanguageUtil";
import {WIDTH} from "../../utils/DimensionsUtil";
import {saveAppConfig} from "../../utils/ConfigUtil";
import RNFS from "react-native-fs";
import ToastUtil from "../../utils/ToastUtil";

const fontSizeNames = ["小号", "标准", "大号", "特大号"]
const autoPlayNames = ["WiFi与蜂窝数据", "仅WiFi", "从不"]
const newsUpdateCycleNames = ["即时", "每小时", "每晚7点"]

class My extends React.Component {
    constructor() {
        super();
        this.state = {
            isNightMode: NovelAppConfig.readConfig.isNightMode,
            isShowPushN: NovelAppConfig.isShowPushN,
            skinModalVisible: false,
            readerSexModalVisible: false,
            commonVisible: false,
            isKeepAwake: NovelAppConfig.isKeepAwake
        }
        this.list = []
        this.index = 0;
    }

    _changeReaderSexModal = () => {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.readerSexModalVisible}
                    onRequestClose={() => {
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setReaderSexModalVisible(false)
                        }}
                        style={styles.skinModalContainer}>
                        <View style={styles.skinModalContent}>
                            <TouchableOpacity
                                onPress={() => {
                                    NovelAppConfig.readerSex = READER_SEX.MALE;
                                    this.reFetchBookStoreData();
                                    this.setReaderSexModalVisible(false)
                                }}>
                                <View style={styles.item}>
                                    <Text style={styles.itemLeftText}>{I18n.t('male')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    NovelAppConfig.readerSex = READER_SEX.FEMALE;
                                    this.reFetchBookStoreData();
                                    this.setReaderSexModalVisible(false)
                                }}>
                                <View style={styles.item}>
                                    <Text style={styles.itemLeftText}>{I18n.t('female')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                </Modal>

            </View>
        )
    };

    _commonModal = () => {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.commonVisible}
                onRequestClose={() => {
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.toggleCommonModalVisible()
                    }}
                    style={styles.skinModalContainer}>
                    <View style={styles.skinModalContent}>
                        {this.list.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        item.func();
                                        this.toggleCommonModalVisible()

                                    }}>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLeftText}>{item.name}</Text>
                                        {this.index === index ? <Text>☑️</Text> : null}
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                    </View>

                </TouchableOpacity>
            </Modal>
        )
    };


    reFetchBookStoreData = () => {
        DeviceEventEmitter.emit('ChangeReaderSex', '');
    };

    setSkinModalVisible(visible) {
        this.setState({skinModalVisible: visible});
    }

    setReaderSexModalVisible(visible) {
        this.setState({readerSexModalVisible: visible});
    }

    toggleCommonModalVisible() {
        this.setState({commonVisible: !this.state.commonVisible});
    }

    clearAllBookCache = () => {
        try {
            RNFS.unlink(CACHE_DIR_PATH);
            ToastUtil.showShort(I18n.t('clearBookCacheSuccess'))
        } catch (e) {
            console.warn('SettingPage clearAllBookCache', e.message)
        }

    };

    _changeFontSize = () => {
        this.index = NovelAppConfig.fontIndex;
        this.list = [{
            func: () => {
                NovelAppConfig.fontIndex = 0
            }, name: fontSizeNames[0]
        }, {
            func: () => {
                NovelAppConfig.fontIndex = 1
            }, name: fontSizeNames[1]
        }, {
            func: () => {
                NovelAppConfig.fontIndex = 2
            }, name: fontSizeNames[2]
        }, {
            func: () => {
                NovelAppConfig.fontIndex = 3
            }, name: fontSizeNames[3]
        }]
        this.toggleCommonModalVisible();
        saveAppConfig(NovelAppConfig)
    }

    _autoPlay = () => {
        this.index = NovelAppConfig.autoplayIndex;
        this.list = [{
            func: () => {
                NovelAppConfig.autoplayIndex = 0
            }, name: autoPlayNames[0]
        }, {
            func: () => {
                NovelAppConfig.autoplayIndex = 1
            }, name: autoPlayNames[1]
        }, {
            func: () => {
                NovelAppConfig.autoplayIndex = 2
            }, name: autoPlayNames[2]
        }]
        this.toggleCommonModalVisible();
        saveAppConfig(NovelAppConfig)
    }

    _newsUpdateCycle = () => {
        this.index = NovelAppConfig.newsUpdateCycleIndex;
        this.list = [{
            func: () => {
                NovelAppConfig.newsUpdateCycleIndex = 0
            }, name: newsUpdateCycleNames[0]
        }, {
            func: () => {
                NovelAppConfig.newsUpdateCycleIndex = 1
            }, name: newsUpdateCycleNames[1]
        }, {
            func: () => {
                NovelAppConfig.newsUpdateCycleIndex = 2
            }, name: newsUpdateCycleNames[2]
        }]
        this.toggleCommonModalVisible();
        saveAppConfig(NovelAppConfig)
    }

    static navigationOptions = ({screenProps}) => {
        return {
            tabBarLabel: ({focused}) => (
                <Text style={[{
                    color: screenProps.appTheme.darkColor,
                    fontSize: 12,
                    marginBottom: 5
                }, focused ?
                    {color: screenProps.appTheme.darkColor} :
                    {color: screenProps.appTheme.lightColor}]}>{I18n.t('explore')}</Text>
            ),
            tabBarIcon: ({focused}) => (
                <MaterialIcons name="person" size={TAB_ICON_SIZE}
                               style={focused ?
                                   {color: screenProps.appTheme.darkColor} :
                                   {color: screenProps.appTheme.lightColor}}/>
            ),
        }
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#fafafa'}}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this.props.navigation.navigate('User')
                    }}
                    style={[styles.loginSuc, {backgroundColor: '#fff'}]}>
                    <View style={[styles.imgContent, {backgroundColor: appTheme.primaryColor}]}>
                        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>登录</Text>
                    </View>
                    {/*<Text*/}
                    {/*    style={{color: '#000'}}>{NovelAppConfig.user && NovelAppConfig.user.username ? NovelAppConfig.user.username : '游客'}</Text>*/}

                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: 12,
                        paddingTop: 0,
                        marginHorizontal: 12
                    }}>
                        <TouchableOpacity>
                            <View
                                style={{justifyContent: "center", alignItems: 'center'}}
                            >
                                <Icon
                                    name='ios-heart'
                                    size={26}
                                    color={'rgb(242,161,72)'}
                                />
                                <Text style={{fontSize: 12, color: 'rgb(95,95,95)'}}>收藏</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View
                                style={{justifyContent: "center", alignItems: 'center'}}
                            >
                                <Icon
                                    name='ios-book'
                                    size={26}
                                    color={'rgb(62,154,125)'}
                                />
                                <Text style={{fontSize: 12, color: 'rgb(95,95,95)'}}>书架</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View
                                style={{justifyContent: "center", alignItems: 'center'}}
                            >
                                <Icon
                                    name='ios-notifications'
                                    size={26}
                                    color={'rgb(61,145,235)'}
                                />
                                <Text style={{fontSize: 12, color: 'rgb(95,95,95)'}}>消息</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>

                {/*<TouchableOpacity
                    style={{}}
                    onPress={() => {
                        this.props.navigation.navigate('Notification')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Icon
                                name='ios-notifications'
                                size={20}
                                color={appTheme.primaryColor}
                            />
                            <Text style={styles.itemLeftText}>{getChineseText('公告')}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                        />
                    </View>
                </TouchableOpacity>*/}

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.setState((prevState) => ({
                            isShowPushN: !prevState.isShowPushN
                        }))
                        NovelAppConfig.isShowPushN = !NovelAppConfig.isShowPushN;
                        saveAppConfig(NovelAppConfig);
                    }}>
                    <View style={[styles.item]}>
                        <Text style={styles.itemLeftText}>推送设置</Text>
                        <Switch
                            trackColor={{false: '#eee', true: appTheme.primaryColor}}
                            thumbColor={'#fff'}
                            style={styles.switch}
                            value={this.state.isShowPushN}
                            onValueChange={(bool) => {
                                this.setState((prevState) => ({
                                    isShowPushN: !prevState.isShowPushN
                                }))
                                NovelAppConfig.isShowPushN = bool;
                                saveAppConfig(NovelAppConfig);
                            }}
                        />
                    </View>

                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.setState((prevState) => ({
                            isNightMode: !prevState.isNightMode
                        }))
                        NovelAppConfig.readConfig.isNightMode = !NovelAppConfig.readConfig.isNightMode;
                        saveAppConfig(NovelAppConfig);

                    }}>
                    <View style={[styles.item]}>
                        <Text style={styles.itemLeftText}>夜间模式</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{false: '#eee', true: appTheme.primaryColor}}
                            thumbColor={'#fff'}
                            value={this.state.isNightMode}
                            onValueChange={(bool) => {
                                this.setState((prevState) => ({
                                    isNightMode: !prevState.isNightMode
                                }))
                                NovelAppConfig.readConfig.isNightMode = bool;
                                saveAppConfig(NovelAppConfig);
                            }}
                        />
                    </View>

                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        NovelAppConfig.isKeepAwake = !this.state.isKeepAwake;
                        saveAppConfig(NovelAppConfig);
                        this.setState((prevState) => ({
                            isKeepAwake: !prevState.isKeepAwake
                        }));
                    }}>
                    <View style={styles.item}>
                        <Text style={styles.itemLeftText}>屏幕常亮</Text>
                        <Switch
                            value={this.state.isKeepAwake}
                            onValueChange={(bool) => {
                                this.setState({
                                    isKeepAwake: bool
                                });
                                NovelAppConfig.isKeepAwake = bool;
                                saveAppConfig(NovelAppConfig);
                            }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.props.navigation.navigate('Rankings')
                    }}>
                    <View style={styles.item}>
                        <Text style={styles.itemLeftText}>{I18n.t('rankings')}</Text>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.setReaderSexModalVisible(true)
                    }}>
                    <View style={styles.item}>
                        <Text style={styles.itemLeftText}>{I18n.t('readerSex')}</Text>
                        <Text style={styles.itemValue}>{NovelAppConfig.readerSex}</Text>
                    </View>

                </TouchableOpacity>*/}


                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this._changeFontSize()
                    }}>
                    <View style={styles.item}>
                        <Text style={styles.itemLeftText}>字体大小</Text>
                        <Text style={styles.itemValue}>{fontSizeNames[NovelAppConfig.fontIndex]}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this._autoPlay()
                    }}>
                    <View style={styles.item}>
                        <Text style={styles.itemLeftText}>视频自动播放</Text>
                        <Text style={styles.itemValue}>{autoPlayNames[NovelAppConfig.autoplayIndex]}</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this._newsUpdateCycle()
                    }}>
                    <View style={styles.item}>
                        <Text style={styles.itemLeftText}>资讯更新周期</Text>
                        <Text
                            style={styles.itemValue}>{newsUpdateCycleNames[NovelAppConfig.newsUpdateCycleIndex]}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, {marginTop: 5}]}
                    onPress={() => {
                        this.clearAllBookCache()
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>屏蔽设置</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.clearAllBookCache()
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>{getChineseText('清除缓存')}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, {marginTop: 5}]}
                    onPress={() => {
                        this.clearAllBookCache()
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>账号安全</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.clearAllBookCache()
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>关于</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>
                {/*{this._changeReaderSexModal()}*/}
                {this._commonModal()}


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#fff',
        width: '100%'
    },
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 18,
        paddingVertical: 14,
        paddingRight: 18,
        // paddingHorizontal:18,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#EEE'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemLeftText: {
        // paddingLeft: 10,
        fontSize: 16
    },
    loginSuc: {
        // height: HEIGHT / 4,
        justifyContent: 'center',
        alignItems: 'center',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderTopColor: '#eee',
        // backgroundColor:'#fffffe'
    },
    imgContent: {
        width: WIDTH / 5,
        height: WIDTH / 5,
        borderRadius: WIDTH / 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40
    },
    skinModalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
        flex: 1
    },

    switch: {
        margin: -8
    },

    skinModalContent: {
        width: WIDTH / 4 * 3,
        backgroundColor: '#fff'
    },
    itemValue: {
        fontSize: 12,
        color: '#999999',
        paddingTop: 10
    },
});

export default My
