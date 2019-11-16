import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from "./js/store/configureStore";
import rootSaga from "./js/sagas";
import codePush from "react-native-code-push";
import Navigation from "./js/navigators/AppNavigator";

const store = configureStore();
store.runSaga(rootSaga);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        );
    }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

App = codePush(codePushOptions)(App);

export default App
