import React from 'react';
import {Provider} from 'react-redux';
import configureStore from "./js/store/configureStore";
import rootSaga from "./js/sagas";
import codePush from "react-native-code-push";
import Navigation from "./js/navigators/AppNavigator";
import {THEME_COLORS} from "./js/constants/constants";
import createTheme, {ThemeColors} from "./js/commons/ThemeFactory";

const store = configureStore();
store.runSaga(rootSaga);
import './js/commons/NovelAppConfig'

class App extends React.Component {

    constructor() {
        super();
        this.state = this.initializeData()
    }

    /**
     * 设置主题
     * @param colorName
     */
    setTheme = (colorName) => {
        try{
            switch (colorName) {
                case THEME_COLORS.DARK:
                    this.setState({
                        appTheme: createTheme(ThemeColors.darkColors)
                    });
                    break;
                case THEME_COLORS.PINK:
                    this.setState({
                        appTheme: createTheme(ThemeColors.pinkColors)
                    });
                    break;
                default:
                    break
            }
        }catch(e){
            console.log('AppWithNavigationState setTheme', e.message)
        }
    };

    /**
     * 初始化数据
     * @returns {{appTheme: {primaryColor, darkColor, lightColor, styles}}}
     */
    initializeData = () => {
        try{
            if (NovelAppConfig.themeColorName === THEME_COLORS.DARK) {
                return {
                    appTheme: createTheme(ThemeColors.darkColors)
                }
            } else {
                return {
                    appTheme: createTheme(ThemeColors.pinkColors)
                }
            }
        }catch(e){
            console.warn('AppWithNavigationState initializeData',e.message)
        }

    };

    render() {
        return (
            <Provider store={store}>
                <Navigation
                    screenProps={{setTheme: this.setTheme, appTheme: this.state.appTheme}}
                />
            </Provider>
        );
    }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

App = codePush(codePushOptions)(App);

export default App
