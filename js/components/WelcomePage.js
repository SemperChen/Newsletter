import React from 'react';
import {Text, View, Button} from 'react-native';

class WelcomePage extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>WelcomePage</Text>
                <Button
                    onPress={()=>{
                        this.props.navigation.navigate("Home")
                    }}
                    title={"导航到主页"}/>
            </View>
        );
    }
}

export default WelcomePage;
