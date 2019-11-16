import * as React from 'react';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import configureStore from "./js/store/configureStore";
import rootSaga from "./js/sagas";
import WelcomePage from "./js/components/WelcomePage";
import HomePage from "./js/components/HomePage";

const store = configureStore();
store.runSaga(rootSaga);

// Create our stack navigator
let RootStack = createStackNavigator({
    Welcome: WelcomePage,
    Home: HomePage
});

// And the app container
let Navigation = createAppContainer(RootStack);

// Render the app container component with the provider around it
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        );
    }
}
