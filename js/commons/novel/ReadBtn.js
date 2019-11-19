/**
 * @author Semper
 */
import React from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class ReadBtn extends React.Component {
    constructor() {
        super();
        this.isJoinBookshelf=false
    }

    updateData = (bool=false) => {
        this.isJoinBookshelf = bool;
        this.forceUpdate()
    };

    render() {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                padding: 8,
                justifyContent: 'space-around',
                backgroundColor: '#fff',
                borderTopWidth: StyleSheet.hairlineWidth,
                borderColor:'#ddd'
            }}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%'
                    }}
                >
                    {
                            this.isJoinBookshelf ?
                                <Text style={{
                                    color: this.props.primaryColor,
                                    opacity: 0.5,
                                }}>已加书架</Text> :
                                <Text
                                    onPress={()=>{
                                        this.props.saveBookmark();
                                        this.forceUpdate()
                                    }}
                                    style={{
                                    color: this.props.primaryColor,
                                }}>加入书架</Text>
                        }

                </View>

                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        backgroundColor: this.props.primaryColor,
                        borderRadius: 10,
                        justifyContent: 'center',
                        width: '50%',
                        padding: 10
                    }}
                    onPress={() => {
                        this.props.navToReader()
                    }}
                >
                    <Text style={{color: '#fff'}}>开始阅读</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

export default ReadBtn;
