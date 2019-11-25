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

class PwdManagementPage extends React.Component {

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
                <View style={{
                    // width:WIDTH,
                    // borderWidth:1,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: '#ddd',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TextInput
                        autoFocus={true}
                        clearButtonMode="while-editing"
                        // autoFocus={true}
                        selectionColor={this.props.screenProps.appTheme.primaryColor}
                        style={{height: 40, borderColor: 'gray', flex: 1}}
                        placeholder={"新密码"}
                        returnKeyType="next"
                    />
                </View>

                <View style={{
                    // width:WIDTH,
                    // borderWidth:1,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: '#ddd',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                }}>
                    <TextInput
                        selectionColor={this.props.screenProps.appTheme.primaryColor}
                        keyboardType="number-pad"
                        clearButtonMode="while-editing"
                        style={{height: 40, borderColor: 'gray', flex: 1}}
                        placeholder={"确认密码"}
                        returnKeyType="done"
                    />
                </View>
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
                    <Text style={{color: '#fff'}}>提交</Text>
                </View>

            </View>

        )
    }
}



const styles = StyleSheet.create({});

export default PwdManagementPage;
