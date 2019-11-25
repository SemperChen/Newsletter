/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {color65, color95, colorC5, TAB_ICON_SIZE} from "../constants/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomIcon from "../commons/CustomIcon";
import {VerificationCode} from "./LoginPage";
import {HEIGHT} from "../utils/DimensionsUtil";

class FeedbackPage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#fff',
                padding: 50,
                paddingTop:30,
                // justifyContent: 'center',
                alignItems: 'center',
                flex:1
            }}>

                <TextInput
                    autoFocus={true}
                    selectionColor={this.props.screenProps.appTheme.primaryColor}
                    // keyboardType="number-pad"
                    clearButtonMode="while-editing"
                    contextMenuHidden={true}
                    multiline={true}
                    maxLength={100}
                    style={{
                        // height: 80,
                        height: 120,
                        width:'100%',
                        borderWidth: StyleSheet.hairlineWidth,
                        paddingVertical:0,
                        borderColor: '#ddd',
                    }}
                    placeholder={"请输入反馈内容"}
                    returnKeyType="done"
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    padding: 15,
                    width: '100%',
                    backgroundColor: this.props.screenProps.appTheme.primaryColor,
                    borderRadius: 30
                }}>
                    <Text style={{color: '#fff'}}>反馈</Text>
                </View>

                <Text
                    onPress={()=>{
                        this.props.navigation.navigate("MyFeedback")
                    }}
                    style={{color:this.props.screenProps.appTheme.primaryColor,fontSize:18,padding:20}}>我的反馈</Text>

            </View>

        )
    }
}



const styles = StyleSheet.create({});

export default FeedbackPage;
