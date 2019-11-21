/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, View,TouchableOpacity} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import {footerHeight} from "../components/ArticlePage";

class FontSizeSetting extends React.Component {

    constructor() {
        super();
        this.settingBottom = footerHeight;
    }

    open() {
        this.settingRef.setNativeProps({
            style: {
                bottom: this.settingBottom,
                left: 0
            }
        });
    }

    close() {
        this.settingRef.setNativeProps({
            style: {
                bottom: this.settingBottom,
                left: WIDTH
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        const {styles} = this.props;
        return (
            <View
                ref={(ref) => {
                    this.settingRef = ref
                }}
                style={{
                    left: WIDTH,
                    bottom: this.settingBottom,
                    position: 'absolute',
                    width: WIDTH,
                    justifyContent: 'flex-end',
                    // borderBottomWidth: StyleSheet.hairlineWidth,
                    // borderBottomColor: 'rgba(0,0,0,.5)',
                }}>
                <TouchableOpacity
                    onPress={()=>{this.props.toggleSetting()}}
                >
                    <View
                        style={{
                            width: WIDTH,
                            height: HEIGHT,
                            // borderBottomWidth: StyleSheet.hairlineWidth,
                            // borderBottomColor: 'rgba(0,0,0,.5)',
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: '#fff',
                        marginBottom:-1,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderTopColor: '#EEE',
                    }}
                >
                    <Text style={{alignSelf: 'center', fontSize: 16, padding: 14}}>字体大小设置</Text>

                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'row'
                    }}
                >
                    <Text style={{fontSize: 16}}>小号</Text>
                    <Text style={{fontSize: 20}}>标准</Text>
                    <Text style={{fontSize: 24}}>大号</Text>
                    <Text style={{fontSize: 28}}>特大号</Text>
                </View>


            </View>
        )
    }
}

export default FontSizeSetting
