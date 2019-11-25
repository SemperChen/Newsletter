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

class SafetyPage extends React.Component {

    static navigationOptions = {
        headerTitle: "安全验证",
        headerStyle: {backgroundColor: '#fff', elevation: 0},
        headerTintColor: '#262626',
    }

    constructor() {
        super();
    }

    componentDidMount(): void {
        this.vCodeRef.startCountDown()
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
                        editable={false}
                        clearButtonMode="while-editing"
                        // autoFocus={true}
                        selectionColor={this.props.screenProps.appTheme.primaryColor}
                        style={{height: 40, borderColor: 'gray', flex: 1}}
                        placeholder={"13500000000"}
                        returnKeyType="next"
                    />
                    <VerificationCode
                        ref={ref=>this.vCodeRef = ref}
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
                        autoFocus={true}
                        selectionColor={this.props.screenProps.appTheme.primaryColor}
                        keyboardType="number-pad"
                        clearButtonMode="while-editing"
                        style={{height: 40, borderColor: 'gray', flex: 1}}
                        placeholder={"验证码"}
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
                    <Text style={{color: '#fff'}}>验证</Text>
                </View>

                <Text style={{color:color95,marginTop:30,}}>为保障您的账户安全请先验证手机号</Text>

            </View>

        )
    }
}



const styles = StyleSheet.create({});

export default SafetyPage;
