import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from "../components/WelcomePage";
import HomePage from "../components/HomePage";
// Create our stack navigator
let RootStack = createStackNavigator({
    Welcome: WelcomePage,
    Home: HomePage
});

// And the app container
const Navigation = createAppContainer(RootStack);
export default Navigation;
