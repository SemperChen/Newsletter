/**
 * @author Semper
 */
import React from "react";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class HomePage3 extends React.Component {
    static navigationOptions = {
        header:null
    }
    constructor() {
        super()
        StatusBar.setHidden(true)
    }

    render() {
        return (
            <View style={{}}>
                <View style={styles.imgContent}>
                    <Text>app图标</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Search')
                    }}
                    style={[{
                        marginTop: 36,
                        marginHorizontal: WIDTH / 12,
                        padding:14,
                        backgroundColor: 'rgb(240,240,240)',
                        borderRadius: 5
                    }]}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'#767676',fontSize:18}}>请输入您关注的资讯</Text>
                        <MaterialIcons name="add" size={24} color='#4c4c4c'/>
                    </View>
                </TouchableOpacity>
                <Text style={{marginHorizontal: WIDTH / 12,marginTop:5,color:'#787878'}}>也许你想了解区块链、NBA、王者荣耀、北京、川菜</Text>

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

export default HomePage3;
