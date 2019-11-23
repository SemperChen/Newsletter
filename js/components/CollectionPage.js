/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {rgb246} from "../constants/constants";
import {SwipeListView} from "react-native-swipe-list-view";

class CollectionPage extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            headerTitle: "收藏",
            headerStyle: {backgroundColor: '#fff', elevation: 0},
            headerTintColor: '#262626',
            headerRight: () => {
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,padding:20}}>清空</Text>
                    </View>
                )
            }
        }

    };
    constructor() {
        super()
    }

    render() {
        return (
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

        )
    }
    _renderItem = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor={"#fff"}
                onPress={()=>{
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
                    backgroundColor:'#fff'
                }}>
                <View>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={{fontSize: 18}}>锐参考 |
                        一意孤行以涉港“法案”讹诈中国美国将会面临怎样的后果？</Text>
                    <Text numberOfLines={2}
                          style={{fontSize: 14, marginTop: 10, color: '#676767'}}>一意孤行以涉港“法案”讹诈中国美国将会面临怎样的后果？</Text>
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

export default CollectionPage;
