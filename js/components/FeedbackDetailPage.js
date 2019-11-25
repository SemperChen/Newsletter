/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {color65, color95, colorC5, rgb246, TAB_ICON_SIZE} from "../constants/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomIcon from "../commons/CustomIcon";
import {VerificationCode} from "./LoginPage";
import {HEIGHT} from "../utils/DimensionsUtil";

class FeedbackDetailPage extends React.Component {

    static navigationOptions = {
        headerTitle: "反馈",
        headerStyle: {backgroundColor: '#fff', elevation: 0},
        headerTintColor: '#262626',
    }

    constructor() {
        super();
    }

    render() {
        return (
            <View style={{
                backgroundColor: rgb246,
                padding: 30,
                // paddingTop:30,
                // justifyContent: 'center',
                // alignItems: 'center',
                flex:1
            }}>
                <Text ellipsizeMode={'tail'} style={{fontSize: 20,fontWeight: 'bold'}}>如何通过发文获得收益?</Text>
                <Text ellipsizeMode={'tail'} style={{fontSize: 18,marginTop: 14,color:color65,lineHeight:26}}>{"你好，获得收益需要首先注册成为开发者，注册方式详见下方?\n第一步：。。。\n第二步：。。。"}</Text>


            </View>

        )
    }
}



const styles = StyleSheet.create({});

export default FeedbackDetailPage;
