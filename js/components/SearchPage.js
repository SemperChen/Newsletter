/**
 * @author Semper
 */
import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {rgb246} from "../constants/constants";
class SearchPage extends React.Component {



    constructor() {
        super()
    }

    navToArticlePage=()=>{
        this.props.navigation.navigate('Article')
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View
                    style={{
                        // marginTop: 20,
                        margin:20,
                        backgroundColor: '#fff',
                        height:42,
                        flexDirection:'row',
                        // alignItems:'center',
                        // justifyContent:'center'
                    }}>
                    <View style={[{
                        // marginTop: 20,
                        // marginHorizontal: 20,
                        // paddingVertical: 10,
                        // paddingHorizontal: 10,
                        backgroundColor: 'rgb(250,250,250)',
                        borderRadius: 5,
                        flexDirection:'row',
                        alignItems:'center',
                        // marginRight:10,
                        paddingHorizontal:5,
                        // marginHorizontal:20,
                        marginRight:10,
                        flex:1
                    }]}>
                        <MaterialIcons name="search" size={20}
                                       color={'#aaa'}/>
                        <TextInput
                            autoFocus={true}
                            returnKeyType="search"
                            style={{
                                // backgroundColor: 'rgb(240,240,240)',
                                // width:'80%'
                                flex:1
                            }}
                            defaultValue={"2019年十大经济学年度任务评选"}
                        />

                    </View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.goBack()
                        }}
                        style={{height:42,alignItems:'center',justifyContent:'center'}}
                    >
                        <Text style={{color:'#262626'}}>取消</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginHorizontal:15}}>
                    <Text>热门搜索</Text>
                    <View style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection:'row'
                    }}>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>区块链</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>NBA</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>香港</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>政治任务</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>王者荣耀</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>猪肉</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>周杰伦</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>JAVA</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>Node</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>斗破苍穹</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>北京</Text>
                        <Text style={{padding:5,backgroundColor:"#f9f9f9",borderRadius:5,margin:10,fontSize:12}}>抖音</Text>

                    </View>
                </View>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    loginSuc: {
        height: HEIGHT / 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
        backgroundColor:'#fffffe'
    },
    imgContent: {
        width: WIDTH / 5,
        height: WIDTH / 5,
        borderRadius: WIDTH / 8,
        backgroundColor:'#eee',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:HEIGHT/4,
        margin: 20
    }
});

export default SearchPage;
