/**
 * @author Semper
 */
import React from "react";
import {Text,Platform,ScrollView} from "react-native";
import {HEIGHT, WIDTH} from "../../utils/DimensionsUtil";
import {lineHeights, maxFontSize, minFontSize} from "../../constants/constants";
const WRAP = '我\n';

export const reservedH = 0;
export const MAXH = HEIGHT-reservedH;
class MeasureText extends React.Component {
    constructor() {
        super();
        this.state={
            text:'我',
            fontSize:minFontSize,
            lineHeight:lineHeights[0],
            height:MAXH
        }
        this.textHeight = [];
        this.textHeightData = [];
        this.line=0
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Text
                    allowFontScaling={false}
                    style={{fontSize:this.state.fontSize,lineHeight: this.state.fontSize+this.state.lineHeight,color:'#fff'}}
                    onLayout={(e)=>{
                        let height = e.nativeEvent.layout.height;
                        if(height<MAXH){
                            this.setState((prevState)=>({text:prevState.text+WRAP,height:height}));
                            this.line++
                        }else if(this.state.fontSize<=maxFontSize){
                            this.textHeight.push({fontSize:this.state.fontSize,height:this.state.height,line:this.line});
                            this.line=0;
                            this.setState({
                                fontSize:this.state.fontSize+1,
                                text:'我'
                            })
                        }else if(this.state.lineHeight<50){
                            this.textHeightData.push({lineHeight:this.state.lineHeight,textHeight:this.textHeight})
                            this.setState({
                                lineHeight:this.state.lineHeight+lineHeights[1]-lineHeights[0],
                                fontSize:minFontSize,
                                text:'我'
                            });
                            this.line=0;
                            this.textHeight=[];
                        }else{
                            NovelAppConfig.textHeightData=this.textHeightData;
                            // saveAppConfig(NovelAppConfig);
                            // console.log('NovelAppConfig.textHeightData',NovelAppConfig.textHeightData);
                            // console.log('HEIGHT',HEIGHT)
                            this.props.nav()
                        }
                    }}
                >{this.state.text}</Text>
            </ScrollView>

        )
    }
}

export default MeasureText;
