/**
 * @author Semper
 */
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CACHE_DIR_PATH, READER_SEX, TAB_ICON_SIZE} from "../../constants/constants";
import {
    DeviceEventEmitter,
    Linking,
    Modal, ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import I18n from "../../i18n/i18n";
import {getChineseText} from "../../utils/LanguageUtil";
import {HEIGHT, WIDTH} from "../../utils/DimensionsUtil";
import {saveAppConfig} from "../../utils/ConfigUtil";
import RNFS from "react-native-fs";
import ToastUtil from "../../utils/ToastUtil";

class Explore extends React.Component {

    constructor(){
        super();
        this.state={
            isNightMode:NovelAppConfig.readConfig.isNightMode,
            skinModalVisible: false,
            readerSexModalVisible: false,
            isKeepAwake: NovelAppConfig.isKeepAwake
        }
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
                    <View style={styles.skinModalContainer}>
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

                    </View>
                </Modal>

            </View>
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

    clearAllBookCache = () => {
        try {
            RNFS.unlink(CACHE_DIR_PATH);
            ToastUtil.showShort(I18n.t('clearBookCacheSuccess'))
        } catch (e) {
            console.warn('SettingPage clearAllBookCache', e.message)
        }

    };

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
                <MaterialIcons name="explore" size={TAB_ICON_SIZE}
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
                <StatusBar
                    animated={true}
                    backgroundColor={appTheme.darkColor}
                    barStyle="light-content"
                />

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=>{
                        this.props.navigation.navigate('User')
                    }}
                    style={[styles.loginSuc,{backgroundColor:appTheme.primaryColor}]}>
                    <View style={[styles.imgContent,{backgroundColor:'#fff'}]}>
                        <Icon
                            name='md-person'
                            size={40}
                            color={appTheme.primaryColor}
                        />
                    </View>
                    <Text style={{color:'#fff'}}>{NovelAppConfig.user&&NovelAppConfig.user.username?NovelAppConfig.user.username:'游客'}</Text>
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
                    onPress={() => {
                        this.setState((prevState)=>({
                            isNightMode:!prevState.isNightMode
                        }))
                        NovelAppConfig.readConfig.isNightMode = !NovelAppConfig.readConfig.isNightMode;
                        saveAppConfig(NovelAppConfig);

                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <MaterialIcons name="brightness-2" size={16}
                                           color={appTheme.primaryColor}/>
                            <Text style={styles.itemLeftText}>夜间模式</Text>
                        </View>

                        <Switch
                            value={this.state.isNightMode}
                            onValueChange={(bool) => {
                                this.setState((prevState)=>({
                                    isNightMode:!prevState.isNightMode
                                }))
                                NovelAppConfig.readConfig.isNightMode = bool;
                                saveAppConfig(NovelAppConfig);
                            }}
                        />
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        NovelAppConfig.isKeepAwake = !this.state.isKeepAwake;
                        saveAppConfig(NovelAppConfig);
                        this.setState((prevState) => ({
                            isKeepAwake: !prevState.isKeepAwake
                        }));
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <MaterialIcons name="brightness-7" size={16}
                                           color={appTheme.primaryColor}/>
                            <Text style={styles.itemLeftText}>屏幕常亮</Text>
                        </View>

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
                    style={{}}
                    onPress={() => {
                        this.props.navigation.navigate('Rankings')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Icon
                                name='ios-stats'
                                size={20}
                                color={appTheme.primaryColor}
                                // onPress={this._search.bind(this)}
                            />
                            <Text style={styles.itemLeftText}>{I18n.t('rankings')}</Text>
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
                    style={{
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: '#eee',}}
                    onPress={() => {
                        this.setReaderSexModalVisible(true)
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <MaterialIcons name="apps" size={16}
                                           color={appTheme.primaryColor}/>
                            <Text style={styles.itemLeftText}>{I18n.t('readerSex')}</Text>
                        </View>

                        <Text style={styles.itemValue}>{NovelAppConfig.readerSex}</Text>
                    </View>

                </TouchableOpacity>


                <TouchableOpacity
                    style={{
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: '#eee',
                    }}
                    onPress={() => {
                        this.clearAllBookCache()
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <MaterialIcons name="restore" size={16}
                                           color={appTheme.primaryColor}/>
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
                {this._changeReaderSexModal()}

                {/*<TouchableOpacity
                    onPress={() => {
                        try {
                            Linking.openURL('https://github.com/SemperChen/tianxiashuge/blob/master/README.md')
                                .catch(err => console.error('An error occurred', err));
                        } catch (e) {
                            console.log('Explore render func Linking', e.message)
                        }
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Icon
                                name='logo-github'
                                size={20}
                                color={appTheme.primaryColor}
                            />
                            <Text style={styles.itemLeftText}>{getChineseText('更多详情')}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                        />
                    </View>
                </TouchableOpacity>*/}
                {
                    NovelAppConfig.isShowAd&&NovelAppConfig.isShowVideoAd
                        ?
                        <TouchableOpacity
                            style={{marginTop: 10}}
                            onPress={() => {
                                this.props.navigation.navigate('VideoAd')
                            }}>
                            <View style={styles.item}>
                                <View style={styles.itemLeft}>
                                    <Icon
                                        name='ios-remove-circle'
                                        size={20}
                                        color={appTheme.primaryColor}
                                    />
                                    <Text style={styles.itemLeftText}>{getChineseText('观看视频暂停广告')}</Text>
                                </View>
                                <Icon
                                    name='ios-arrow-forward'
                                    size={20}
                                    color='#ddd'
                                />
                            </View>
                        </TouchableOpacity>
                        :null
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor:'#EEE'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemLeftText: {
        paddingLeft: 10,
        fontSize: 16
    },
    loginSuc: {
        height: HEIGHT / 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
        backgroundColor:'#fffffe'
    },
    imgContent: {
        width: WIDTH / 5,
        height: WIDTH / 5,
        borderRadius: WIDTH / 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    skinModalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
        flex: 1
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

export default Explore
