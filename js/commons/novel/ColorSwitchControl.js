/**
 * @author Semper
 */
import React from "react";
import {View, TouchableOpacity, Text} from "react-native";
import {readerColors} from "../../constants/constants";
import {WIDTH} from "../../utils/DimensionsUtil";
import {saveAppConfig} from "../../utils/ConfigUtil";
export const btnSize = WIDTH/9;

class ColorSwitchControl extends React.Component {
    constructor() {
        super();
        this.state = {
            index: NovelAppConfig.readConfig.index
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.index !== nextState.index

    }

    selectColor=(index)=> {
        this.setState({
            index:index
        });
        NovelAppConfig.readConfig.index = index;
        // saveAppConfig(NovelAppConfig)
    };

    render() {
        return (
            <View style={{width:'100%',alignItems: 'center',justifyContent:'center', flexDirection: 'row',marginHorizontal:btnSize/3}}>
                {readerColors.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[{
                                marginHorizontal:btnSize/3,
                                borderRadius: btnSize,
                                width: btnSize,
                                height: btnSize,
                                backgroundColor: item.contentBgColor
                            }, this.state.index === index ? {
                                borderWidth: 1,
                                borderColor: '#ec407a'
                            } : {}]}
                            onPress={()=>{
                                this.selectColor(index);
                                this.props.changeSkin(item.contentBgColor,item.sliderColor);
                                NovelAppConfig.readerColor = item
                            }}
                        >
                            <Text/>
                        </TouchableOpacity>
                    )
                })}

            </View>

        )
    }
}

export default ColorSwitchControl;
