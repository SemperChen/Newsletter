/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, View} from "react-native";
import {IMG_HEIGHT, IMG_MARGIN, IMG_WIDTH} from "../utils/DimensionsUtil";
import FastImage from "react-native-fast-image";

class ShadowImage extends React.Component {
    render() {
        return (
            <View style={styles.imgContainer}>
                <FastImage resizeMode={FastImage.resizeMode.stretch} source={this.props.source}
                       style={styles.img}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgContainer: {
        backgroundColor: '#ddd',
        // elevation: 5,
        // shadowOffset: {width: 3, height: 3},
        // shadowColor: 'black',
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        margin: IMG_MARGIN,
        justifyContent: 'center'
    },
    img: {
        width: IMG_WIDTH,
        height: IMG_HEIGHT
    }
});

export default ShadowImage
