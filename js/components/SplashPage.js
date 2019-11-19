import React from "react";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";
import {HEIGHT} from "../utils/DimensionsUtil";
import MeasureText from "../commons/novel/MeasureText";
import FastImage from "react-native-fast-image";
class SplashPage extends React.Component{

    static navigationOptions = {
        header: null
    };

    componentWillMount(){
    }

    componentDidMount(){
        if(NovelAppConfig.textHeightData.length!==0){
            this.nav()
        }

    }

    nav = () => {
        if (NovelAppConfig.isFirstOpen) {
            NovelAppConfig.isFirstOpen = false;
            // saveAppConfig(NovelAppConfig);
            this.timer = setTimeout(() => {
                this.props.navigation.navigate('SelectSex')
            }, 1000);
        } else {
            this.timer = setTimeout(()=>{
                // if(NovelAppConfig.isShowAd){
                //     // this.showInterstitial()
                // }
                this._navToMain()
            },1000)
        }
    }

    componentWillUnmount() {
        try{
            StatusBar.setHidden(false);
            this.timer && clearTimeout(this.timer)
        }catch(e){
            console.warn('SplashPage componentWillMount func',e.message)
        }

    }

    _navToMain = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'App'})
            ]
        }))
    };


    render(){
        return (
            <View style={styles.container}>
                {NovelAppConfig.textHeightData.length===0?
                    <MeasureText
                        nav={this.nav}
                    />:null}
                <FastImage
                    style={{width: '100%',resizeMode: 'contain'}}
                    source={require('../../data/splash.png')}/>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor:'#FFF',
        flex: 1
    },
    appName:{
        fontWeight: 'bold',
        fontSize: 28 ,
        position:'absolute',
        top:HEIGHT / 3,
        backgroundColor:'transparent'
    },
    version:{
        fontSize: 14,
        position:'absolute',
        bottom:50,
        backgroundColor:'transparent'
    }
});
export default SplashPage
