/**
 * @author Semper
 */
import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import FastImage from "react-native-fast-image";
import {rgb246} from "../constants/constants";
import CustomIcon from "./CustomIcon";

const itemWidth = WIDTH/7
class MoreFeatures extends React.Component {

    constructor() {
        super();
        this.moreBottom = 0;
    }

    open() {
        this.moreRef.setNativeProps({
            style: {
                bottom: this.moreBottom,
                left: 0
            }
        });
    }

    close() {
        this.moreRef.setNativeProps({
            style: {
                bottom: this.moreBottom,
                left: WIDTH
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        return (
            <View
                ref={(ref) => {
                    this.moreRef = ref
                }}
                style={{
                    left: WIDTH,
                    bottom: this.moreBottom,
                    position: 'absolute',
                    width: WIDTH,
                    justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                    onPress={()=>{this.props.toggleMoreFeatures()}}
                >
                    <View
                        style={{
                            width: WIDTH,
                            height: HEIGHT
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={[{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        backgroundColor:"#fff",
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding:itemWidth/6
                    },{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:'#eee'}]}
                >
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={require("../../data/wechat/weixin.png")}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>发送给朋友</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={require("../../data/wechat/circle.png")}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>朋友圈</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={require("../../data/qq/qq.png")}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>QQ</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={require("../../data/qq/zone.png")}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>QQ空间</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={require("../../data/weibo.png")}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>微博</Text>
                    </View>

                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={require("../../data/dingding.png")}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>钉钉</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={require("../../data/zhifubao.png")}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>支付宝</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        backgroundColor:"#fff",
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding:itemWidth/6
                    }}
                >

                    <View
                        style={styles.itemContainer}>
                        <CustomIcon
                            style={{
                                backgroundColor:"#90EE90",
                            }}
                            onPress={()=>{
                            }}
                            name="refresh"
                            size={20}
                            color={"#fff"}
                        />
                        <Text style={styles.itemText}>刷新</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <CustomIcon
                            style={{
                                backgroundColor:"#63B8FF",
                            }}
                            onPress={()=>{
                            }}
                            name="link"
                            size={20}
                            color={"#fff"}
                        />
                        <Text style={styles.itemText}>复制链接</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <CustomIcon
                            style={{
                                backgroundColor:"#FFD700",
                            }}
                            onPress={()=>{
                            }}
                            name="ellipsis-h"
                            size={20}
                            color={"#fff"}
                        />
                        <Text style={styles.itemText}>更多</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width:WIDTH,
                        height:48,
                        backgroundColor:'#fdfdfd',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    onPress={()=>{this.props.toggleMoreFeatures()}}
                >
                    <Text>取消</Text>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    mContainer:{

    },
    itemContainer:{
        margin:itemWidth/6,
        alignItems:'center',
        justifyContent:'center',
        width: itemWidth,
        height: itemWidth,
        // backgroundColor:'#ddd'
    },
    itemImg:{
        width: 35,
        height: 35,
        backgroundColor: '#fff',
    },
    itemText:{
        fontSize:10,
        color:'#aaa',
        marginTop:5
    }
});

export default MoreFeatures
