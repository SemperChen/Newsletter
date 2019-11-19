/**
 * @author Semper
 */
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {requestConfig} from '../actions/config';
import {getLanguages} from 'react-native-i18n';
import {CHINESE_TYPE} from '../constants/constants';
import {saveAppConfig} from '../utils/ConfigUtil';
import {HEIGHT} from '../utils/DimensionsUtil';

class WelcomePage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    try {
      StatusBar.setHidden(true);
      getLanguages().then(languages => {
        if (
          languages[0] === 'zh-CN' ||
          languages[0] === 'zh-Hans-US' ||
          languages[0] === 'zh-Hans-CN'
        ) {
          global.globalChineseType = CHINESE_TYPE.CN;
        } else {
          global.globalChineseType = CHINESE_TYPE.TW;
          NovelAppConfig.isTraditional = true;
        }
        // console.log('languages', languages) // ['en-US', 'en']
      });
    } catch (e) {
      console.warn('WelcomePage componentWillMount func', e.message);
    }
  }

  componentDidMount() {
    this.props.dispatch(requestConfig());
  }

  initVIPExperience = () => {
    try {
      this.time = new Date().getTime();
      let day = 86400000;
      //86400000毫秒/天
      this.sum = parseInt((this.time - NovelAppConfig.VIPServiceTime) / day);
      if (this.sum > 0) {
        if (NovelAppConfig.VIPExperienceDays >= this.sum) {
          NovelAppConfig.VIPExperienceDays =
            NovelAppConfig.VIPExperienceDays - this.sum;
        } else {
          NovelAppConfig.VIPExperienceDays = 0;
        }
        NovelAppConfig.VIPServiceTime = this.time;
      } else if (NovelAppConfig.VIPExperienceDays < 1) {
        NovelAppConfig.VIPServiceTime = this.time;
      }
    } catch (e) {
      console.warn('WelcomePage initVIPExperience func', e.message);
    }
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.configData === nextProps.configData) {
      return false;
    } else {
      if (nextProps.configData.length !== 0) {
        const {codeVersion} = nextProps.configData;
        if (codeVersion && codeVersion === NovelAppConfig.codeVersion) {
          global.NovelAppConfig = nextProps.configData;
        }
      }
      this.props.screenProps.setTheme(NovelAppConfig.themeColorName);
      this.timer = setTimeout(() => {
        this._navToSplash();
      }, 1500);
      this.initVIPExperience();
      saveAppConfig(NovelAppConfig);
      return !nextProps.configData;
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _navToSplash = () => {
    this.props.navigation.navigate('Splash');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="#aa3300" size={'large'} />
        <Text style={styles.text}>Loading</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    marginTop: 10,
  },
});
function mapStateToProps(state) {
  const {configData} = state.config;
  return {configData};
}

export default connect(mapStateToProps)(WelcomePage);
