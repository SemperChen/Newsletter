/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight, View, TouchableOpacity} from "react-native";
import {rgb246} from "../constants/constants";
import {SwipeListView} from "react-native-swipe-list-view";
import {WIDTH} from "../utils/DimensionsUtil";
import FastImage from "react-native-fast-image";

class MessagePage extends React.Component {
    static navigationOptions = {
        headerTitle: "我的消息",
        headerStyle: {backgroundColor: '#fff', elevation: 0},
        headerTintColor: '#262626',
    }
    constructor() {
        super()
    }

    render() {
        return (
            <>
                <SwipeListView
                    rightOpenValue={-75}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    contentContainerStyle={{
                        backgroundColor:rgb246
                    }}
                    ref={(ref) => {
                        this._listRef = ref
                    }}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                            <View style={{
                                width:75,
                                flex:1,
                                position:'absolute',
                                bottom:0,
                                top:0,
                                backgroundColor:'red',
                                justifyContent:'center',
                                alignItems:'center',
                                marginBottom:5
                            }}>
                                <Text style={{alignSelf: 'center',color:'#fff'}}>删除</Text>
                            </View>
                        </View>
                    )}

                    data={[
                        {key: 'Devin'},
                        {key: 'Dan'},
                        {key: 'Dominic'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => {
                        return item.key + index
                    }}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={{alignItems:'center',justifyContent:'center',borderTopColor:'#EEE',borderTopWidth:StyleSheet.hairlineWidth}}>
                    <Text style={{color:"rgb(95,95,95)",margin:10}}>左滑可删除</Text>
                    <TouchableOpacity
                        style={{
                            position:'absolute',
                            right:0,
                            backgroundColor:this.props.screenProps.appTheme.primaryColor,
                            paddingVertical:6,
                            paddingHorizontal:10,
                            marginRight:12,
                            borderRadius:12
                        }}
                    >
                        <Text style={{color:'#fff'}}>清空</Text>
                    </TouchableOpacity>
                </View>
            </>

        )
    }
    _renderItem = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor={"#fff"}
                onPress={()=>{
                }}
                style={{

                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: '#ddd',
                    paddingVertical:20,
                    paddingHorizontal:20,
                    marginBottom:5,
                    // padding:10,
                    // borderRadius: 3,
                    backgroundColor:'#fff'
                }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <FastImage
                        source={require('../../data/img/1.jpg')}
                        style={{width: 50, height: 50, backgroundColor: '#eee',borderRadius: 25}}
                    />
                    <View style={{flex:1,marginLeft:10}}>

                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={{fontSize: 18, color: '#535353'}}>Rachel Jayson</Text>
                        <Text numberOfLines={1}
                              style={{fontSize: 14, marginTop: 3, color: '#777777'}}>Can't wait to see you!</Text>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={{fontSize: 12,color:'#777777',position:'absolute',top:3,right:0}}>5:09 PM</Text>

                    </View>

                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    rowBack: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default MessagePage;
