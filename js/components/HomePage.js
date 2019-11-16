import React from 'react';
import {Text, View} from 'react-native';
import {connect} from "react-redux";
import {requestBookmarks} from "../actions/bookmarks";

class HomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(requestBookmarks());
    }
    render() {
        console.warn("bookmark",this.props.bookmarks)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>HomePage</Text>
            </View>
        );
    }
}
function mapStateToProps(state) {
    const {items: bookmarks, isRefreshing} = state.bookmarks;
    return {bookmarks, isRefreshing}
}
export default connect(mapStateToProps)(HomePage)
