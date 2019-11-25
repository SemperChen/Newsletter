/**
 * @author Semper
 */
import React from "react";
import {StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {color95, rgb246} from "../constants/constants";
import {saveAppConfig} from "../utils/ConfigUtil";

class AccountBindingPage extends React.Component {

    static navigationOptions = {
        headerTitle: "社交账号绑定",
        headerStyle: {backgroundColor: '#fff', elevation: 0},
        headerTintColor: '#262626',
    }

    constructor() {
        super()
        this.state = {
            isNightMode: NovelAppConfig.readConfig.isNightMode,
            isShowPushN: NovelAppConfig.isShowPushN,
            skinModalVisible: false,
            readerSexModalVisible: false,
            commonVisible: false,
            isKeepAwake: NovelAppConfig.isKeepAwake
        }
    }

    render() {
        return (
            <View style={{backgroundColor: rgb246,flex:1}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.setState((prevState) => ({
                            isShowPushN: !prevState.isShowPushN
                        }))
                        NovelAppConfig.isShowPushN = !NovelAppConfig.isShowPushN;
                        // saveAppConfig(NovelAppConfig);
                    }}>
                    <View style={[styles.item]}>
                        <Text style={styles.itemLeftText}>微信 + 号码</Text>
                        <Switch
                            trackColor={{false: '#eee', true: this.props.screenProps.appTheme.primaryColor}}
                            thumbColor={'#fff'}
                            style={styles.switch}
                            value={this.state.isShowPushN}
                            onValueChange={(bool) => {
                                this.setState((prevState) => ({
                                    isShowPushN: !prevState.isShowPushN
                                }))
                                NovelAppConfig.isShowPushN = bool;
                                // saveAppConfig(NovelAppConfig);
                            }}
                        />
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.setState((prevState) => ({
                            isShowPushN: !prevState.isShowPushN
                        }))
                        NovelAppConfig.isShowPushN = !NovelAppConfig.isShowPushN;
                        // saveAppConfig(NovelAppConfig);
                    }}>
                    <View style={[styles.item]}>
                        <Text style={styles.itemLeftText}>微博 + 号码</Text>
                        <Switch
                            trackColor={{false: '#eee', true: this.props.screenProps.appTheme.primaryColor}}
                            thumbColor={'#fff'}
                            style={styles.switch}
                            value={this.state.isShowPushN}
                            onValueChange={(bool) => {
                                this.setState((prevState) => ({
                                    isShowPushN: !prevState.isShowPushN
                                }))
                                NovelAppConfig.isShowPushN = bool;
                                // saveAppConfig(NovelAppConfig);
                            }}
                        />
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.setState((prevState) => ({
                            isShowPushN: !prevState.isShowPushN
                        }))
                        NovelAppConfig.isShowPushN = !NovelAppConfig.isShowPushN;
                        // saveAppConfig(NovelAppConfig);
                    }}>
                    <View style={[styles.item]}>
                        <Text style={styles.itemLeftText}>QQ + 号码</Text>
                        <Switch
                            trackColor={{false: '#eee', true: this.props.screenProps.appTheme.primaryColor}}
                            thumbColor={'#fff'}
                            style={styles.switch}
                            value={this.state.isShowPushN}
                            onValueChange={(bool) => {
                                this.setState((prevState) => ({
                                    isShowPushN: !prevState.isShowPushN
                                }))
                                NovelAppConfig.isShowPushN = bool;
                                // saveAppConfig(NovelAppConfig);
                            }}
                        />
                    </View>

                </TouchableOpacity>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 18,
        paddingVertical: 14,
        paddingRight: 18,
        // paddingHorizontal:18,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#EEE'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemLeftText: {
        // paddingLeft: 10,
        fontSize: 16
    },
});

export default AccountBindingPage;
