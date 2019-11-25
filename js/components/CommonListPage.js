/**
 * @author Semper
 */
import React from "react";
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import FastImage from "react-native-fast-image";
import {color65, color95} from "../constants/constants";

class CommonListPage extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        StatusBar.setHidden(false)
        StatusBar.setBackgroundColor('#fff');
        StatusBar.setBarStyle("dark-content", true)

    }

    render() {
        return (
            <FlatList
                contentContainerStyle={{marginTop: WIDTH / 24 / 2}}
                ref={(ref) => {
                    this._listRef = ref
                }}
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
            <TouchableOpacity
                onPress={()=>{
                    this.props.navToArticlePage()
                }}
                style={{
                    marginHorizontal: WIDTH / 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: WIDTH / 24 / 2,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: '#ddd'
                }}>
                <View style={{width: WIDTH / 8 * 5, paddingVertical: 10, marginRight: WIDTH / 24}}>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={{fontSize: 16}}>锐参考 |
                        一意孤行以涉港“法案”讹诈中国美国将会面临怎样的后果？</Text>
                    <Text numberOfLines={2}
                          style={{fontSize: 12, marginTop: 10, color: color95}}>一意孤行以涉港“法案”讹诈中国美国将会面临怎样的后果？</Text>
                </View>
                <FastImage
                    source={this.props.source}
                    style={{width: WIDTH / 4, height: WIDTH / 4/4*3, backgroundColor: '#eee'}}
                />
            </TouchableOpacity>
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
        backgroundColor: '#fffffe'
    },
    imgContent: {
        width: WIDTH / 5,
        height: WIDTH / 5,
        borderRadius: WIDTH / 8,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: HEIGHT / 4,
        margin: 20
    }
});

export default CommonListPage;
