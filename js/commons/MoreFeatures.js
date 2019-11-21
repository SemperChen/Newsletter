/**
 * @author Semper
 */
import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import FastImage from "react-native-fast-image";
import {rgb246} from "../constants/constants";

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
                        justifyContent:'center',
                        backgroundColor:rgb246,
                        display: 'flex',
                        flexWrap: 'wrap',
                        paddingVertical:itemWidth/6
                    },{borderBottomWidth:1,borderBottomColor:'#eee'}]}
                >
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>发送给朋友</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>新浪微博</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>生活圈</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>微信好友</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>QQ</Text>
                    </View>

                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:rgb246,
                        display: 'flex',
                        flexWrap: 'wrap',
                        paddingVertical:itemWidth/6
                    }}
                >

                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>刷新</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>复制链接</Text>
                    </View>
                    <View
                        style={styles.itemContainer}>
                        <FastImage
                            source={this.props.source}
                            style={styles.itemImg}
                        />
                        <Text style={styles.itemText}>更多</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width:WIDTH,
                        height:48,
                        backgroundColor:'#fff',
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
        justifyContent:'center'
    },
    itemImg:{
        width: itemWidth,
        height: itemWidth,
        backgroundColor: '#fff',
    },
    itemText:{
        fontSize:10,
        color:'#aaa',
        marginTop:5
    }
});

export default MoreFeatures
