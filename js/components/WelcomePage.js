import React from 'react';
import {Text, View, Button, ToastAndroid} from 'react-native';
import CodePush from "react-native-code-push";

class WelcomePage extends React.Component {

    componentDidMount() {
        // this.syncImmediate()
    }

    syncImmediate() {

        CodePush.sync( {

                //安装模式

                //ON_NEXT_RESUME 下次恢复到前台时

                //ON_NEXT_RESTART 下一次重启时

                //IMMEDIATE 马上更新

                installMode : CodePush.InstallMode.IMMEDIATE ,

                //对话框

                updateDialog : {

                    //是否显示更新描述

                    appendReleaseDescription : true ,

                    //更新描述的前缀。 默认为"Description"

                    descriptionPrefix : "更新内容：" ,

                    //强制更新按钮文字，默认为continue

                    mandatoryContinueButtonLabel : "立即更新" ,

                    //强制更新时的信息. 默认为"An update is available that must be installed."

                    mandatoryUpdateMessage : "必须更新后才能使用" ,

                    //非强制更新时，按钮文字,默认为"ignore"

                    optionalIgnoreButtonLabel : '稍后' ,

                    //非强制更新时，确认按钮文字. 默认为"Install"

                    optionalInstallButtonLabel : '后台更新' ,

                    //非强制更新时，检查到更新的消息文本

                    optionalUpdateMessage : '有新版本了，是否更新？' ,

                    //Alert窗口的标题

                    title : '更新提示'

                } ,

            } ,
            this.codePushStatusDidChange.bind(this)
        );

    }

    codePushStatusDidChange(status) {

        switch (status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                // ToastAndroid.show('正在检查更新', ToastAndroid.SHORT);
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                ToastAndroid.show('正在下载更新', ToastAndroid.SHORT);
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                // ToastAndroid.show('正在安装更新中', ToastAndroid.SHORT);
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                break;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>WelcomePage1112322</Text>
                <Button
                    onPress={()=>{
                        this.props.navigation.navigate("Home")
                    }}
                    title={"导航到主页"}/>
            </View>
        );
    }
}

export default WelcomePage;
