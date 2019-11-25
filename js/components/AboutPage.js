/**
 * @author Semper
 */
import React from "react";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {color95, rgb246} from "../constants/constants";

class AboutPage extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <View style={{backgroundColor: rgb246,flex:1}}>
                <TouchableOpacity
                    style={[styles.btn, {marginTop: 5}]}
                    onPress={() => {
                        this.props.navigation.navigate('Feedback')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>问题反馈</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />

                    </View>
                </TouchableOpacity>
                <View
                    style={styles.btn}
                    onPress={() => {
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>版本号</Text>
                        </View>
                        <Text style={{color:color95}}>V1.0</Text>

                    </View>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 18,
        paddingVertical: 14,
        paddingRight: 18,
        // paddingHorizontal:18,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#EEE'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemLeftText: {
        // paddingLeft: 10,
        fontSize: 16
    },
});

export default AboutPage;
