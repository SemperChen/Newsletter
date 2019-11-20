/**
 * @author Semper
 */
import React from "react";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScrollableTabView from "react-native-scrollable-tab-view";
import CommonListPage from "./CommonListPage";
import HomePage1 from "./HomePage1";
import HomePage3 from "./HomePage3";
import HomePage2 from "./HomePage2";
import Bookstore from "./novel/Bookstore";
import FacebookTabBar from "../commons/FacebookTabBar";
import ScrollableTabBar from '../commons/ScrollableTabBar'
class HomePage extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        StatusBar.setHidden(true)
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
                        height: 0
                    }}>
                    <CommonListPage tabLabel={'TAB1'}/>
                    <CommonListPage tabLabel={'TAB2'}/>
                    <CommonListPage tabLabel={'TAB3'}/>
                    <CommonListPage tabLabel={'TAB4'}/>
                    <CommonListPage tabLabel={'TAB5'}/>
                    <CommonListPage tabLabel={'TAB6'}/>
                    <CommonListPage tabLabel={'TAB11'}/>
                    <CommonListPage tabLabel={'TAB21'}/>
                    <CommonListPage tabLabel={'TAB31'}/>
                    <CommonListPage tabLabel={'TAB41'}/>
                    <CommonListPage tabLabel={'TAB51'}/>
                    <CommonListPage tabLabel={'TAB61'}/>
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
