/**
 * @author Semper
 */
import React from 'react';
import Video from 'react-native-video';
import {checkLastPunctuationMark} from '../utils/FormatUtil';
import {Platform} from 'react-native';
class VoicePlayback extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
    this.overflowText = ''; //当前界面语音阅读逾出文字，当前屏幕上没有标点符号最后一句话视为逾出文字，把这些文字加到下一页文字中再请求语音
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.text !== nextProps.text || this.state.text !== nextState.text
    );
  }

  /**
   * 设置语音文字，并更新this.state.text，发起网络请求语音
   * @param text
   * @param isTurn2NextPage
   */
  setVoiceText = (text, isTurn2NextPage) => {
    let punctuationMark = checkLastPunctuationMark(text);
    let t = '';
    if (
      text.substring(text.length - 2) !== '。' ||
      text.substring(text.length - 2) !== '！' ||
      text.substring(text.length - 2) !== '？' ||
      text.substring(text.length - 2) !== '”' ||
      text.substring(text.length - 2) !== '.' ||
      text.substring(text.length - 2) !== '!' ||
      text.substring(text.length - 2) !== '?'
    ) {
      if (isTurn2NextPage) {
        t =
          this.overflowText + text.substring(0, punctuationMark.markIndex + 1);
      } else {
        t = text.substring(0, punctuationMark.markIndex + 1);
      }
      this.overflowText = text.substring(punctuationMark.markIndex + 1);
    }

    this.setState({text: t});
  };

  render() {
    /*if(!NovelAppConfig.isOpenVoice){
            return null
        }*/
    return (
      <Video
        source={{
          uri: encodeURI(
            'http://tsn.baidu.com/text2audio' +
              '?lan=zh&ctp=1&cuid=abcdxxx' +
              '&tok=' +
              NovelAppConfig.baiduVoiceTok +
              '&per=3' +
              '&spd=5' +
              '&pit=5' +
              '&vol=9' +
              '&aue=3' +
              '&tex=' +
              this.state.text,
          ),
        }}
        playInBackground={true}
        onEnd={() => {
          this.props.turnToNextPage();
        }}
        onError={e => {
          // console.warn('onError',e)
        }}
      />
    );
  }
}
export default VoicePlayback;
