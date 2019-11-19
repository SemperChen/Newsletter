/**
 * @author Semper
 */
import React from 'react';
import {
    DeviceEventEmitter, Platform, RefreshControl, ScrollView, StatusBar, Text, TouchableOpacity,
    View
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {requestRankings} from "../../actions/rankings";
import {RANKING_BASE_URL, RANKINGS_URL, SPREAD_URL} from "../../constants/api";
import HotRecommend from "../../commons/novel/HotRecommend";
import BestEndBooks from "../../commons/novel/BestEndBooks";
import EditorRecommend from "../../commons/novel/EditorRecommend";
import ImageCarousel from "../../commons/novel/ImageCarousel";
import {requestSpread} from "../../actions/spread";
import {Rankings} from "../../model/Rankings";
import {requestHotRec} from "../../actions/hotRec";
import {requestBestEnd} from "../../actions/bestEnd";
import {requestEditorRec} from "../../actions/editorRec";
import {READER_SEX, RefreshControlColor, TAB_ICON_SIZE} from "../../constants/constants";
import GuessYouLike from "../../commons/novel/GuessYouLike";
import {requestGuessYouLike} from "../../actions/guessYouLike";
import HotSearch from "../../commons/novel/HotSearch";
import {requestHotSearch} from "../../actions/hotSearch";
import I18n from "../../i18n/i18n";

class Bookstore extends React.Component {

    rankings: Rankings;
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            tabBarLabel: ({focused}) => (
                <Text style={[{
                    fontSize: 12,
                    marginBottom: 5
                }, focused ?
                    {color: screenProps.appTheme.darkColor} :
                    {color: screenProps.appTheme.lightColor}]}>{I18n.t('bookStore')}</Text>

            ),
            tabBarIcon: ({focused}) => (
                <MaterialIcons name="store" size={TAB_ICON_SIZE}
                               style={focused ?
                                   {color: screenProps.appTheme.darkColor} :
                                   {color: screenProps.appTheme.lightColor}}/>
            ),
        }
    };

    constructor() {
        super();
        this.isFirstOpen = true
    }

    componentDidMount() {
        if(Platform.OS === 'android'){
            StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        }
        this._initData();
        this.subscription = DeviceEventEmitter.addListener('ChangeReaderSex', () => {
            this._fetchAllData()
        })
    }

    _initData = () => {
        this.props.dispatch(requestRankings(RANKINGS_URL));
        this.props.dispatch(requestSpread(SPREAD_URL));
    };

    componentWillUnmount() {
        // 移除
        this.subscription.remove();
    }

    navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    fetchHotRecommend = (id) => {
        this.props.dispatch(requestHotRec(RANKING_BASE_URL + id))
    };

    fetchBestEndBook = (id) => {
        this.props.dispatch(requestBestEnd(RANKING_BASE_URL + id))
    };

    fetchEditorRecommend = (id) => {
        this.props.dispatch(requestEditorRec(RANKING_BASE_URL + id))
    };

    fetchGuessYouLike = (id) => {
        this.props.dispatch(requestGuessYouLike(RANKING_BASE_URL + id))
    };

    fetchHotSearch = (id) => {
        this.props.dispatch(requestHotSearch(RANKING_BASE_URL + id))
    };

    _fetchAllData = () => {
        if (this.props.rankingsData) {
            this.rankings = this.props.rankingsData;
            if (NovelAppConfig.readerSex === READER_SEX.FEMALE) {
                this.fetchHotRecommend(this.rankings.female[10]._id);
                this.fetchBestEndBook(this.rankings.female[6]._id);
                this.fetchEditorRecommend(this.rankings.female[10]._id);
                this.fetchGuessYouLike(this.rankings.female[0]._id);
                this.fetchHotSearch(this.rankings.female[4]._id)
            } else {
                this.fetchHotRecommend(this.rankings.male[11]._id);
                this.fetchBestEndBook(this.rankings.male[5]._id);
                this.fetchEditorRecommend(this.rankings.male[11]._id);
                this.fetchGuessYouLike(this.rankings.male[0]._id);
                this.fetchHotSearch(this.rankings.male[4]._id)
            }
        }
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        if (this.props.rankingsData && this.isFirstOpen) {
            this.isFirstOpen = false;
            this._fetchAllData();
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._initData}
                            tintColor={RefreshControlColor.tintColor}
                            title="同步中..."
                            titleColor={RefreshControlColor.titleColor}
                            colors={RefreshControlColor.colors}
                            progressBackgroundColor={RefreshControlColor.progressBackgroundColor}
                        />
                    }
                >
                    <ImageCarousel appTheme={appTheme} navToDetail={this.navToDetail}/>
                    <HotRecommend appTheme={appTheme} navToDetail={this.navToDetail}/>
                    <BestEndBooks appTheme={appTheme} navToDetail={this.navToDetail}/>
                    <EditorRecommend appTheme={appTheme} navToDetail={this.navToDetail}/>
                    <GuessYouLike appTheme={appTheme} navToDetail={this.navToDetail}/>
                    <HotSearch appTheme={appTheme} navToDetail={this.navToDetail}/>
                </ScrollView>
            </View>

        )
    }

}

function mapStateToProps(state) {
    const {rankingsData, isFetchingRankings} = state.rankings;
    return {rankingsData, isFetchingRankings}
}

export default connect(mapStateToProps)(Bookstore)
