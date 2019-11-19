/**
 * @author Semper
 */
import React from "react";
import {
    ActivityIndicator,
    Button,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import {BOOKMARK_HEIGHT, BOOKMARK_WIDTH, WIDTH} from "../../utils/DimensionsUtil";
import {connect} from "react-redux";
import {requestSearch} from "../../actions/search";
import ToastUtil from "../../utils/ToastUtil";
import {getOtherSearchBookInfo} from "../../utils/ParseHtmlUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {BookInfo} from "../../model/BookInfo";
import {ZSSQ_SEARCH} from "../../constants/api";
import {requestOtherSearch} from "../../actions/otherSearch";
import I18n from "../../i18n/i18n";
import {getChineseText, Simplified} from "../../utils/LanguageUtil";
import FastImage from "react-native-fast-image";

const _uniq = require("lodash/uniq");
class BookSources extends React.Component {

    static navigationOptions = ({screenProps}) => {
        return {
            headerTitle: '书源',
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
        }
    };

    searchBookName = '';
    bookInfo: BookInfo;

    constructor(props) {
        super(props);
        this.otherBookInfos = [];
        this.state = {res: '', searchBookName: ''}
    }

    componentWillMount(){


    }

    componentDidMount() {
        const params = this.props.navigation.state.params;
        this.changeBookSource = params.changeBookSource;
        if (globalData.globalBookNameParam) {
            this.searchBookName = globalData.globalBookNameParam;
            this._searchBook();
            globalData.globalBookNameParam = null;
        }
        if(globalData.currentSiteName){
            this.siteName = globalData.currentSiteName;
            globalData.currentSiteName = null
        }
    }

    setSearchBookName(searchBookName) {
        this.searchBookName = searchBookName
    }

    shouldComponentUpdate(nextProps) {
        return this.props.searchResult !== nextProps.searchResult ||
            this.props.baseSearchUrl !== nextProps.baseSearchUrl ||
            this.props.otherSearchResult !== nextProps.otherSearchResult ||
            this.props.baseOtherSearchUrl !== nextProps.baseOtherSearchUrl ||
            this.props.siteName !== nextProps.siteName

    }

    componentWillUpdate() {
    }

    componentWillUnmount() {
        // this.props.dispatch(quitSearchPage(this.mainSearchRes, this.mainUrl))
    }

    _searchBook = () => {
        try {
            if (this.searchBookName === undefined || this.searchBookName === '') {
                ToastUtil.showShort(I18n.t('pleaseInputText'));
            } else {
                // if (NovelAppConfig.isTraditional) {
                //     this.searchBookName = Simplified(this.searchBookName)
                // }
                this.searchBookName = Simplified(this.searchBookName);
                // console.log('this.searchBookName--',this.searchBookName,NovelAppConfig.isTraditional)
                this.props.dispatch(requestSearch(ZSSQ_SEARCH + this.searchBookName));
                this.otherBookInfos = [];
                this.props.dispatch(requestOtherSearch(this.searchBookName))
            }
        } catch (e) {
            console.warn('Search _searchBook', e.message)
        }
    };

    _navBookDetail = (bookId, siteName) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId,
            siteName: siteName
        })
    };

    _navToReader = (articleUrlTag, bookName, image, siteName, bookId, author) => {
        this.props.navigation.navigate('Read', {
            articleUrlTag: articleUrlTag,
            bookName: bookName,
            image: image,
            siteName: siteName,
            bookId: bookId,
            author:author
        })
    };

    navToReaderWithBookmark = (bookmark) => {
        this.props.navigation.navigate('Read', {bookmark: bookmark})
    };

    render() {

        try {
            const appTheme = this.props.screenProps.appTheme;
            // console.log(this.props.searchResult);
            if (this.props.otherSearchResult) {
                let result = getOtherSearchBookInfo(this.props.otherSearchResult,this.props.siteName)
                // this.otherBookInfo = getSearchBookInfoByParseHtml(this.props.otherSearchResult);
                for(let i = 0;i<result.length;i++){
                    if(result[i].title === this.searchBookName){
                        this.otherBookInfos.push(result[i])
                    }
                }
            }

            return (
                <ScrollView>
                    {this.otherBookInfos.length > 0
                        ?
                        this._renderOtherSearch(appTheme)
                        :
                        <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator
                                animating={true}
                                color={appTheme.primaryColor}
                                size="small"
                            />
                            <Text style={{color: appTheme.primaryColor}}>加载中，请稍等</Text>
                        </View>}
                </ScrollView>
            )
        } catch (e) {
            console.warn('Search render', e.message)
        }
    }

    formatText = (text) => {
        return getChineseText(text)
    };

    _renderOtherSearch = (appTheme) => {
        return (
            <View style={styles.otherSearchItem}>
                <Text style={{fontSize: 18,paddingHorizontal:20,paddingVertical:5}}>当前书源：{this.siteName}</Text>
                {this.otherBookInfos.map((item, index) => {
                    return (
                        <TouchableHighlight key={index}
                                            underlayColor="#fff"
                                            onPress={() => {
                                                this.changeBookSource(item.articleUrlTag, item.title, item.img, item.siteName,null,item.author);
                                                this.props.navigation.goBack(null)
                                            }}>
                            <View>
                                <View style={styles.itemContent}>
                                    <FastImage source={{uri: item.img}}
                                           style={styles.bookImage}/>
                                    <View style={styles.itemText}>
                                        <Text style={styles.bookTitle}>{getChineseText(item.title)}</Text>
                                        <View style={styles.bookAuthor}>
                                            <MaterialIcons name="account-circle" size={16}
                                                           style={styles.itemIcon}/>
                                            <Text>{getChineseText(item.author)}</Text>
                                        </View>
                                        <View>
                                            <Text
                                                numberOfLines={1}>{this.formatText('时间：'+item.date)}</Text>
                                        </View>
                                        <View>
                                            <Text
                                                numberOfLines={1}>{this.formatText('最新：'+item.lastChapter)}</Text>
                                        </View>
                                        <Text>{getChineseText('来源：')} <Text
                                            style={{color: 'cornflowerblue'}}>{getChineseText(item.siteName)}</Text></Text>
                                    </View>
                                </View>
                            </View>

                        </TouchableHighlight>
                    )
                })}
                {
                    this.searchBookName
                        ?
                        <View style={{margin: 10}}>
                            <Button
                                title="刷新"
                                color={appTheme.darkColor}
                                onPress={() => {
                                    this._searchBook()
                                }}
                            />
                        </View>
                        : null
                }
            </View>
        )
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
        paddingRight: 20
    },
    bookImage: {
        width: BOOKMARK_WIDTH,
        height: BOOKMARK_HEIGHT
    },
    bookInfo: {
        flexDirection: 'row',
        marginLeft: 18 * pr,
        marginTop: 18 * pr,
        marginBottom: 18 * pr
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    bookAuthor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bookStar: {
        color: '#f0ad4e',
        marginRight: 5
    },
    chapterCatalog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        paddingTop: 16,
        paddingBottom: 16
    },
    catalog: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    otherSearchItem: {
        marginTop: 1,
        backgroundColor: '#fff'
    },
    itemHeaderText: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
        color: '#bbb'
    },
    itemContent: {
        flexDirection: 'row',
        padding: 20,
    },
    itemText: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 12
    },
    itemIcon: {
        color: '#ddd',
        marginRight: 5
    }
});

function mapStateToProps(state) {
    const {otherSearchResult, baseOtherSearchUrl, siteName} = state.otherSearch;
    return {otherSearchResult, baseOtherSearchUrl, siteName}
}

export default connect(mapStateToProps)(BookSources)
