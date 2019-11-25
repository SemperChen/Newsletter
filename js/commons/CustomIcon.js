/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {colorC5} from "../constants/constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class CustomIcon extends React.Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.iconContainer, this.props.style]}
            >
                <FontAwesome
                    name={this.props.name}
                    size={this.props.size}
                    color={this.props.color ? this.props.color : "#fff"}
                />
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 80,
        width: 40,
        height: 40,
        backgroundColor: colorC5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    }

});

export default CustomIcon;
