/**
 * @author Semper
 */
import React from 'react';
import {Slider, Text, View, TouchableOpacity} from 'react-native';
import {WIDTH} from '../utils/DimensionsUtil';

class ReaderMenuProgress extends React.Component {
  constructor() {
    super();
    this.readProgressBottom = 55;
    this.state = {
      chapterName: '',
      currentChapterNum: 0,
    };
  }

  open() {
    this.readerProgress.setNativeProps({
      style: {
        bottom: this.readProgressBottom,
        left: 0,
      },
    });
  }

  close() {
    this.readerProgress.setNativeProps({
      style: {
        bottom: this.readProgressBottom,
        left: WIDTH,
      },
    });
  }

  _setCurrentArticle = article => {
    try {
      this.setState({
        chapterName: article.chapterName,
        currentChapterNum: article.currentChapterNum,
      });
    } catch (e) {
      console.warn('ReaderMenuProgress _setCurrentArticle');
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.styles !== nextProps.styles ||
      this.props.catalogDataLength !== nextProps.catalogDataLength ||
      this.state.chapterName !== nextState.chapterName ||
      this.state.currentChapterNum !== nextState.currentChapterNum
    );
  }

  render() {
    const {styles} = this.props;
    return (
      <View
        ref={ref => {
          this.readerProgress = ref;
        }}
        style={{
          left: WIDTH,
          bottom: this.readProgressBottom,
          position: 'absolute',
          // borderBottomWidth: StyleSheet.hairlineWidth,
          // borderBottomColor: 'rgba(0,0,0,.5)',
        }}>
        <View style={styles.readerSet}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.currentChapterNum > 1) {
                  this.props.fetchArticleByProgress(
                    this.state.currentChapterNum - 2,
                  );
                }
              }}>
              <Text style={{color: '#fff', fontSize: 18}}>上一章</Text>
            </TouchableOpacity>
            <View style={[styles.readerSetItem, {flexDirection: 'row'}]}>
              <Slider
                onValueChange={() => {}}
                onSlidingComplete={value => {
                  this.props.fetchArticleByProgress(value);
                }}
                value={this.state.currentChapterNum}
                minimumValue={0}
                step={1}
                maximumValue={this.props.catalogDataLength - 1}
                style={styles.slider}
                maximumTrackTintColor="gainsboro"
                minimumTrackTintColor="deeppink"
                thumbTintColor="deeppink"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (
                  this.state.currentChapterNum < this.props.catalogDataLength
                ) {
                  this.props.fetchArticleByProgress(
                    this.state.currentChapterNum,
                  );
                }
              }}>
              <Text style={{color: '#fff', fontSize: 18}}>下一章</Text>
            </TouchableOpacity>
          </View>
          {this.state.chapterName ? (
            <Text style={{color: '#fff'}}>{this.state.chapterName}</Text>
          ) : null}
        </View>
      </View>
    );
  }
}

export default ReaderMenuProgress;
