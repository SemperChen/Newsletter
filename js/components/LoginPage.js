/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {color65, color95, TAB_ICON_SIZE} from "../constants/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class LoginPage extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            isPhoneLogin: true
        }
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#fff',
                padding: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <MaterialIcons
                    onPress={()=>{
                        this.props.navigation.goBack()
                    }}
                    name="clear"
                    size={24}
                    color={color95}
                    style={{position:'absolute',top:0,left:0,padding:10}}
                />
                <FastImage
                    source={this.props.source}
                    style={{width: 80, height: 80, backgroundColor: '#eee', borderRadius: 40}}
                />
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
                        clearButtonMode="while-editing"
                        autoFocus={true}
                        style={{height: 40, borderColor: 'gray', flex: 1}}
                        placeholder={this.state.isPhoneLogin ? "手机号" : "账号"}
                        returnKeyType="next"
                    />
                    {this.state.isPhoneLogin
                        ?
                        <VerificationCode/>
                        :
                        null
                    }
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
                        clearButtonMode="while-editing"
                        style={{height: 40, borderColor: 'gray', flex: 1}}
                        placeholder={this.state.isPhoneLogin ? "验证码" : "密码"}
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
                    <Text style={{color: '#fff'}}>登录</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    width: '100%',
                }}>

                    <Text style={{color: color95}}>{!this.state.isPhoneLogin ? "忘记密码？" : null}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isPhoneLogin: !this.state.isPhoneLogin
                            })
                        }}
                    >
                        <Text style={{color: color95}}>{this.state.isPhoneLogin ? "账号密码登录" : "手机登录"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

class VerificationCode extends React.Component {

    constructor(){
        super();
        this.state={
            isSend:false,
            countdown:60
        }
    }

    render() {
        return <Text
            onPress={()=>{
                if(!this.timer){
                    this.setState({
                        isSend:true,
                        countdown:20,
                    })
                    this.timer = setInterval(()=>{

                        if(this.state.countdown===0){
                            clearInterval(this.timer);
                            this.timer=null
                        }else {
                            this.setState({
                                countdown:this.state.countdown-1
                            });
                        }
                    },1000)
                }
            }}
            style={{
                borderLeftWidth: StyleSheet.hairlineWidth,
                paddingLeft: 6,
                borderLeftColor: '#ddd',
                color: color65
            }}>{!this.state.isSend?"获取验证码":this.state.countdown===0?"重新发送":"重新发送（"+this.state.countdown+"）"}</Text>
    }
}

const styles = StyleSheet.create({});

export default LoginPage;
