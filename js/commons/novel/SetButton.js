/**
 * @author Semper
 */
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {WIDTH} from "../../utils/DimensionsUtil";
import Icon from 'react-native-vector-icons/FontAwesome';

class SetButton extends React.Component {

    render() {
        return (
            <View style={{flexDirection: 'row', marginHorizontal:  WIDTH / 5 *(5-4)/(4+1)/4}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        {
                            width: WIDTH / 5,
                            height: WIDTH / 8,
                            opacity: 0.9,
                            marginHorizontal: WIDTH / 5 *(5-this.props.length)/(this.props.length+1)/4,
                            borderColor: 'rgb(53,73,81)',
                            borderWidth: 1,
                            borderRadius: 8,
                            backgroundColor: this.props.backgroundColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                        this.props.style
                    ]}
                    onPress={this.props.onPress}>
                    <Text style={{color: this.props.color,fontSize:this.props.fontSize}}>{this.props.title}</Text>
                    <Icon name="align-justify" size={30} color="#900" />
                    <Icon name="bars" size={30} color="#900" />

                </TouchableOpacity>
            </View>
        )
    }
}

export default SetButton
