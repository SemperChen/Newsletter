/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight, View, TouchableOpacity} from "react-native";
import {color95, rgb246} from "../constants/constants";
import {SwipeListView} from "react-native-swipe-list-view";

class MyFeedbackPage extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            headerTitle: "我的反馈",
            headerStyle: {backgroundColor: '#fff', elevation: 0},
            headerTintColor: '#262626',
        }

    };
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
                        backgroundColor:rgb246,
                        paddingHorizontal:20
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
                    this.props.navigation.navigate("FeedbackDetail")
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: '#ddd',
                    paddingVertical:20,
                    paddingHorizontal:20,
                    marginBottom:5,
                    // borderRadius: 3,
                    backgroundColor:'#fff',

                }}>
                <View style={{flex:1}}>
                    <Text ellipsizeMode={'tail'} numberOfLines={2} style={{fontSize: 16}}>如何通过发文获得收益?</Text>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={{fontSize: 12,marginTop: 10}}>你好，获得收益需要首先注册成为开发者，注册方式详见下方?</Text>
                    <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                        <Text numberOfLines={2}
                              style={{fontSize: 12, marginTop: 10, color: color95}}>2019年11月25日</Text>
                        <Text numberOfLines={2}
                              style={{fontSize: 12, marginTop: 10, color: color95}}>已回复</Text>
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

export default MyFeedbackPage;