/**
 * @author Semper
 */
import React from "react";
import {View} from "react-native";
import SetButton from "./SetButton";

class SetButtonControl extends React.Component {

    constructor(){

    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                {this.props.data.length>0?this.props.data.map((item, index)=>{
                    return(
                        <SetButton key={index} title={item} length={this.props.data.length}/>
                    )
                }):null
                }
            </View>
        )
    }
}

export default SetButtonControl
