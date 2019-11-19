/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {BOOKMARK_HEIGHT, BOOKMARK_WIDTH, WIDTH} from "../utils/DimensionsUtil";
import {getChineseText} from "../utils/LanguageUtil";
import FastImage from "react-native-fast-image";

const BOOKMARK_MARGIN = WIDTH / 24;

class BookmarkComponent extends React.Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor="#fff"
                onLongPress={() => {
                    this.props.showIsDeleteBookmark(this.props.bookmark.tag, this.props.bookmark.bookName, this.props.bookmark.siteName);
                }}
                onPress={() => {
                    this.props.navToReader(this.props.bookmark)
                }}

            >
                <View>
                    <View style={styles.bookImageContainer}>
                        <FastImage source={{uri: this.props.bookmark.image}}
                               style={styles.bookImage}/>
                    </View>

                    <Text numberOfLines={2} style={styles.bookName}>{getChineseText(this.props.bookmark.bookName)}</Text>
                </View>
            </TouchableHighlight>

        )
    }
}

const styles = StyleSheet.create({
    bookName: {
        width: BOOKMARK_WIDTH,
        marginRight: BOOKMARK_MARGIN,
        marginLeft: BOOKMARK_MARGIN,
        fontWeight: 'bold',
        fontSize: 14
    },
    bookImage: {
        width: BOOKMARK_WIDTH,
        height: BOOKMARK_HEIGHT
    },
    bookImageContainer: {
        margin: BOOKMARK_MARGIN,
        // elevation: 10,
        backgroundColor: '#ddd',
        // shadowOffset: {width: 3, height: 3},
        // shadowColor: 'black',
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
    }
});
export default BookmarkComponent
