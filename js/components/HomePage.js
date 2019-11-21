/**
 * @author Semper
 */
import React from "react";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScrollableTabView from "react-native-scrollable-tab-view";
import CommonListPage from "./CommonListPage";
import ScrollableTabBar from '../commons/ScrollableTabBar'
import I18n from "../i18n/i18n";
import {TAB_ICON_SIZE} from "../constants/constants";
class HomePage extends React.Component {
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
            <MaterialIcons name="home" size={TAB_ICON_SIZE}
                           style={focused ?
                               {color: screenProps.appTheme.darkColor} :
                               {color: screenProps.appTheme.lightColor}}/>
        ),
    });
    constructor() {
        super()
        StatusBar.setHidden(true)
    }

    navToArticlePage=()=>{
        this.props.navigation.navigate('Article')
    }

    render() {
        const appTheme = this.props.screenProps.appTheme;
        return (
            <View style={{flex:1}}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Search')
                    }}
                    style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        justifyContent: 'center',
                    }}>
                    <View style={[{
                        marginTop: 20,
                        marginHorizontal: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        backgroundColor: 'rgb(240,240,240)',
                        borderRadius: 5,
                        flexDirection:'row',
                        alignItems:'center',
                    }]}>
                        <MaterialIcons name="search" size={20}
                                       color={'#aaa'}/>
                        <Text style={{color:'#aaa',marginLeft:5}}>2019年十大经济学年度任务评选</Text>

                    </View>
                </TouchableOpacity>
                <ScrollableTabView
                    renderTabBar={() => {
                        return(
                            <ScrollableTabBar style={{borderBottomWidth: 0}}/>
                        )
                    }}
                    tabBarBackgroundColor={'#fff'}
                    tabBarActiveTextColor='#262626'
                    tabBarInactiveTextColor='#aaa'
                    tabBarUnderlineStyle={{
                        backgroundColor: 'gold',
                        height: 1
                    }}>
                    <CommonListPage navToArticlePage={this.navToArticlePage} tabLabel={'区块链'}/>
                    <CommonListPage navToArticlePage={this.navToArticlePage} tabLabel="NBA"/>
                    <CommonListPage navToArticlePage={this.navToArticlePage} tabLabel={'王者荣耀王者荣耀'}/>
                    <CommonListPage navToArticlePage={this.navToArticlePage} tabLabel={'北京'}/>
                    <CommonListPage navToArticlePage={this.navToArticlePage} tabLabel={'川菜'}/>
                    <CommonListPage tabLabel={'胡歌'}/>
                    <CommonListPage tabLabel={'Java'}/>
                    <CommonListPage tabLabel={'node'}/>
                    <CommonListPage tabLabel={'小说'}/>
                    <CommonListPage tabLabel={'斗破苍穹'}/>
                    <CommonListPage tabLabel={'变形金刚'}/>
                    <CommonListPage tabLabel={'香港'}/>
                </ScrollableTabView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
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
        backgroundColor:'#eee',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:HEIGHT/4,
        margin: 20
    }
});

export default HomePage;
