/**
 * @author Semper
 */
import React from "react";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {color95, rgb246} from "../constants/constants";

class AccountPage extends React.Component {

    static navigationOptions = {
        headerTitle: "账号与安全",
        headerStyle: {backgroundColor: '#fff', elevation: 0},
        headerTintColor: '#262626',
    }
    constructor() {
        super()
    }

    render() {
        return (
            <View style={{backgroundColor: rgb246,flex:1}}>
                <TouchableOpacity
                    style={[styles.btn, {marginTop: 5}]}
                    onPress={() => {
                        this.props.navigation.navigate('PwdManagement')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>账号密码</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginRight:20,color:color95}}>为保障账号安全，请设置密码</Text>
                            <Icon
                                name='ios-arrow-forward'
                                size={20}
                                color='#ddd'
                                // onPress={this._search.bind(this)}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.props.navigation.navigate('ChangePhoneNum')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>手机号</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginRight:20,color:color95}}>13500000000</Text>
                            <Icon
                                name='ios-arrow-forward'
                                size={20}
                                color='#ddd'
                                // onPress={this._search.bind(this)}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.props.navigation.navigate('Safety')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>邮箱</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginRight:20,color:color95}}>MrWang@sina.com</Text>
                            <Icon
                                name='ios-arrow-forward'
                                size={20}
                                color='#ddd'
                                // onPress={this._search.bind(this)}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, {marginTop: 5}]}
                    onPress={() => {
                        this.props.navigation.navigate('AccountBinding')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>社交账号绑定</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.props.navigation.navigate('Account')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>信任设备</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>
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

export default AccountPage;
