import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class FacebookTabBar extends React.Component {
    icons = [];

    constructor(props) {
        super(props);
        this.icons = [];
    }

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
    }

    setAnimationValue({ value, }) {
        this.icons.forEach((icon, i) => {
            const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                },
            });
        });
    }

    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
        const red = 59 + (204 - 59) * progress;
        const green = 89 + (204 - 89) * progress;
        const blue = 152 + (204 - 152) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    }

    render() {
        return <ScrollView horizontal={true}
                           contentContainerStyle={{
                               height: 45,
                           }}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                    <Text style={[{fontSize:16},this.props.activeTab === i ? {color:'#262626'} : {color:'rgb(155,155,155)'}]}>{tab}</Text>

                </TouchableOpacity>;
            })}
            <TouchableOpacity
                style={styles.tab}
                onPress={() => {

                }}>
                <MaterialIcons name="add" size={24}
                               color='rgb(155,155,155)'/>
                {/*<Text style={{fontSize:16,color:'rgb(155,155,155)'}}>添加</Text>*/}

            </TouchableOpacity>
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,

    },
    tabs: {
        height: 45,
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});

export default FacebookTabBar;
