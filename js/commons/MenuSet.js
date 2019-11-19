/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorSwitchControl from "./ColorSwitchControl";
import {saveAppConfig} from "../utils/ConfigUtil";
import I18n from "../i18n/i18n";
import {lineHeights, maxFontSize, minFontSize} from "../constants/constants";


export const menuBgClr = 'rgb(33,33,33)';
const selectedColor = '#ec407a'

class MenuSet extends React.Component {

    constructor() {
        super();
        this.readProgressBottom = 55;
        this.minFontSize = minFontSize;
        this.maxFontSize = maxFontSize;
        this.state = {
            readerFontSize: NovelAppConfig.readConfig.fontSize,
            lHIndex: NovelAppConfig.readConfig.lHIndex,
            isTraditional: NovelAppConfig.isTraditional,
            isOpenVoice: NovelAppConfig.isOpenVoice
        }
    }

    open() {
        this.readerSet.setNativeProps({
            style: {
                bottom: this.readProgressBottom,
                left: 0
            }
        });
    }

    close() {
        this.readerSet.setNativeProps({
            style: {
                bottom: this.readProgressBottom,
                left: WIDTH,
            }
        });
    }

    resetIndex = (index) => {
        NovelAppConfig.readConfig.lHIndex = index;
        this.setState({
            lHIndex: index
        })
    };

    render() {
        return (
            <View
                ref={(ref) => {
                    this.readerSet = ref
                }}
                style={{
                    left: WIDTH,
                    bottom: this.readProgressBottom,
                    position: 'absolute',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    alignSelf: 'center',
                    zIndex: 1000,
                    width: WIDTH,
                    height: WIDTH / 1.8,
                    paddingVertical: 10,
                    backgroundColor: menuBgClr
                }}>

                <View style={{flexDirection: 'row',}}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                if (this.state.readerFontSize > this.minFontSize) {
                                    this.props.changeFontSize(this.state.readerFontSize - 1);
                                    this.setState((preState) => ({
                                        readerFontSize: preState.readerFontSize - 1,
                                    }))
                                }
                            }}
                        >
                            <Text style={{color: '#fff', fontSize: 18}}>A-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[styles.btn, {borderWidth: 0}]}
                        >
                            <Text style={{color: '#fff', fontSize: 18}}>{this.state.readerFontSize}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                if (this.state.readerFontSize < this.maxFontSize) {
                                    this.props.changeFontSize(this.state.readerFontSize + 1);
                                    this.setState((preState) => ({
                                        readerFontSize: preState.readerFontSize + 1,
                                        sampleFontSize: preState.readerFontSize + 1
                                    }))
                                }
                            }}
                        >
                            <Text style={{color: '#fff', fontSize: 18}}>A+</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                this.setState((preState) => ({
                                    isOpenVoice: !preState.isOpenVoice,
                                }));
                                NovelAppConfig.isOpenVoice = !NovelAppConfig.isOpenVoice;
                                saveAppConfig(NovelAppConfig);
                                this.props.changeFontSize()

                            }}
                        >
                            <Text
                                style={{color: '#fff'}}>{this.state.isOpenVoice ? I18n.t('closeVoice') : I18n.t('openVoice')}</Text>

                        </TouchableOpacity>
                    </View>


                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[styles.btn, this.state.lHIndex === 0 ? {borderColor: selectedColor} : {}]}
                            onPress={() => {
                                NovelAppConfig.readConfig.lineHeight = lineHeights[0];
                                this.props.changeFontSize();
                                this.resetIndex(0)

                            }}
                        >
                            <Icon name="align-justify" size={20} color="#fff"/>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[styles.btn, this.state.lHIndex === 1 ? {borderColor: selectedColor} : {}]}
                            onPress={() => {
                                NovelAppConfig.readConfig.lineHeight = lineHeights[1];
                                this.props.changeFontSize();
                                this.resetIndex(1)

                            }}
                        >
                            <Icon name="bars" size={20} color="#fff"/>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[styles.btn, this.state.lHIndex === 2 ? {borderColor: selectedColor} : {}]}
                            onPress={() => {
                                NovelAppConfig.readConfig.lineHeight = lineHeights[2];
                                this.props.changeFontSize();
                                this.resetIndex(2)


                            }}
                        >
                            <Text style={{color: '#fff', fontSize: 40,lineHeight:38}}>=</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                this.setState((preState) => ({
                                    isTraditional: !preState.isTraditional,
                                }));
                                NovelAppConfig.isTraditional = !NovelAppConfig.isTraditional;
                                saveAppConfig(NovelAppConfig);
                                this.props.changeFontSize()
                            }}
                        >
                            <Text style={{color: '#fff'}}>
                                {this.state.isTraditional ? '简体' : '繁体'}
                            </Text>

                        </TouchableOpacity>
                    </View>


                </View>


                <ColorSwitchControl changeSkin={this.props.changeSkin}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        marginHorizontal: WIDTH / 100
    },
    btn: {
        width: WIDTH / 5,
        height: WIDTH / 9,
        opacity: 0.9,
        marginHorizontal: WIDTH / 100,
        borderColor: 'rgb(53,73,81)',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default MenuSet;
