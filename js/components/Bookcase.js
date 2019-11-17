/**
 * @author Semper
 */
import React from 'react';
import {Alert, ScrollView, StatusBar, StyleSheet, Text, View, Platform, ToastAndroid, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BookmarkComponent from "../commons/BookmarkComponent";
import {requestBookmarks} from "../actions/bookmarks";
import {WIDTH} from "../utils/DimensionsUtil";
import {CACHE_DIR_PATH, TAB_ICON_SIZE} from "../constants/constants";
import {removeBookmark, removeCatalog, sortBy} from "../utils/BookmarkUtil";
import I18n from '../i18n/i18n';
import RNFS from "react-native-fs";
import ToastUtil from "../utils/ToastUtil";
import codePush from "react-native-code-push";
import {saveAppConfig} from "../utils/ConfigUtil";
import FastImage from "react-native-fast-image";

class Bookcase extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarLabel: ({focused}) => (
            <Text style={[{
                color: screenProps.appTheme.darkColor,
                fontSize: 12,
                marginBottom: 5
            }, focused ?
                {color: screenProps.appTheme.darkColor} :
                {color: screenProps.appTheme.lightColor}]}>{I18n.t('bookcase')}</Text>
        ),
        tabBarIcon: ({focused}) => (
            <MaterialIcons name="book" size={TAB_ICON_SIZE}
                           style={focused ?
                               {color: screenProps.appTheme.darkColor} :
                               {color: screenProps.appTheme.lightColor}}/>
        ),
    });

    initAd = () => {
        if (Platform.OS === 'ios') {
            this.bannerId = 'ca-app-pub-4533308396777454/9198383774';
            /*try{
                if(NovelAppConfig.googleAdIds){
                    let bannerIdIOS = NovelAppConfig.googleAdIds.ios.bannerIdIOS;
                    if(bannerIdIOS&&this.checkAdIdFormat(bannerIdIOS)){
                        this.bannerId = bannerIdIOS;
                    }
                }
            }catch (e){
                console.warn('Bookcase initAd func error 1',e.message)
            }*/
        } else {
            this.bannerId = "ca-app-pub-4533308396777454/8755170575";
            /*try{
                if(NovelAppConfig.googleAdIds){

                    let bannerId = NovelAppConfig.googleAdIds.android.bannerId;
                    if(bannerId&&this.checkAdIdFormat(bannerId)){
                        this.bannerId = bannerId;
                    }
                }
            }catch (e){
                console.warn('Bookcase initAd func error 2',e.message)
            }*/
        }
    };

    constructor() {
        super();
        this.initAd()
    }

    /**
     * 清除书籍缓存
     * @param articleTag
     * @param siteName
     * @param bookName
     */
    clearBookCache = (articleTag, siteName, bookName) => {
        try {
            removeCatalog(articleTag);
            RNFS.unlink(CACHE_DIR_PATH + siteName + '/' + bookName);
        } catch (e) {
            console.warn('Bookcase clearBookCache', e.message)
        }

    };

    componentDidMount() {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        }
        this.props._onRefresh();
        // codePush.sync()
        //极光推送，发送本地推送通知
        // JPushModule.initPush();

        /*if (NovelAppConfig.isFirstShow) {
            JPushModule.sendLocalNotification({
                buildId: 1,
                id: 1,
                title: '天下书阁',
                content: '欢迎使用天下书阁小说应用',
                extra: {
                    appName: '天下书阁',
                    uri: ''
                },
                fireTime: 2000
            });

        }*/
        if (!__DEV__) {
            codePush.sync(
                {
                    installMode: codePush.InstallMode.ON_NEXT_RESTART, updateDialog: {
                        appendReleaseDescription: true,
                        descriptionPrefix: '',
                        title: '检测到新版本',
                        mandatoryUpdateMessage: '',
                        mandatoryContinueButtonLabel: '更新'
                    },
                },
                this.codePushStatusDidChange.bind(this),
                this.codePushDownloadDidProgress.bind(this)
            );
        }

        NovelAppConfig.isFirstShow = false;
        saveAppConfig(NovelAppConfig)

    }

    codePushStatusDidChange(status) {

        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                // ToastAndroid.show('正在检查更新', ToastAndroid.SHORT);
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                ToastAndroid.show('正在下载更新', ToastAndroid.SHORT);
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                // ToastAndroid.show('正在安装更新中', ToastAndroid.SHORT);
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                ToastUtil.showShort('更新完成！');
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        // console.warn(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }

    /**
     * 导航到阅读器页面
     * @param bookmark
     */
    navToReader = (bookmark) => {
        this.props.navigation.navigate('Read', {bookmark: bookmark})
    };

    _removeAndReLoadBookmark = async (key, id) => {
        await removeBookmark(key, id);

    };

    /**
     * 长按弹出是否该书签
     * @param tag
     * @param bookName
     * @param siteName
     */
    showIsDeleteBookmark = (tag, bookName, siteName) => {
        Alert.alert(
            I18n.t('reminder'),
            I18n.t('isDel') + '《' + bookName + '》？',
            [
                {text: I18n.t('cancel'), style: 'cancel'},
                {
                    text: I18n.t('del'), onPress: () => {
                        this._removeAndReLoadBookmark('bookmark', tag).then(this.props._onRefresh());
                        this.clearBookCache(tag, siteName, bookName)

                    }
                },
            ],
        )
    };

    render() {
        let sortBookmarks = [];
        if (this.props.bookmarks) {
            sortBookmarks = this.props.bookmarks.sort(sortBy('lastReadTime'));
        }
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView
                    // contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                >
                    <StatusBar
                        animated={true}
                        backgroundColor={this.props.screenProps.appTheme.darkColor}
                        barStyle="light-content"
                    />
                    {sortBookmarks && sortBookmarks.length !== 0 ?
                        <View style={{
                            width: '100%',
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                            backgroundColor: this.props.screenProps.appTheme.primaryColor,
                            paddingHorizontal: 20,
                            paddingTop: 40,
                        }}>
                            <View style={styles.bookImage}>
                                <FastImage source={{uri: sortBookmarks[0].image}}
                                       style={[styles.bookImage, {
                                           position: 'absolute',
                                           bottom: -40
                                       }]}/>
                            </View>

                            <View style={[{
                                justifyContent: 'space-between',
                                height: imgHeight - 40,
                                marginLeft: 20,
                                paddingVertical: 5
                            }]}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                    color: '#eee'
                                }}>{sortBookmarks[0].bookName}</Text>
                                <Text style={{marginBottom: 10, color: '#eee'}}>作者：{sortBookmarks[0].author}</Text>
                                <Text style={{marginBottom: 10, color: '#eee'}}>进度：{sortBookmarks[0].chapterName?sortBookmarks[0].chapterName:'无'}</Text>
                            </View>
                        </View> : null}

                    {/*{*/}
                        {/*NovelAppConfig.isShowAd ?*/}
                            {/*<View style={{width: '100%', alignItems: 'center'}}>*/}
                                {/*<AdMobBanner*/}
                                    {/*adSize="banner"*/}
                                    {/*adUnitID={this.bannerId}*/}
                                {/*/>*/}
                            {/*</View> : null*/}
                    {/*}*/}
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Search')
                        }}
                        style={[{
                        marginTop: 40,
                        marginHorizontal: WIDTH / 12,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        backgroundColor: 'rgb(240,240,240)',
                        borderRadius: 5
                    },sortBookmarks.length !== 0?{marginTop: 80,}:{}]}>
                        <MaterialIcons name="search" size={24} color={this.props.screenProps.appTheme.primaryColor}/>
                    </TouchableOpacity>
                    <View style={[{padding: WIDTH / 24}, styles.container]}>

                        {sortBookmarks && sortBookmarks.length !== 0 ? sortBookmarks.map((bookmark) => {
                            return <BookmarkComponent
                                key={bookmark.tag}
                                bookmark={bookmark}
                                navToReader={this.navToReader}
                                showIsDeleteBookmark={this.showIsDeleteBookmark}
                                clearBookCache={this.clearBookCache}
                            />
                        }) : <Text style={styles.notBookmark}>{I18n.t('notSaveBookmark')}</Text>}
                    </View>
                    {/*<MeasureText/>*/}


                </ScrollView>
            </View>
        )
    }

    /*
        _onRefresh = () => {
            const {dispatch} = this.props;
            dispatch(requestBookmarks(BOOKMARKS_URL))
        }*/
}

const imgWidth = WIDTH / 9 * 2.5;
const imgHeight = imgWidth / 3 * 4;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        // padding: WIDTH / 24
    },
    notBookmark: {
        paddingTop: WIDTH / 24,
        paddingLeft: WIDTH / 24
    },
    bookImage: {
        width: imgWidth,
        height: imgHeight,
        borderRadius: 10
    },
});

function mapStateToProps(state) {
    const {items: bookmarks, isRefreshing} = state.bookmarks || {items: [], isRefreshing: false};
    return {bookmarks, isRefreshing}
}

function mapDispatchToProps(dispatch) {
    return {
        _onRefresh: () => dispatch(requestBookmarks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookcase)
